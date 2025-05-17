import {
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
  Twitter,
  Youtube,
} from "lucide-react";

export interface FooterCategory {
  title: string;
  items: FooterItem[];
}

export interface FooterItem {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

// Example usage of the types
export const footerCategories: FooterCategory[] = [
  {
    title: "About",
    items: [
      { label: "Company Overview", href: "/company-overview" },
      { label: "Careers", href: "/careers" },
      { label: "Press & Media", href: "/press-media" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Support & Contact",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "Technical Support", href: "/technical-support" },
      { label: "Feedback", href: "/feedback" },
      { label: "Community Forum", href: "/community" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export const footerBottomLinks: FooterBottomLink[] = [
  { label: "Term of use", href: "/terms-of-use" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Security", href: "/security" },
];
