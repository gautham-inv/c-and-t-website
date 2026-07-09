import { Linkedin, Instagram, Youtube, X, type LucideIcon } from "lucide-react";

export type SocialLink = { label: string; href: string; Icon: LucideIcon };

/** Shared across Navbar's mobile menu and the real Footer, so both stay in sync. */
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "X", href: "#", Icon: X },
  { label: "YouTube", href: "#", Icon: Youtube },
];
