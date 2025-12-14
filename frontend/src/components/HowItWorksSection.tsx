import React from 'react';
import { MapPin, Navigation, Search, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    step: '01',
    title: 'Enter Your Starting Location',
    description: 'Tell us where your journey begins — your current location or any starting point.',
  },
  {
    icon: Navigation,
    step: '02',
    title: 'Enter Your Destination',
    description: 'Specify where you want to go — home, office, or any place you need to reach.',
  },
  {
    icon: Search,
    step: '03',
    title: 'Analyze Route Safety',
    description: 'Our system evaluates the route conditions and provides safety insights.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Travel with Awareness',
    description: 'Make informed decisions about your travel based on the safety information provided.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 gradient-hero relative">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How RakshaMarg Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Four simple steps to check your route safety before you travel.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative group"
              >
                {/* Step card */}
                <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-display font-bold text-sm shadow-soft">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mt-4 mb-5 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 text-secondary/50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
