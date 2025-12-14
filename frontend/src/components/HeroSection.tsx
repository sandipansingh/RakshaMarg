import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Animation library
import docImg from '../assets/doc.png';
import pilotImg from '../assets/pilot.png';
import soldierImg from '../assets/soldier.png';
import mapBg from '../assets/map.png';

const HeroSection = () => {
  const images = [docImg, pilotImg, soldierImg];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15, delayChildren: 0.3 } 
    }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-first">
      
      {/* --- ENHANCED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src={mapBg} 
            alt="Map Background" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply grayscale-[20%]" 
          />
        </motion.div>
        
        {/* Radar Scanner Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
           <motion.div 
             animate={{ top: ['0%', '100%'] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-brand-teal/40 to-transparent w-full -translate-y-full"
           />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-light/30 to-brand-light" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVars}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Image Carousel */}
          <motion.div variants={itemVars} className="mb-8 inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-teal/30 rounded-full blur-2xl animate-shield" />
              <div className="relative bg-gradient-to-br from-brand-slate to-brand-navy p-6 rounded-2xl shadow-elevated">
                <img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  alt="Role Icon" 
                  className="w-23 h-20 object-contain animate-fade-in" // Keeping generic animate-fade-in for internal image switch
                />
              </div>
            </div>
          </motion.div>

          {/* Title with Mask Reveal */}
          <div className="overflow-hidden">
            <motion.h1 variants={itemVars} className="font-display text-5xl md:text-7xl font-bold mb-6 text-brand-navy">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-slate to-brand-navy">Raksha</span>
              <span className="text-brand-slate">Marg</span>
            </motion.h1>
          </div>

          <motion.p variants={itemVars} className="text-xl md:text-2xl font-display font-medium text-brand-slate/80 mb-4">
            Know Your Route. Travel with Confidence.
          </motion.p>

          <motion.p variants={itemVars} className="text-lg text-brand-slate/70 max-w-2xl mx-auto mb-10">
            RakshaMarg helps women evaluate the safety of routes before traveling — day or night. 
            Make informed decisions and travel with awareness.
          </motion.p>

          <motion.div variants={itemVars} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/check-route">
              <Button className="bg-brand-navy text-white hover:bg-brand-slate px-8 py-6 text-lg rounded-full group shadow-lg hover:shadow-brand-teal/20 transition-all duration-300">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVars} className="mt-12 flex items-center justify-center gap-2 text-sm text-brand-slate/60">
            <Shield className="w-4 h-4 text-brand-teal" />
            <span>Empowering safe travels across India</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;