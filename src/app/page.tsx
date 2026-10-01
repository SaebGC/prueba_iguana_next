"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Plus, Minus, MapPin, ChevronRight, Trophy, Calendar, Clock, Users, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FacilitiesSlider, BookingPayload } from '@/components/FacilitiesSlider';



export interface CartBookingItem {
  id: string;
  facilityId: string;
  facilityName: string;
  modalidad: string;
  date: string;
  time: string;
  hours: number;
  people?: number;
  rate: number;
  subtotal: number;
  icon?: React.ComponentType<{ className?: string }>;
  primaryColor?: string;
  image?: string;
}

export default function Home() {
  const [cart, setCart] = useState<CartBookingItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addBookingToCart = (booking: BookingPayload) => {
    const isExclusive = booking.isExclusive;
    const newBooking: CartBookingItem = {
      id: `${booking.facility.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      facilityId: booking.facility.id,
      facilityName: booking.facility.name,
      modalidad: isExclusive ? 'Reserva Exclusiva' : 'Por persona / hora',
      date: booking.selectedDate,
      time: booking.selectedTime,
      hours: booking.hours,
      people: isExclusive ? undefined : booking.people,
      rate: booking.facility.numericRate,
      subtotal: booking.totalPrice,
      icon: booking.facility.icon,
      primaryColor: booking.facility.primaryColor,
      image: booking.facility.image
    };

    setCart((prev) => [newBooking, ...prev]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  const updateHours = (id: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === id) {
        const newHours = Math.max(1, Math.min(8, item.hours + delta));
        const newSubtotal = item.people 
          ? item.rate * newHours * item.people 
          : item.rate * newHours;
        return { ...item, hours: newHours, subtotal: newSubtotal };
      }
      return item;
    }));
  };

  const totalCost = cart.reduce((acc, item) => acc + item.subtotal, 0);
  const totalBookings = cart.length;

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
              aria-label="Abrir carrito de compras"
            >
              <ShoppingCart className="w-6 h-6 text-club-accent" />
              {totalBookings > 0 && (
                <span className="absolute top-1 right-1 bg-club-primary text-btn-text text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse shadow-md">
                  {totalBookings}
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

      {/* Facilities Slider / Carousel */}
      <FacilitiesSlider onAddToCart={addBookingToCart} />



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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] md:w-[540px] bg-club-surface shadow-2xl z-50 flex flex-col border-l border-text-main/10"
              style={{ backgroundColor: 'var(--color-club-surface, #FFFFFF)' }}
            >
              {/* Header */}
              <div className="p-6 border-b border-text-main/10 flex items-center justify-between bg-club-bg/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-club-primary/20 text-club-primary">
                    <ShoppingCart className="w-5 h-5 text-text-main" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-black uppercase text-club-accent tracking-tight">
                      Tus Reservas
                    </h2>
                    <span className="text-xs font-sans text-text-muted">
                      {totalBookings} {totalBookings === 1 ? 'instalación seleccionada' : 'instalaciones seleccionadas'}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2.5 hover:bg-black/5 rounded-full transition-colors text-text-muted hover:text-club-accent focus:outline-none focus:ring-2 focus:ring-club-primary"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-text-muted text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-club-bg flex items-center justify-center mb-4 text-text-muted/40 border border-text-main/10">
                      <ShoppingCart className="w-10 h-10" />
                    </div>
                    <p className="font-display font-black text-xl text-club-accent uppercase tracking-tight">
                      Tu carrito está vacío
                    </p>
                    <p className="font-sans text-sm text-text-muted max-w-xs mt-1">
                      Explora nuestras instalaciones destacadas y reserva tu cancha o pase de acceso.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-6 px-6 py-3 rounded-xl bg-club-primary text-btn-text font-sans font-bold text-xs uppercase tracking-wider hover:bg-brand-green-dark transition-all shadow-md active:scale-95"
                    >
                      Explorar Instalaciones
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const IconComponent = item.icon || Trophy;

                    return (
                      <motion.div 
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id} 
                        className="bg-club-bg/40 p-4 sm:p-5 rounded-2xl border border-text-main/10 flex flex-col gap-3.5 transition-all hover:border-club-primary/30 relative group"
                      >
                        {/* Top: Thumbnail, Title, Badge & Delete */}
                        <div className="flex items-start gap-3.5">
                          {/* Thumbnail / Icon */}
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-club-bg shrink-0 border border-text-main/10">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.facilityName}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            ) : null}
                            <div 
                              className="absolute top-1 left-1 p-1 rounded-md backdrop-blur-md bg-white/90 shadow-xs"
                              style={{ color: item.primaryColor || '#B0BF3F' }}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span 
                                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider text-white shadow-xs"
                                style={{ backgroundColor: item.primaryColor || '#B0BF3F' }}
                              >
                                {item.modalidad}
                              </span>
                            </div>
                            <h4 className="font-display font-black text-base text-club-accent uppercase leading-snug line-clamp-1">
                              {item.facilityName}
                            </h4>

                            {/* Schedule & Attendance metadata */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-text-muted font-sans">
                              <span className="flex items-center gap-1 font-medium">
                                <Calendar className="w-3.5 h-3.5 text-club-primary" />
                                {item.date}
                              </span>
                              <span className="flex items-center gap-1 font-medium">
                                <Clock className="w-3.5 h-3.5 text-brand-blue" />
                                {item.time}
                              </span>
                              {item.people && (
                                <span className="flex items-center gap-1 font-medium text-text-main">
                                  <Users className="w-3.5 h-3.5 text-brand-green-dark" />
                                  {item.people} {item.people === 1 ? 'persona' : 'personas'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Remove button */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                            aria-label="Eliminar reserva"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Bottom: Hours adjuster and Subtotal */}
                        <div className="flex items-center justify-between pt-3 border-t border-text-main/10 font-sans">
                          {/* Stepper de Horas */}
                          <div className="flex items-center gap-2 bg-club-surface px-2 py-1 rounded-xl border border-text-main/15 shadow-xs">
                            <button 
                              onClick={() => updateHours(item.id, -1)}
                              disabled={item.hours <= 1}
                              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-club-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              aria-label="Disminuir horas"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-display font-black text-xs text-club-accent px-1">
                              {item.hours} {item.hours === 1 ? 'hr' : 'hrs'}
                            </span>
                            <button 
                              onClick={() => updateHours(item.id, 1)}
                              disabled={item.hours >= 8}
                              className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-club-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              aria-label="Aumentar horas"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Subtotal */}
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider block">
                              Subtotal
                            </span>
                            <span className="text-lg font-display font-black text-club-accent">
                              {formatCOP(item.subtotal)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 bg-club-bg/80 border-t border-text-main/10 backdrop-blur-md">
                  <div className="space-y-2 mb-5 font-sans">
                    <div className="flex justify-between items-center text-sm text-text-muted">
                      <span>Total de Reservas</span>
                      <span className="font-bold text-text-main">{totalBookings}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-text-main/10">
                      <span className="text-base font-display font-bold text-text-muted uppercase tracking-widest">
                        Total a Pagar
                      </span>
                      <span className="text-3xl font-display font-black text-club-accent">
                        {formatCOP(totalCost)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-club-accent text-btn-text font-sans font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-club-primary transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(176,191,63,0.4)] hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2">
                    <span>Continuar al Pago</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-xs text-center text-text-muted mt-4 flex items-center justify-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Horario oficial: America/Bogota (8:00 AM - 5:00 PM)</span>
                  </p>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
