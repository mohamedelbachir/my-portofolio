"use client";
import clsx from "clsx";
import { motion, useAnimationControls } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import EmojiReaction from "./EmojiReaction";
import InsightButton from "./InsightButton";
import ShareButton from "./ShareButton";

import useInsight from "@/hooks/useInsight";
import useScrollSpy from "@/hooks/useScrollSpy";

import { MAX_REACTIONS_PER_SESSION } from "@/constants/app";

import type { PropsWithChildren } from "react";
import { ContentType, ReactionType } from "@/types";

interface CounterProps {
  count: number;
}

function Counter({ count }: CounterProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    const startMotion = async () => {
      await controls.start({
        y: [-20, 0],
        transition: {
          duration: 0.18,
        },
      });
    };

    if (count !== 0) {
      startMotion();
    }
  }, [count, controls]);

  return count === 0 ? (
    <span className={clsx("flex flex-col font-mono text-sm")}>
      <span
        className={clsx(
          "flex h-5 items-center font-mono text-sm font-bold text-slate-600",
          "dark:text-slate-300",
        )}
      >
        0
      </span>
    </span>
  ) : (
    <motion.span
      className={clsx(
        "flex flex-col font-mono text-sm font-bold text-slate-600",
        "dark:text-slate-300",
      )}
      animate={controls}
    >
      <span className={clsx("flex h-5 items-center")}>&nbsp;</span>
      <span className={clsx("flex h-5 items-center")}>{count}</span>
      <span className={clsx("flex h-5 items-center")}>{count - 1}</span>
    </motion.span>
  );
}

type ReactionCounterProps = PropsWithChildren<CounterProps>;

function ReactionCounter({ count, children = null }: ReactionCounterProps) {
  return (
    <div
      className={clsx(
        "relative flex h-6 items-center gap-1 overflow-hidden rounded-full bg-slate-200 px-2 py-1",
        "dark:bg-[#1d263a]",
      )}
    >
      {children}
      <Counter count={count} />
    </div>
  );
}

export type ReactionsProps = {
  contentType: ContentType;
  contentTitle: string;
  withCountView?: boolean;
};

function Reactions({
  contentType,
  contentTitle,
  withCountView = true,
}: ReactionsProps) {
  const params = useParams();
  const slug = params.slug as string;

  // current active section
  const { currentSection } = useScrollSpy();

  const {
    isLoading,
    data: {
      meta: {
        views,
        shares,
        reactions,
        reactionsDetail: { THINKING, CLAPPING, AMAZED },
      },
      metaUser: { reactionsDetail: user },
    },
    addShare,
    addReaction,
  } = useInsight({ slug, contentType, contentTitle, countView: withCountView });

  const CLAPPING_QUOTA = MAX_REACTIONS_PER_SESSION - (user?.CLAPPING || 0);
  const THINKING_QUOTA = MAX_REACTIONS_PER_SESSION - (user?.THINKING || 0);
  const AMAZED_QUOTA = MAX_REACTIONS_PER_SESSION - (user?.AMAZED || 0);

  const controls = useAnimationControls();

  useEffect(() => {
    if (!isLoading) {
      controls.start({
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
        transition: {
          delay: 0.24,
          duration: 0.18,
        },
      });
    }
  }, [isLoading, controls]);

  return (
    <motion.div
      className={clsx(
        "border-divider-border pointer-events-auto relative flex items-center justify-between rounded-xl border p-4",
      )}
      initial={{
        y: 16,
        opacity: 0,
        pointerEvents: "none",
      }}
      animate={controls}
    >
      <div
        className={clsx(
          "absolute flex items-center inset-0 rounded-xl bg-muted/80 backdrop-blur",
        )}
      />
      <div className={clsx("flex items-center gap-4")}>
        <div className={clsx("flex flex-col items-center gap-2")}>
          <EmojiReaction
            disabled={CLAPPING_QUOTA <= 0}
            title="Claps"
            defaultImage="/assets/emojis/clapping-hands.png"
            animatedImage="/assets/emojis/clapping-hands-animated.png"
            disabledImage="/assets/emojis/love-you-gesture.png"
            onClick={() => {
              addReaction({
                type: ReactionType.CLAPPING,
                section: currentSection,
              });
            }}
          />
          <ReactionCounter count={CLAPPING} />
        </div>
        <div className={clsx("flex flex-col items-center gap-2")}>
          <EmojiReaction
            disabled={AMAZED_QUOTA <= 0}
            title="Wow"
            defaultImage="/assets/emojis/astonished-face.png"
            animatedImage="/assets/emojis/astonished-face-animated.png"
            disabledImage="/assets/emojis/star-struck.png"
            onClick={() => {
              addReaction({
                type: ReactionType.AMAZED,
                section: currentSection,
              });
            }}
          />
          <ReactionCounter count={AMAZED} />
        </div>
        <div className={clsx("flex flex-col items-center gap-2")}>
          <EmojiReaction
            disabled={THINKING_QUOTA <= 0}
            title="Hmm"
            defaultImage="/assets/emojis/face-with-monocle.png"
            animatedImage="/assets/emojis/face-with-monocle-animated.png"
            disabledImage="/assets/emojis/nerd-face.png"
            onClick={() => {
              addReaction({
                type: ReactionType.THINKING,
                section: currentSection,
              });
            }}
          />
          <ReactionCounter count={THINKING} />
        </div>
      </div>
      <div className={clsx("flex items-start gap-2")}>
        <div className={clsx("flex flex-col items-center gap-2")}>
          <InsightButton views={views} shares={shares} reactions={reactions} />
        </div>
        <div className={clsx("flex flex-col items-center relative gap-2")}>
          <ShareButton
            onItemClick={(type) => {
              addShare({ type });
            }}
            contentTitle={contentTitle}
          />
          <ReactionCounter count={shares} />
        </div>
      </div>
    </motion.div>
  );
}

export default Reactions;
