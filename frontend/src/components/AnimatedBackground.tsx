import React from 'react';
import { Shield } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-hero opacity-90" />
      
      {/* Animated path lines */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* India map stylized outline */}
        <path
          d="M400,100 C450,120 500,80 550,100 C600,120 650,90 700,110 C720,180 750,220 780,280 C800,320 820,380 800,440 C780,500 750,540 700,580 C650,620 600,660 550,680 C500,700 450,680 400,640 C350,600 320,540 310,480 C300,420 320,360 350,300 C380,240 370,180 400,100"
          fill="none"
          stroke="hsl(var(--teal))"
          strokeWidth="2"
          strokeDasharray="1000"
          className="animate-path"
          style={{ animationDelay: '0s' }}
        />
        
        {/* Travel route lines */}
        <path
          d="M200,400 Q400,300 600,350 T900,300"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeDasharray="500"
          className="animate-path"
          style={{ animationDelay: '1s' }}
        />
        <path
          d="M150,500 Q350,400 550,450 T850,400"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="1.5"
          strokeDasharray="500"
          className="animate-path"
          style={{ animationDelay: '2s' }}
        />
        <path
          d="M250,600 Q450,500 650,550 T950,500"
          fill="none"
          stroke="hsl(var(--teal-light))"
          strokeWidth="1.5"
          strokeDasharray="500"
          className="animate-path"
          style={{ animationDelay: '1.5s' }}
        />
      </svg>

      {/* Floating shield elements */}
      <div className="absolute top-1/4 right-1/4 animate-float opacity-10">
        <Shield className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 animate-float opacity-5" style={{ animationDelay: '2s' }}>
        <Shield className="w-24 h-24 text-secondary" />
      </div>
      <div className="absolute top-1/2 right-1/6 animate-float opacity-5" style={{ animationDelay: '4s' }}>
        <Shield className="w-16 h-16 text-teal" />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/5 rounded-full blur-3xl" />
    </div>
  );
};

export default AnimatedBackground;
