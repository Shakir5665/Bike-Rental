import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bike, Shield, Clock, MapPin, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden rounded-3xl">
        <img 
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Bike background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full glass text-emerald-400 text-sm font-bold tracking-wider uppercase mb-6 inline-block">
              Premium Bike Rentals
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Ride the <span className="text-emerald-500">Future</span> of Urban Mobility
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Eco-friendly, healthy, and stylish. Rent a premium bike in seconds and explore your city like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/browse" 
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 group"
              >
                Browse Bikes
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 rounded-2xl font-bold text-lg transition-all">
                How it Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Shield className="text-emerald-400" size={32} />, title: "Fully Insured", desc: "All our rentals come with comprehensive damage protection." },
          { icon: <Clock className="text-emerald-400" size={32} />, title: "Instant Access", desc: "Unlock and ride in seconds using our seamless mobile app." },
          { icon: <MapPin className="text-emerald-400" size={32} />, title: "Wide Coverage", desc: "Pickup and drop-off stations located across the entire city." }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats/Social Proof */}
      <section className="glass rounded-3xl p-12 flex flex-wrap justify-around items-center gap-8">
        <div className="text-center">
          <div className="text-4xl font-black text-emerald-500 mb-2">500+</div>
          <div className="text-slate-400 font-medium">Bikes Available</div>
        </div>
        <div className="text-center border-x border-white/10 px-12">
          <div className="text-4xl font-black text-emerald-500 mb-2">12k+</div>
          <div className="text-slate-400 font-medium">Happy Riders</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-emerald-500 mb-2">4.9/5</div>
          <div className="text-slate-400 font-medium">User Rating</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
