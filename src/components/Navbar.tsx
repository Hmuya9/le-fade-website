"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Le Fade
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#plans" 
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              Plans
            </Link>
            <a 
              href="https://wa.me/1234567890?text=Hi%20I%27d%20like%20to%20learn%20more%20about%20Le%20Fade" 
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
            >
              Contact
            </a>
            <a 
              href="https://wa.me/1234567890?text=Hi%2C%20I%27m%20ready%20to%20start%20my%20Le%20Fade%20subscription" 
              className="bg-amber-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-1">
              <div className={`w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-slate-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="py-4 space-y-4">
              <Link 
                href="#plans" 
                className="block text-slate-700 hover:text-slate-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Plans
              </Link>
              <a 
                href="https://wa.me/1234567890?text=Hi%20I%27d%20like%20to%20learn%20more%20about%20Le%20Fade" 
                className="block text-slate-700 hover:text-slate-900 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="https://wa.me/1234567890?text=Hi%2C%20I%27m%20ready%20to%20start%20my%20Le%20Fade%20subscription" 
                className="block bg-amber-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition-colors text-center mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}