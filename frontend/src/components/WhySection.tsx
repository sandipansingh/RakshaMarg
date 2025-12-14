import React, { useRef, useState } from 'react';
import { Shield, Heart, Zap, Users, Target, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const features = [
  { icon: Shield, title: 'Built for Women Safety', description: 'Designed with women\'s unique travel safety needs at the core of every feature.', color: 'primary' },
  { icon: Heart, title: 'Awareness-First Approach', description: 'We believe in empowering through knowledge, not creating fear or panic.', color: 'coral' },
  { icon: Target, title: 'Informed Decision Making', description: 'Get the information you need to make smart choices about your travel routes.', color: 'secondary' },
  { icon: Users, title: 'Social Impact Driven', description: 'Contributing to a safer society where women can travel freely and confidently.', color: 'teal' },
  { icon: Zap, title: 'Simple & Fast', description: 'Quick, easy-to-understand safety checks without complicated processes.', color: 'coral' },
  { icon: Sparkles, title: 'Continuously Improving', description: 'We\'re always working to provide better, more accurate safety information.', color: 'secondary' },
];

// Reusable Spotlight Card Component
const SpotlightCard = ({ feature, index }: { feature: any, index: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-background rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-brand-slate/10"
    >
      {/* Spotlight Gradient Overlay */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(159, 211, 199, 0.15), transparent 40%)`,
          opacity: opacity,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-brand-light transition-transform duration-300 group-hover:scale-110 shadow-inner`}>
          <feature.icon className={`w-7 h-7 text-brand-navy`} />
        </div>

        <h3 className="font-display text-xl font-semibold text-brand-navy mb-3">
          {feature.title}
        </h3>
        <p className="text-brand-slate leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const WhySection = () => {
  return (
    <section className="py-24 bg-brand-light/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-brand-teal/10 text-brand-navy rounded-full text-sm font-medium mb-4">
            Our Promise
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            Why Choose RakshaMarg?
          </h2>
          <p className="text-lg text-brand-slate">
            A platform built with care, purpose, and the mission to make every journey safer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <SpotlightCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;