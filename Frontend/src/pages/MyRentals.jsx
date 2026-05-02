import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../api/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Clock, CheckCircle, Calendar, Bike as BikeIcon, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

const MyRentals = () => {
  const { user } = useUser();
  const [activeRentals, setActiveRentals] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');



  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [activeRes, historyRes] = await Promise.all([
        axios.get(`${API_URL}/users/${user.id}/rentals/active`),
        axios.get(`${API_URL}/rentals/user/${user.id}/history`)
      ]);
      setActiveRentals(activeRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      toast.error('Failed to load rentals');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (rentalId) => {
    try {
      await axios.post(`${API_URL}/rentals/${rentalId}/return`);
      toast.success('Bike returned successfully!');
      fetchData();
    } catch (error) {
      toast.error('Failed to return bike');
    }
  };

  if (loading) return <div className="text-center py-20">Loading rentals...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Rentals</h1>
          <p className="text-slate-400">Track your current rides and past adventures.</p>
        </div>

        <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-8 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'active' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`px-8 py-2.5 rounded-xl font-bold transition-all ${
              activeTab === 'history' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            History
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'active' ? (
          <motion.div 
            key="active"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {activeRentals.length > 0 ? (
              activeRentals.map(rental => (
                <div key={rental.id} className="glass p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={rental.bike?.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-1">{rental.bike?.name}</h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5"><Clock size={14} className="text-emerald-400" /> {rental.hours}h Duration</div>
                      <div className="flex items-center gap-1.5"><Calendar size={14} className="text-emerald-400" /> Started {new Date(rental.startTime).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-2xl font-black text-white mb-2">${rental.totalCost.toFixed(2)}</div>
                    <button 
                      onClick={() => handleReturn(rental.id)}
                      className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all"
                    >
                      Return Bike
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 glass rounded-3xl">
                <BikeIcon size={48} className="mx-auto mb-4 text-slate-600" />
                <p className="text-slate-400 text-lg">No active rentals right now.</p>
                <Link to="/browse" className="text-emerald-400 font-bold hover:underline mt-2 inline-block">Start riding today</Link>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {history.length > 0 ? (
              history.map(rental => (
                <div key={rental.id} className="glass p-5 rounded-2xl flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{rental.bike?.name}</h4>
                      <p className="text-xs text-slate-500">{new Date(rental.startTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${rental.totalCost.toFixed(2)}</div>
                    <div className="text-xs text-slate-500 capitalize">{rental.status}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 glass rounded-3xl opacity-60">
                <p className="text-slate-400 text-lg">Your rental history is empty.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyRentals;
