import { db } from "./firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";
import { ContentType, ReactionType, ShareType, type TReaction } from "@/types";

// Helper to sanitize document IDs for Firebase
const sanitizeId = (id: string) => {
  return id.replace(/\//g, "_").replace(/\./g, "_");
};

export const getSectionMeta = async (
  slug: string,
): Promise<
  Record<
    string,
    {
      reactionsDetail: TReaction;
    }
  >
> => {
  try {
    const docRef = doc(db, "contents", sanitizeId(slug));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data.sections || {};
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error getting section meta:", err);
  }
  return {};
};

export const getContentMeta = async (
  slug: string,
): Promise<{ shares: number; views: number }> => {
  try {
    const docRef = doc(db, "contents", sanitizeId(slug));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        shares: data.shares || 0,
        views: data.views || 0,
      };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error getting content meta:", err);
  }

  return {
    shares: 0,
    views: 0,
  };
};

const getDefaultReactions = (): TReaction => ({
  CLAPPING: 0,
  THINKING: 0,
  AMAZED: 0,
});

const getReactionKey = (type: ReactionType): string => {
  return typeof type === "number" ? ReactionType[type] : type;
};

export const getReactions = async (slug: string): Promise<TReaction> => {
  try {
    const docRef = doc(db, "contents", sanitizeId(slug));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log({ data });
      const reactionsDetail = {
        THINKING: data["reactionsDetail.THINKING"] || 0,
        AMAZED: data["reactionsDetail.AMAZED"] || 0,
        CLAPPING: data["reactionsDetail.CLAPPING"] || 0,
      };
      return { ...getDefaultReactions(), ...reactionsDetail };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error getting reactions:", err);
  }
  return getDefaultReactions();
};

export const getReactionsBy = async (
  slug: string,
  sessionId: string,
): Promise<TReaction> => {
  try {
    const docRef = doc(db, "user_insights", `${sanitizeId(slug)}_${sessionId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const reactionsDetail = {
        THINKING: data["reactionsDetail.THINKING"] || 0,
        AMAZED: data["reactionsDetail.AMAZED"] || 0,
        CLAPPING: data["reactionsDetail.CLAPPING"] || 0,
      };
      return { ...getDefaultReactions(), ...reactionsDetail };
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error getting user reactions:", err);
  }
  return getDefaultReactions();
};

export const setReaction = async ({
  slug,
  contentType,
  contentTitle,
  count,
  section,
  sessionId,
  type,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  count: number;
  section: string;
  sessionId: string;
  type: ReactionType;
}) => {
  const reactionKey = getReactionKey(type);
  const safeSlug = sanitizeId(slug);

  // Update aggregate counts
  const contentRef = doc(db, "contents", safeSlug);
  const updateData: any = {
    slug,
    type: contentType,
    title: contentTitle,
    reactions: increment(count),
    [`reactionsDetail.${reactionKey}`]: increment(count),
  };

  if (section) {
    updateData[`sections.${section}.reactionsDetail.${reactionKey}`] =
      increment(count);
  }

  await setDoc(contentRef, updateData, { merge: true });

  // Update user specific counts
  const userInsightRef = doc(db, "user_insights", `${safeSlug}_${sessionId}`);
  await setDoc(
    userInsightRef,
    {
      slug,
      sessionId,
      [`reactionsDetail.${reactionKey}`]: increment(count),
      ...(section ? { section } : {}),
    },
    { merge: true },
  );

  return { success: true };
};

export const getSharesBy = async (
  slug: string,
  sessionId: string,
): Promise<number> => {
  try {
    const docRef = doc(db, "user_insights", `${sanitizeId(slug)}_${sessionId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().shares || 0;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error getting user shares:", err);
  }
  return 0;
};

export const setShare = async ({
  slug,
  contentType,
  contentTitle,
  type,
  sessionId,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  type: ShareType;
  sessionId: string;
}) => {
  const safeSlug = sanitizeId(slug);
  // Update aggregate counts
  const contentRef = doc(db, "contents", safeSlug);
  await setDoc(
    contentRef,
    {
      slug,
      type: contentType,
      title: contentTitle,
      shares: increment(1),
    },
    { merge: true },
  );

  // Update user specific counts
  const userInsightRef = doc(db, "user_insights", `${safeSlug}_${sessionId}`);
  await setDoc(
    userInsightRef,
    {
      slug,
      sessionId,
      shares: increment(1),
      lastShareType: type,
    },
    { merge: true },
  );

  return { success: true };
};

export const getViewsBy = async (
  slug: string,
  sessionId: string,
): Promise<number> => {
  try {
    const docRef = doc(db, "user_insights", `${sanitizeId(slug)}_${sessionId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().views || 0;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error getting user views:", err);
  }
  return 0;
};

export const setView = async ({
  slug,
  contentType,
  contentTitle,
  sessionId,
}: {
  slug: string;
  contentType: ContentType;
  contentTitle: string;
  sessionId: string;
}) => {
  const safeSlug = sanitizeId(slug);
  // Update aggregate counts
  const contentRef = doc(db, "contents", safeSlug);
  await setDoc(
    contentRef,
    {
      slug,
      type: contentType,
      title: contentTitle,
      views: increment(1),
    },
    { merge: true },
  );

  // Update user specific counts
  const userInsightRef = doc(db, "user_insights", `${safeSlug}_${sessionId}`);
  await setDoc(
    userInsightRef,
    {
      slug,
      sessionId,
      views: increment(1),
    },
    { merge: true },
  );

  return { success: true };
};
