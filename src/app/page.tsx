"use client";

import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Info, Clock, MapPin, ChevronRight, CheckCircle2, Dumbbell, Droplets, Trophy, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Data ---
const SERVICES = [
  {
    id: 'adult-pools',
    title: 'Adult Pools (1, 2 & 3)',
    type: 'Per person / hour',
    capacity: '50 pax/pool/hr',
    rate: 2000,
    icon: Droplets,
    description: 'Immerse yourself in our premium Olympic-sized pools designed for high-performance training and recovery.',
    popular: true
  },
  {
    id: 'kids-pool',
    title: 'Kids Pool 1',
    type: 'Per person / hour',
    capacity: '50 pax/pool/hr',
    rate: 2000,
    icon: Droplets,
    description: 'A safe, dynamic aquatic environment perfect for our youngest future champions.'
  },
  {
    id: 'large-soccer',
    title: 'Large Soccer Field',
    type: 'Exclusive Reservation',
    capacity: '1 full field',
    rate: 140000,
    icon: Trophy,
    description: 'Professional-grade turf field. Bring your team, dominate the game.'
  },
  {
    id: 'micro-soccer',
    title: 'Micro-soccer Field (5v5)',
    type: 'Exclusive Reservation',
    capacity: '1 full field',
    rate: 80000,
    icon: Trophy,
    description: 'Fast-paced action on a premium 5v5 pitch. High intensity guaranteed.'
  },
  {
    id: 'multisport-court',
    title: 'Multisport Court',
    type: 'Exclusive Reservation',
    capacity: '1 full field',
    rate: 70000,
    icon: Trophy,
    description: 'Volleyball or Basketball. State-of-the-art flooring for peak performance.'
  },
  {
    id: 'gym-1',
    title: 'Gym 1',
    type: 'Per person / hour',
    capacity: '20 pax/hr',
    rate: 2000,
    icon: Dumbbell,
    description: 'Elite conditioning equipment in a high-energy, motivational environment.'
  },
  {
    id: 'wet-zone',
    title: 'Wet Zone / Sauna',
    type: 'Per person / hour',
    capacity: '10 pax/hr',
    rate: 4000,
    icon: Info,
    description: 'Accelerate recovery with our premium sauna and contrast therapy facilities.',
    premium: true
  }
];

