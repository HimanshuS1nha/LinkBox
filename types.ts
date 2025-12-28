export type LinkType = {
  link: string;
  id?: string;
  title: string;
  icon: "facebook" | "twitter" | "linkedin" | "instagram" | "other";
  isEnabled: boolean;
};
