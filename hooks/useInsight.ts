import { useEffect, useRef } from "react";
import useSWR from "swr";

import fetcher from "@/utils/fetcher";
import { postReaction, postShare, postView } from "@/helpers/api";

import type { ShareType, TContentMetaDetail } from "@/types/index";
import { ReactionType, ContentType } from "@/types/index";

const INITIAL_VALUE: TContentMetaDetail = {
  meta: {
    views: 0,
    shares: 0,
    reactions: 0,
    reactionsDetail: {
      CLAPPING: 0,
      THINKING: 0,
      AMAZED: 0,
    },
  },
  metaUser: {
    reactionsDetail: {
      CLAPPING: 0,
      THINKING: 0,
      AMAZED: 0,
    },
  },
  metaSection: {},
};

export default function suseInsight({
  slug,
  contentType,
  contentTitle,
  countView = true,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  countView?: boolean;
}) {
  // #region handle for batch click
  const timer = useRef<Record<any, NodeJS.Timeout>>({});
  const count = useRef<Record<any, number>>({
    CLAPPING: 0,
    THINKING: 0,
    AMAZED: 0,
  });
  // #endregion

  const {
    isLoading,
    data = INITIAL_VALUE,
    mutate,
  } = useSWR<TContentMetaDetail>(`/api/content/${slug}`, fetcher, {
    fallbackData: INITIAL_VALUE,
  });

  // post view count
  useEffect(() => {
    if (countView) {
      postView({ slug, contentType, contentTitle });
    }
  }, [slug, contentType, contentTitle, countView]);

  const addShare = ({ type }: { type: ShareType }) => {
    // optimistic update
    mutate(
      {
        ...data,
        meta: {
          ...data.meta,
          shares: data.meta.shares + 1,
        },
      },
      false,
    );

    postShare({
      slug,
      contentType,
      contentTitle,
      type,
    });
  };

  const addReaction = ({
    type,
    section = undefined,
  }: {
    type: ReactionType;
    section?: string;
  }) => {
    const reactionKey = typeof type === "number" ? ReactionType[type] : type;

    // optimistic update
    mutate(
      {
        ...data,
        meta: {
          ...data.meta,
          reactions: data.meta.reactions + 1,
          reactionsDetail: {
            ...data.meta.reactionsDetail,
            [reactionKey]: (data.meta.reactionsDetail[reactionKey] || 0) + 1,
          },
        },
        metaUser: {
          ...data.metaUser,
          reactionsDetail: {
            ...data.metaUser.reactionsDetail,
            [reactionKey]:
              (data.metaUser.reactionsDetail[reactionKey] || 0) + 1,
          },
        },
      },
      false,
    );

    // increment the current batch click count
    count.current[reactionKey] = (count.current[reactionKey] || 0) + 1;

    // debounce the batch click for sending the reaction data
    clearTimeout(timer.current[reactionKey]);
    timer.current[reactionKey] = setTimeout(() => {
      postReaction({
        slug,
        contentType,
        contentTitle,
        type,
        count: count.current[reactionKey],
        section: section ?? "",
      }).finally(() => {
        // reset the batch click count to zero for the next batch
        count.current[reactionKey] = 0;
      });
    }, 500);
  };

  return {
    isLoading,
    data,
    addShare,
    addReaction,
  };
}
