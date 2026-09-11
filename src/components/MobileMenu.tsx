import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { BrandLockup } from "./BrandMark";

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavigationItem[];
  currentPath: string;
}

export default function MobileMenu({ navigation, currentPath }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/[0.14] bg-transparent text-bone transition-colors hover:border-bone/30 hover:bg-bone/[0.04] active:scale-95"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMounted && createPortal(
        <div
          className={`fixed inset-0 z-[60] flex flex-col bg-abyss transition-all duration-300 ease-out ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative flex items-center justify-between border-b border-bone/[0.08] p-6">
            <BrandLockup textClassName="!text-bone" />
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/[0.14] text-bone transition-colors hover:border-bone/30"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center px-6">
            <div className="divide-y divide-bone/[0.08] border-y border-bone/[0.08]">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-2 py-6 font-display text-3xl font-semibold tracking-tight transition-colors duration-200 ${
                    currentPath === item.href
                      ? "text-ember"
                      : "text-sand hover:text-bone"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  {item.name}
                  <ArrowRight className={`h-5 w-5 ${currentPath === item.href ? "text-ember" : "text-faint"}`} />
                </a>
              ))}
            </div>
          </nav>

          <div className="relative border-t border-bone/[0.08] p-6">
            <a
              href="/contact"
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-[#eef0fd] transition-colors hover:bg-[#4a4aea] active:scale-[0.99]"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-center text-sm text-ash">
              contact@staticfish.co.uk
            </p>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
