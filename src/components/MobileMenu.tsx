import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
        className="p-2 text-foreground hover:text-primary transition-colors"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Full Screen Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-xl transition-all duration-300 flex flex-col justify-center items-center ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 p-2 text-foreground hover:text-primary transition-colors bg-white/10 rounded-full"
          aria-label="Close menu"
        >
          <X className="h-8 w-8" />
        </button>

        <nav className="flex flex-col items-center gap-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-3xl font-bold tracking-tight transition-all duration-200 hover:scale-110 ${
                currentPath === item.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary/80"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          
          <div className="mt-8 pt-8 border-t border-border w-24 flex justify-center">
             <a 
               href="/contact" 
               className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-95"
               onClick={() => setIsOpen(false)}
             >
               Get Started
             </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
