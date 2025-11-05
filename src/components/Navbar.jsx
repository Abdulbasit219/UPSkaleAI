"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-lg shadow-lg shadow-purple-500/10' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
    
            {/* Changed from button to Link */}
            <Link href="/sign-in" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            
            <Link href="/sign-up" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-purple-500/20">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="block text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</a>
            
            {/* Changed from button to Link */}
            <Link href="/sign-in" className="block w-full text-left text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            
            <Link href="/sign-up" className="block w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-center">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;