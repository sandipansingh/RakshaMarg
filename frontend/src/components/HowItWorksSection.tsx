import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Bell, 
  Navigation,
  Smartphone,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: MapPin,
    title: "Enter Your Destination",
    desc: "Input your start and end points. Our system instantly analyzes multiple route options based on real-time safety data."
  },
  {
    icon: ShieldCheck,
    title: "Safety Analysis",
    desc: "Our AI evaluates street lighting, police presence, crowd density, and historical incident reports to score each route."
  },
  {
    icon: Navigation,
    title: "Choose Safest Path",
    desc: "Select the route with the highest 'Safety Score'. We highlight safe zones like 24/7 shops and police stations along the way."
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    desc: "Get notified if you deviate from the safe path. In emergencies, a single tap alerts your trusted contacts and nearby authorities."
  }
];

const HowItWorksSection = () => {
  return (
    // ADDED id="how-it-works" HERE
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-brand-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(138,44,255,0.05),transparent_40%)]" />

      <div className="container px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-teal text-xs font-bold tracking-widest uppercase mb-6">
            <Smartphone className="w-3 h-3" />
            <span>Simple & Effective</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            Master Your <span className="text-brand-purple">Safety</span>
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Complex safety data turned into simple, actionable guidance. 
            RakshaMarg makes navigating the city as easy as following a green line.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-dark border border-white/10 rounded-xl flex items-center justify-center text-xl font-bold text-white/30 group-hover:text-brand-purple group-hover:border-brand-purple/50 transition-colors shadow-lg">
                {index + 1}
              </div>
              
              <div className="mt-6 mb-6 w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-teal transition-colors">
                {step.title}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link to="/check-route">
            <Button size="lg" className="rounded-full bg-white text-brand-dark hover:bg-brand-teal hover:text-white font-semibold px-8 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Try It Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;