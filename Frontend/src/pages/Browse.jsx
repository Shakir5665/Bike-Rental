import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import BikeCard from '../components/BikeCard';
import { Filter, Clock, CreditCard, ChevronRight, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Browse = () => {
  const { user } = useUser();
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedBike, setSelectedBike] = useState(null);
  const [hours, setHours] = useState(1);

  const API_URL = 'http://localhost:5237/api';

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await axios.get(`${API_URL}/bikes/available`);
      setBikes(response.data);
      setFilteredBikes(response.data);
    } catch (error) {
      toast.error('Failed to load bikes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filter === 'All') {
      setFilteredBikes(bikes);
    } else {
      setFilteredBikes(bikes.filter(b => b.type === filter));
    }
  }, [filter, bikes]);

  const handleRentClick = (bike) => {
    setSelectedBike(bike);
  };

  const confirmRental = async () => {
    if (!user) {
      toast.error('Please register to rent a bike');
      return;
    }

    try {
      await axios.post(`${API_URL}/rentals`, {
        userId: user.id,
        bikeId: selectedBike.id,
        hours: parseInt(hours)
      });
      toast.success(`Successfully rented ${selectedBike.name}!`);
      setSelectedBike(null);
      fetchBikes();
    } catch (error) {
      toast.error(error.response?.data || 'Rental failed');
    }
  };

  const bikeTypes = ['All', 'Mountain', 'Road', 'Electric', 'City'];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Available Bikes</h1>
          <p className="text-slate-400">Choose your ride and start your adventure.</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {bikeTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                filter === type 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' 
                : 'glass text-slate-300 hover:bg-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="glass h-80 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredBikes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBikes.map(bike => (
            <BikeCard 
              key={bike.id} 
              bike={bike} 
              onRent={handleRentClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
          <p className="text-slate-400 text-lg">No bikes available in this category.</p>
        </div>
      )}

      {/* Rental Modal */}
      <AnimatePresence>
        {selectedBike && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBike(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass rounded-3xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedBike(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="h-48 md:h-full relative">
                  <img src={selectedBike.imageUrl} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent md:hidden" />
                </div>
                
                <div className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{selectedBike.name}</h2>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">{selectedBike.type}</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-slate-400 text-sm mb-2 block">Rental Duration</span>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <select 
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 appearance-none"
                        >
                          {[1,2,3,4,5,6,7,8].map(h => (
                            <option key={h} value={h} className="bg-slate-900">{h} {h === 1 ? 'Hour' : 'Hours'}</option>
                          ))}
                        </select>
                      </div>
                    </label>

                    <div className="glass p-4 rounded-2xl flex items-center justify-between">
                      <div className="text-sm text-slate-400">Total Cost</div>
                      <div className="text-2xl font-black text-emerald-400">
                        ${(selectedBike.hourlyRate * hours).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={confirmRental}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                  >
                    Confirm Rental
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Browse;
