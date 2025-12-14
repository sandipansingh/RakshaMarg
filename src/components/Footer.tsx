import React from 'react';
import { Shield, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-primary-foreground py-16">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main footer content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary/20 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <span className="font-display text-2xl font-bold">RakshaMarg</span>
              </div>
              <p className="text-primary-foreground/70 mb-6 max-w-md">
                Empowering women to travel safely with route awareness and informed decision-making. 
                Know your route. Travel with confidence.
              </p>
              
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-primary-foreground/60">
                © {new Date().getFullYear()} RakshaMarg.|| Team DNA Coded || All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
