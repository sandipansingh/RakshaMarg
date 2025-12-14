import React from 'react';
import { Shield, Heart, Zap, Users, Target, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Built for Women Safety',
    description: 'Designed with women\'s unique travel safety needs at the core of every feature.',
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Awareness-First Approach',
    description: 'We believe in empowering through knowledge, not creating fear or panic.',
    color: 'coral',
  },
  {
    icon: Target,
    title: 'Informed Decision Making',
    description: 'Get the information you need to make smart choices about your travel routes.',
    color: 'secondary',
  },
  {
    icon: Users,
    title: 'Social Impact Driven',
    description: 'Contributing to a safer society where women can travel freely and confidently.',
    color: 'teal',
  },
  {
    icon: Zap,
    title: 'Simple & Fast',
    description: 'Quick, easy-to-understand safety checks without complicated processes.',
    color: 'coral',
  },
  {
    icon: Sparkles,
    title: 'Continuously Improving',
    description: 'We\'re always working to provide better, more accurate safety information.',
    color: 'secondary',
  },
];

const WhySection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Promise
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose RakshaMarg?
          </h2>
          <p className="text-lg text-muted-foreground">
            A platform built with care, purpose, and the mission to make every journey safer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-background rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden"
            >
              {/* Decorative gradient blob */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity ${
                feature.color === 'primary' ? 'bg-primary' :
                feature.color === 'coral' ? 'bg-coral' :
                feature.color === 'secondary' ? 'bg-secondary' :
                'bg-teal'
              }`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  feature.color === 'primary' ? 'bg-primary/10' :
                  feature.color === 'coral' ? 'bg-coral/10' :
                  feature.color === 'secondary' ? 'bg-secondary/10' :
                  'bg-teal/10'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'primary' ? 'text-primary' :
                    feature.color === 'coral' ? 'text-coral' :
                    feature.color === 'secondary' ? 'text-secondary' :
                    'text-teal'
                  }`} />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
