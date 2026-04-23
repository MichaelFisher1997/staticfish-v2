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
        className="border border-border p-2 text-foreground transition-colors hover:bg-secondary"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMounted && createPortal(
        <div
          className={`fixed inset-0 z-60 bg-background/98 backdrop-blur-xl transition-all duration-300 ease-out flex flex-col ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b border-border/50">
            <BrandLockup />
            <button
              onClick={() => setIsOpen(false)}
              className="border border-border bg-secondary p-2 text-foreground transition-colors hover:bg-background"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8">
            <div className="space-y-1">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block border-b border-border/50 py-4 font-display text-3xl font-bold tracking-tight transition-all duration-300 ${
                    currentPath === item.href
                      ? "text-accent"
                      : "text-foreground/80 hover:text-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateX(0)" : "translateX(-12px)",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="p-8 border-t border-border/50">
            <a
              href="/contact"
              className="flex w-full items-center justify-center gap-2 bg-primary px-8 py-4 font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote <ArrowRight className="h-5 w-5" />
            </a>
            <p className="text-center text-sm text-muted-foreground mt-4">
              contact@staticfish.co.uk
            </p>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
