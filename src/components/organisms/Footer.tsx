"use client";

import React from "react";
import Link from "next/link";
import { LoginLogo } from "@/components/molecules/Logos";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroupProps {
  title: string;
  links: FooterLink[];
}

const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-primary">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-gray-600 hover:text-primary transition-colors text-sm"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CURRENT_YEAR = new Date().getFullYear();
export const Footer = () => {
  const linkGroups: FooterLinkGroupProps[] = [
    {
      title: "Product",
      links: [
        { label: "Find a mentor", href: "/register/role-selection" },
        { label: "Become a mentor", href: "/register/role-selection" },
        { label: "Pricing", href: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "/" },
        { label: "Contact Us", href: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/" },
        { label: "Privacy Policy", href: "/" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white ">
      {/* Main Footer Content */}
      <div className="px-6 md:px-12 lg:px-24 pt-12 md:pt-16 ">
        <div className="max-w-7xl mx-auto">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Section */}
            <div className="flex flex-col gap-3">
              <Link href="/" className="flex items-center gap-2 w-fit">
                <LoginLogo
                  size="sm"
                  variant="colored"
                  className="w-36! h-12!"
                />
              </Link>
              <p className="text-gray-600 text-sm">
                Your path to mastery in touch
              </p>
            </div>

            {/* Link Groups */}
            {linkGroups.map((group, index) => (
              <FooterLinkGroup
                key={index}
                title={group.title}
                links={group.links}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-8 mt-8"></div>

          {/* Bottom Section */}
          <div className="w-fit mx-auto pb-8">
            {/* Copyright */}
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {CURRENT_YEAR}
              {"  "}
              <Link
                href="/"
                className="text-primary font-semibold hover:underline"
              >
                Masaark
              </Link>
              , All Rights Servered
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
