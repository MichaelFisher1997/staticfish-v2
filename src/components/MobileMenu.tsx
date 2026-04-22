import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowRight } from "lucide-react";

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
        className="p-2 text-foreground hover:text-primary transition-colors rounded-md hover:bg-secondary"
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
            <span className="text-lg font-bold text-foreground font-display">staticfish</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-foreground hover:text-primary transition-colors bg-secondary rounded-md"
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
                  className={`block text-2xl font-bold font-display tracking-tight py-3 transition-all duration-300 ${
                    currentPath === item.href
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
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
              className="flex items-center justify-center gap-2 w-full bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]"
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
