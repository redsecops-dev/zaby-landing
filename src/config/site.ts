export const siteConfig = {
  name: "Zaby",
  tagline: "AI-Powered Workspace",
  title: "Zaby — AI-Powered Workspace",
  description:
    "Zaby brings AI-native workflows, real-time collaboration, and enterprise-grade security into one unified workspace. Built for teams who ship fast.",
  url: "https://zaby.ai",
  ogImage: "https://zaby.ai/og.png",
  links: {
    twitter: "https://twitter.com/zabyai",
    github: "https://github.com/zabyai",
    linkedin: "https://linkedin.com/company/zabyai",
  },
  keywords: [
    "AI workspace",
    "productivity",
    "collaboration",
    "automation",
    "enterprise SaaS",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
