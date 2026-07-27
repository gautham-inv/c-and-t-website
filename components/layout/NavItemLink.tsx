"use client";

import Link from "next/link";

/**
 * Nav/footer link that picks the right element for the href it's given.
 *
 * Route links ("/about", "/careers") render as next/link, so navigating
 * between pages is a client-side transition instead of a full document
 * reload — the whole JS bundle, Lenis, GSAP and every ScrollTrigger would
 * otherwise be torn down and rebuilt on every click.
 *
 * Hash links ("/#faq", "/#contact") deliberately stay a plain <a>. They're
 * handled by the caller's onClick, which smooth-scrolls via Lenis when
 * already on the homepage and otherwise lets the browser navigate. Routing
 * those through next/link would put a client-side navigation in front of
 * that logic and hand anchor scrolling to Next while Lenis owns the scroll
 * position — so they're left exactly as they were.
 */
export function NavItemLink({
  href,
  onClick,
  className,
  children,
  ...rest
}: {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href" | "onClick" | "className">) {
  const isRoute = href.startsWith("/") && !href.includes("#");

  if (isRoute) {
    return (
      <Link href={href} onClick={onClick} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
