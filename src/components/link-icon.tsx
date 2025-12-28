import {
  InstagramIcon,
  FacebookIcon,
  LinkIcon as LucideLinkIcon,
  TwitterIcon,
  LinkedinIcon,
} from "lucide-react";

const LinkIcon = ({
  icon,
  size,
}: {
  icon: "instagram" | "twitter" | "linkedin" | "facebook" | "other";
  size?: number;
}) => {
  return (
    <>
      {icon === "instagram" ? (
        <InstagramIcon className="text-rose-600" size={size ?? 24} />
      ) : icon === "facebook" ? (
        <FacebookIcon className="text-indigo-600" size={size ?? 24} />
      ) : icon === "other" ? (
        <LucideLinkIcon size={size ?? 24} className="text-primary" />
      ) : icon === "linkedin" ? (
        <LinkedinIcon className="text-indigo-800" size={size ?? 24} />
      ) : (
        <TwitterIcon className="text-indigo-800" size={size ?? 24} />
      )}
    </>
  );
};

export default LinkIcon;
