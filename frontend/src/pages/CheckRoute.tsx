import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MapPin, Navigation, Search, Shield, AlertTriangle, CheckCircle, Info, Clock, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const safetyTips = [
  "Share your live location with a trusted contact before traveling.",
  "Keep emergency contacts easily accessible on your phone.",
  "Prefer well-lit and populated routes, especially at night.",
  "Trust your instincts — if something feels wrong, seek help.",
  "Keep your phone charged and carry a power bank.",
  "Note landmarks along your route for easier navigation.",
];

const CheckRoute = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleCheckRoute = () => {
    if (!fromLocation || !toLocation) return;
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const resetSearch = () => {
    setFromLocation('');
    setToLocation('');
    setShowResults(false);
  };

  return (
    <>
      <Helmet>
        <title>Check Route Safety | RakshaMarg - Women Safety Route Awareness</title>
        <meta name="description" content="Check the safety of your travel route before you go. Enter your start and destination to get safety awareness information." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1 pt-20 md:pt-24">
          {/* Hero Section */}
          <section className="py-12 gradient-hero">
            <div className="container px-4">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-2xl mb-6">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Check Your Route Safety
                </h1>
                <p className="text-lg text-muted-foreground">
                  Enter your starting point and destination to get safety awareness information for your journey.
                </p>
              </div>

              {/* Route Input Card */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8">
                  <div className="space-y-4">
                    {/* From Input */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter starting location"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="pl-12 h-14 text-base bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-secondary"
                      />
                    </div>

                    {/* Connector */}
                    <div className="flex items-center justify-center">
                      <div className="w-0.5 h-6 bg-border rounded-full" />
                    </div>

                    {/* To Input */}
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-coral">
                        <Navigation className="w-5 h-5" />
                      </div>
                      <Input
                        type="text"
                        placeholder="Enter destination"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="pl-12 h-14 text-base bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-coral"
                      />
                    </div>

                    {/* Button */}
                    <Button 
                      variant="hero" 
                      size="xl" 
                      className="w-full mt-4"
                      onClick={handleCheckRoute}
                      disabled={!fromLocation || !toLocation || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                          Analyzing Route...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5" />
                          Check Route Safety
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section */}
          {showResults && (
            <section className="py-12 animate-fade-in">
              <div className="container px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="grid lg:grid-cols-5 gap-6">
                    {/* Route Preview */}
                    <div className="lg:col-span-3 bg-card rounded-2xl shadow-card overflow-hidden">
                      <div className="p-6 border-b border-border">
                        <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-secondary" />
                          Route Preview
                        </h2>
                      </div>
                      
                      {/* Map Placeholder */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                        {/* Decorative map elements */}
                        <div className="absolute inset-0 opacity-10">
                          <svg className="w-full h-full" viewBox="0 0 400 300">
                            <path d="M50,150 Q100,100 150,120 T250,100 T350,130" stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" strokeDasharray="5,5" />
                            <circle cx="50" cy="150" r="8" fill="hsl(var(--secondary))" />
                            <circle cx="350" cy="130" r="8" fill="hsl(var(--coral))" />
                          </svg>
                        </div>
                        
                        <div className="text-center z-10">
                          <div className="w-16 h-16 bg-background/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                            <Navigation className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="text-muted-foreground font-medium">Route Visualization</p>
                          <p className="text-sm text-muted-foreground/70 mt-1">
                            {fromLocation} → {toLocation}
                          </p>
                        </div>
                      </div>

                      {/* Route info */}
                      <div className="p-6 bg-muted/30">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>Estimated time: ~25 min</span>
                          </div>
                          <div className="w-1 h-1 bg-border rounded-full" />
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>Distance: ~8.5 km</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Safety Panel */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Safety Indicator */}
                      <div className="bg-card rounded-2xl shadow-card p-6">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Safety Awareness
                        </h3>
                        
                        <div className="bg-secondary/10 rounded-xl p-4 mb-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-secondary" />
                            </div>
                            <div>
                              <p className="font-semibold text-secondary">Moderate Awareness</p>
                              <p className="text-xs text-muted-foreground">Route conditions analyzed</p>
                            </div>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-gradient-to-r from-secondary to-teal-light rounded-full" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                            <Info className="w-4 h-4 text-primary mt-0.5" />
                            <p className="text-sm text-muted-foreground">
                              This route passes through moderately populated areas with decent lighting.
                            </p>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-coral/5 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-coral mt-0.5" />
                            <p className="text-sm text-muted-foreground">
                              Consider alternative routes during late night hours (11 PM - 5 AM).
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Reset Button */}
                      <Button variant="outline" className="w-full" onClick={resetSearch}>
                        Check Another Route
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Safety Tips Section */}
          <section className="py-12 bg-card">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-coral" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Travel Safety Tips
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {safetyTips.map((tip, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 bg-background rounded-xl shadow-soft"
                    >
                      <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-secondary">{index + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CheckRoute;
