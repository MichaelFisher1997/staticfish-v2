import React, { useState, useEffect } from "react";
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

  // Lock body scroll when menu is open
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
        className="p-2 text-ink hover:text-primary transition-colors rounded-lg hover:bg-secondary"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Full Screen Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background/98 backdrop-blur-xl transition-all duration-500 ease-out-expo flex flex-col ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6">
          <span className="text-lg font-bold text-ink font-display">staticfish</span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-foreground hover:text-primary transition-colors bg-secondary rounded-xl"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col justify-center px-8">
          <div className="space-y-2">
            {navigation.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className={`block text-3xl font-bold font-display tracking-tight py-3 transition-all duration-300 ${
                  currentPath === item.href
                    ? "text-primary"
                    : "text-ink/80 hover:text-primary hover:translate-x-2"
                }`}
                onClick={() => setIsOpen(false)}
                style={{ 
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Footer CTA */}
        <div className="p-8 border-t border-border">
          <a 
            href="/contact" 
            className="flex items-center justify-center gap-2 w-full bg-ink text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-ink/10 hover:bg-primary transition-all active:scale-[0.98]"
            onClick={() => setIsOpen(false)}
          >
            Start Your Project <ArrowRight className="h-5 w-5" />
          </a>
          <p className="text-center text-sm text-muted-foreground mt-4">
            contact@staticfish.co.uk
          </p>
        </div>
      </div>
    </div>
  );
}
