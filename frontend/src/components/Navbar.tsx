import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHome
        ? 'bg-card/95 backdrop-blur-md shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="container px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-1.5 rounded-lg transition-colors ${
              isScrolled || !isHome ? 'bg-primary/10' : 'bg-primary-foreground/10'
            }`}>
              <Shield className={`w-6 h-6 transition-colors ${
                isScrolled || !isHome ? 'text-primary' : 'text-primary'
              }`} />
            </div>
            <span className={`font-display text-xl font-bold transition-colors ${
              isScrolled || !isHome ? 'text-foreground' : 'text-primary'
            }`}>
              RakshaMarg
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isScrolled || !isHome ? 'text-foreground' : 'text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/check-route" 
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isScrolled || !isHome ? 'text-foreground' : 'text-primary'
              }`}
            >
              Check Route
            </Link>
            <a 
              href="#how-it-works" 
              className={`text-sm font-medium transition-colors hover:text-secondary ${
                isScrolled || !isHome ? 'text-foreground' : 'text-primary'
              }`}
            >
              How It Works
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/check-route">
              <Button variant="teal" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled || !isHome ? 'text-foreground' : 'text-primary'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled || !isHome ? 'text-foreground' : 'text-primary'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border py-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground font-medium px-4 py-2 hover:bg-muted rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/check-route" 
                className="text-foreground font-medium px-4 py-2 hover:bg-muted rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Check Route
              </Link>
              <a 
                href="#how-it-works" 
                className="text-foreground font-medium px-4 py-2 hover:bg-muted rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <div className="px-4 pt-2">
                <Link to="/check-route" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="teal" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
