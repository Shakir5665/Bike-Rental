import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Zap, Map } from 'lucide-react';

const BikeCard = ({ bike, onRent, showRentButton = true }) => {
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'electric': return <Zap size={16} />;
      case 'mountain': return <Map size={16} />;
      default: return <Tag size={16} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass rounded-2xl overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={bike.imageUrl || 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=400'} 
          alt={bike.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-bold flex items-center gap-1">
          {getTypeIcon(bike.type)}
          {bike.type}
        </div>
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
          bike.status === 0 ? 'bg-emerald-500/80 text-white' : 'bg-red-500/80 text-white'
        }`}>
          {bike.status === 0 ? 'Available' : 'Rented'}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{bike.name}</h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="text-2xl">${bike.hourlyRate}</span>
            <span className="text-xs text-slate-400 font-normal">/ hr</span>
          </div>
        </div>
        
        {showRentButton && bike.status === 0 && (
          <button 
            onClick={() => onRent(bike)}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
          >
            Rent Now
          </button>
        )}
        {showRentButton && bike.status !== 0 && (
          <button 
            disabled
            className="w-full py-3 bg-slate-800 text-slate-500 rounded-xl font-bold cursor-not-allowed"
          >
            Currently Rented
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default BikeCard;
