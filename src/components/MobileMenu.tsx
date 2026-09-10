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
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur transition-all hover:bg-white/20 active:scale-95"
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
            background: "linear-gradient(160deg, rgba(10,10,28,0.97), rgba(20,16,48,0.97))",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, #ff4d6d, transparent 65%)" }} />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, #FF8A3D, transparent 65%)" }} />
          </div>

          <div className="relative flex items-center justify-between p-6">
            <BrandLockup textClassName="!text-white" />
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
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
                      ? "bg-gradient-to-r from-[#ff4d5d] to-[#ff7a3d] text-white shadow-xl shadow-[#ff4d5d]/30"
                      : "text-slate-200 hover:bg-white/10"
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
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#e11d48] px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-[#f43f52] active:scale-[0.98]"
              onClick={() => setIsOpen(false)}
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-4 text-center text-sm text-slate-400">
              contact@staticfish.co.uk
            </p>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
