"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  footerBottomLinks,
  footerCategories,
  socialLinks,
} from "@/utils/links/footer-links";

const Footer = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <footer className="w-[90%] mx-auto bg-background dark:bg-background pt-12 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo/logo.png"
                alt="Telco Learn Logo"
                width={280}
                height={50}
                priority
                className="mb"
              />
            </Link>
            <p className="text-muted-foreground dark:text-muted-foreground text-sm">
              Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-muted-foreground hover:text-[#00BFB3] dark:text-muted-foreground dark:hover:text-[#00BFB3] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Footer Categories */}
          {footerCategories.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4 text-foreground dark:text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-[#00BFB3] dark:text-muted-foreground dark:hover:text-[#00BFB3] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground dark:text-foreground">
              Subscribe to our newsletter
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground text-sm mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit aliquam
              mauris sed ma
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-background dark:bg-background"
                required
              />
              <Button
                type="submit"
                className="w-full bg-[#00BFB3] hover:bg-[#00BFB3]/90 text-white dark:bg-[#00BFB3] dark:hover:bg-[#00BFB3]/90 dark:text-white"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-8 border-t border-border dark:border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
              ©2025 Telco Learn · All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerBottomLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-[#00BFB3] dark:text-muted-foreground dark:hover:text-[#00BFB3] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