type CartItem = typeof SERVICES[0] & { quantity: number };

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (service: typeof SERVICES[0]) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item => item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...service, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const totalCost = cart.reduce((acc, item) => acc + (item.rate * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const formatCOP = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-club-bg text-text-main font-sans selection:bg-club-primary selection:text-btn-text">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-club-bg/80 backdrop-blur-md border-b border-text-main/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="text-4xl" role="img" aria-label="Iguana">🦎</span>
              <span className="font-display font-black text-2xl tracking-tight text-club-accent uppercase">
                Vice City <span className="text-club-primary">Iguana</span>
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
              <a href="#facilities" className="hover:text-club-primary transition-colors">Facilities</a>
              <a href="#about" className="hover:text-club-primary transition-colors">About</a>
              <a href="#contact" className="hover:text-club-primary transition-colors">Contact</a>
            </div>

            <motion.button 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-full hover:bg-black/5 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-club-accent" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-club-primary text-btn-text text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Dynamic decorative shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-blue-light/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-yellow/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-club-accent text-club-bg text-sm font-bold tracking-widest uppercase mb-6">
                Premium Sports Experience
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-black text-club-accent uppercase leading-[0.9] mb-8">
                Unleash <br />
                <span className="text-club-primary">Your Potential</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl font-light">
                Elevate your game in a high-energy, elite athletic environment. From professional turf fields to Olympic-level pools, the arena is yours.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#facilities" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-club-primary text-btn-text rounded-full font-bold uppercase tracking-widest hover:bg-brand-green-dark transition-all hover:shadow-[0_0_20px_rgba(176,191,63,0.4)] hover:-translate-y-1">
                  Book Your Court
                  <ChevronRight className="w-5 h-5" />
                </a>
                <a href="#about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-club-accent text-club-accent rounded-full font-bold uppercase tracking-widest hover:bg-club-accent hover:text-club-bg transition-all">
                  Club Details
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Catalog */}
      <section id="facilities" className="py-20 bg-club-surface/50 border-t border-text-main/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black text-club-accent uppercase mb-4">
                Our Facilities
              </h2>
              <p className="text-text-muted text-lg max-w-2xl">
                Select from our premium catalog of exclusive reservations and per-person access passes.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold bg-brand-blue-light/20 text-brand-blue px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>Open 8:00 AM - 5:00 PM Daily</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-club-surface rounded-3xl p-8 flex flex-col h-full border border-text-main/5 hover:shadow-[0_12px_40px_var(--color-shadow-color)] hover:-translate-y-2 transition-all duration-300 relative group"
              >
                {service.popular && (
                  <span className="absolute -top-3 -right-3 bg-club-primary text-btn-text text-xs font-black uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                    Popular
                  </span>
                )}
                {service.premium && (
                  <span className="absolute -top-3 -right-3 bg-gold-gradient text-club-accent text-xs font-black uppercase tracking-widest py-1 px-3 rounded-full shadow-lg">
                    Premium
                  </span>
                )}

                <div className="w-14 h-14 rounded-2xl bg-club-bg flex items-center justify-center mb-6 text-club-primary group-hover:scale-110 group-hover:bg-club-primary group-hover:text-btn-text transition-all">
                  <service.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-club-accent uppercase leading-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-text-muted text-sm mb-6 flex-grow">
                  {service.description}
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-club-primary" />
                    <span>{service.type}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <Users className="w-4 h-4 text-brand-blue" />
                    <span>{service.capacity}</span>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-club-bg flex items-center justify-between">
                  <div>
                    <span className="block text-xs text-text-muted font-bold uppercase tracking-widest mb-1">Rate</span>
                    <span className="text-xl font-black text-club-accent">{formatCOP(service.rate)}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(service)}
                    className="p-3 bg-club-accent text-club-bg rounded-xl hover:bg-club-primary hover:text-btn-text transition-colors shadow-md"
                    aria-label="Add to cart"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-club-accent text-club-bg py-16 border-t-[8px] border-club-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl" role="img" aria-label="Iguana">🦎</span>
              <span className="font-display font-black text-2xl tracking-tight uppercase">
                Vice City Iguana
              </span>
            </div>
            <p className="text-text-muted max-w-sm mb-6">
              The premier destination for athletes and fitness enthusiasts demanding the absolute best.
            </p>
            <div className="flex items-center gap-2 text-sm text-brand-blue-light">
              <MapPin className="w-4 h-4" />
              <span>America/Bogota Timezone (UTC-5)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-4 text-brand-yellow">Operations</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>Monday - Sunday</li>
                <li>8:00 AM - 5:00 PM</li>
                <li>Holidays included</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-4 text-brand-yellow">Policies</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><a href="#" className="hover:text-white transition-colors">Booking Rules</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cancellation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-sm text-center text-text-muted">
          © 2026 Vice City Iguana Club. All rights reserved.
        </div>
      </footer>

      {/* Cart Slide-out Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-club-surface shadow-2xl z-50 flex flex-col border-l border-text-main/10"
            >
              <div className="p-6 border-b border-club-bg flex items-center justify-between bg-club-bg/50">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-club-accent" />
                  <h2 className="text-xl font-display font-black uppercase text-club-accent">Your Cart</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-colors text-text-muted hover:text-club-accent"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-text-muted text-center">
                    <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
                    <p className="font-medium text-lg">Your cart is empty</p>
                    <p className="text-sm">Start booking our premium facilities.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id} 
                      className="flex items-center gap-4 bg-club-bg/50 p-4 rounded-2xl border border-text-main/5"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-club-primary shrink-0 shadow-sm">
                        <item.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-club-accent truncate">{item.title}</h4>
                        <p className="text-sm font-medium text-club-primary">{formatCOP(item.rate)}</p>
                      </div>

                      <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-text-main/5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-text-muted hover:text-club-accent transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-club-accent w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-text-muted hover:text-club-accent transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-text-muted hover:text-red-500 transition-colors shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 bg-club-bg/80 border-t border-text-main/10 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-text-muted uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-display font-black text-club-accent">{formatCOP(totalCost)}</span>
                  </div>
                  <button className="w-full py-4 bg-club-accent text-club-bg font-bold uppercase tracking-widest rounded-xl hover:bg-club-primary hover:text-btn-text transition-all hover:shadow-[0_8px_30px_rgba(176,191,63,0.4)] hover:-translate-y-1">
                    Proceed to Checkout
                  </button>
                  <p className="text-xs text-center text-text-muted mt-4 flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" />
                    All bookings use America/Bogota timezone
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
