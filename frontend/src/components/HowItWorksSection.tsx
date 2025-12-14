import React from 'react';
import { MapPin, Navigation, Search, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { icon: MapPin, step: '01', title: 'Enter Your Starting Location', description: 'Tell us where your journey begins — your current location or any starting point.' },
  { icon: Navigation, step: '02', title: 'Enter Your Destination', description: 'Specify where you want to go — home, office, or any place you need to reach.' },
  { icon: Search, step: '03', title: 'Analyze Route Safety', description: 'Our system evaluates the route conditions and provides safety insights.' },
  { icon: CheckCircle, step: '04', title: 'Travel with Awareness', description: 'Make informed decisions about your travel based on the safety information provided.' },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-brand-first">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center mb-16 relative z-10">
          <span className="inline-block px-4 py-1.5 bg-brand-slate/10 text-brand-slate rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy mb-4">
            How RakshaMarg Works
          </h2>
          <p className="text-lg text-brand-slate">
            Four simple steps to check your route safety before you travel.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Connection line for Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-brand-slate/10 overflow-hidden">
             <motion.div 
               initial={{ x: '-100%' }}
               whileInView={{ x: '0%' }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="h-full w-full bg-gradient-to-r from-transparent via-brand-teal to-transparent"
             />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-brand-slate/5 relative z-10 h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-brand-teal text-brand-navy rounded-full flex items-center justify-center font-display font-bold text-sm shadow-lg ring-4 ring-brand-first">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mt-4 mb-5 bg-brand-first rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-teal/20 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-brand-navy" />
                  </div>

                  <h3 className="font-display text-lg font-semibold text-brand-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-brand-slate text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;