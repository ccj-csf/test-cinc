import { useCallback, useMemo } from "react";

const LINK_TYPES = {
  TELEGRAM: "telegram",
  DISCORD: "discord",
  TWITTER: "twitter",
  LINKEDIN: "linkedin",
  COOPERATION_EMAIL: "cooperationEmail",
  SUPPORT_EMAIL: "supportEmail",
};

const links = {
  [LINK_TYPES.TELEGRAM]: "https://t.me/yourChannel",
  [LINK_TYPES.DISCORD]: "https://discord.com/invite/yourInviteLink",
  [LINK_TYPES.TWITTER]: "https://twitter.com/yourProfile",
  [LINK_TYPES.LINKEDIN]: "https://www.linkedin.com/in/yourProfile",
  [LINK_TYPES.COOPERATION_EMAIL]: "mailto:cooperation@example.com",
  [LINK_TYPES.SUPPORT_EMAIL]: "mailto:support@example.com",
};
// Hook定义
const useSocialMediaAndEmailLinks = () => {
  const openLink = useCallback((type) => {
    const url = links[type];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.error("Link type not found:", type);
    }
  }, []);

  // 使用useMemo保证links对象的引用稳定性
  const availableLinks = useMemo(() => links, []);

  return { openLink, availableLinks, LINK_TYPES };
};

export { useSocialMediaAndEmailLinks };
