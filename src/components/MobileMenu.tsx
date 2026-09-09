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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-100 bg-white/70 text-slate-800 shadow-sm backdrop-blur transition-all hover:shadow-md active:scale-95"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {isMounted && createPortal(
        <div
          className={`fixed inset-0 z-[60] flex flex-col transition-all duration-400 ease-out ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          style={{
            background: "linear-gradient(160deg, rgba(248,249,255,0.97), rgba(238,242,255,0.97))",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #818cf8, transparent 65%)" }} />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #22d3ee, transparent 65%)" }} />
          </div>

          <div className="relative flex items-center justify-between p-6">
            <BrandLockup />
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center px-8">
            <div className="space-y-2">
              {navigation.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block rounded-2xl px-5 py-4 font-display text-3xl font-bold tracking-tight transition-all duration-300 ${
                    currentPath === item.href
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/30"
                      : "text-slate-800 hover:bg-white hover:shadow-lg"
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(16px)",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          <div className="relative p-8">
            <a
              href="/contact"
              className="btn-primary-glow flex w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote <ArrowRight className="relative z-[2] h-5 w-5" />
            </a>
            <p className="mt-4 text-center text-sm text-slate-500">
              contact@staticfish.co.uk
            </p>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
