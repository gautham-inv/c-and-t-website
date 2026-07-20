import { Linkedin, Instagram, Youtube, X, type LucideIcon } from "lucide-react";

export type SocialLink = { label: string; href: string; Icon: LucideIcon };

/** Shared across Navbar's mobile menu and the real Footer, so both stay in sync. */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/candtengineers/", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/candtengineers/", Icon: Instagram },
];

/** Icons live in code (Lucide), so when socials come from Sanity as
 * {label, href} we resolve the icon by label. Unknown labels render no icon. */
const SOCIAL_ICON: Record<string, LucideIcon> = {
  LinkedIn: Linkedin,
  Instagram: Instagram,
  X: X,
  YouTube: Youtube,
};

export function socialIcon(label: string): LucideIcon | undefined {
  return SOCIAL_ICON[label];
}
