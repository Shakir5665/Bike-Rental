import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, CheckCircle, XCircle, LayoutGrid, List } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [bikes, setBikes] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('bikes');
  const [isAdding, setIsAdding] = useState(false);
  const [newBike, setNewBike] = useState({ name: '', type: 'Mountain', hourlyRate: 0, imageUrl: '' });

  const API_URL = 'http://localhost:5237/api/admin';
  const HEADERS = { headers: { 'X-API-Key': 'admin123' } };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bikesRes, rentalsRes] = await Promise.all([
        axios.get(`${API_URL}/bikes/all`, HEADERS),
        axios.get(`${API_URL}/rentals/all`, HEADERS)
      ]);
      setBikes(bikesRes.data);
      setRentals(rentalsRes.data);
    } catch (error) {
      toast.error('Admin authorization failed or server offline');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBike = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/bikes`, newBike, HEADERS);
      toast.success('Bike added successfully');
      setIsAdding(false);
      setNewBike({ name: '', type: 'Mountain', hourlyRate: 0, imageUrl: '' });
      fetchData();
    } catch (error) {
      toast.error('Failed to add bike');
    }
  };

  const handleDeleteBike = async (id) => {
    if (!confirm('Are you sure you want to remove this bike?')) return;
    try {
      await axios.delete(`${API_URL}/bikes/${id}`, HEADERS);
      toast.success('Bike removed');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete bike');
    }
  };

  if (loading) return <div className="text-center py-20">Accessing secure dashboard...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Manage your fleet and monitor system performance.</p>
        </div>

        <div className="flex p-1 bg-slate-900 rounded-2xl border border-white/5">
          <button 
            onClick={() => setActiveView('bikes')}
            className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeView === 'bikes' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid size={18} /> Fleet
          </button>
          <button 
            onClick={() => setActiveView('rentals')}
            className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
              activeView === 'rentals' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <List size={18} /> All Rentals
          </button>
        </div>
      </div>

      {activeView === 'bikes' ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Fleet Management</h2>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <Plus size={18} /> {isAdding ? 'Cancel' : 'Add New Bike'}
            </button>
          </div>

          {isAdding && (
            <motion.form 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddBike} 
              className="glass p-8 rounded-3xl grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
            >
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bike Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Stealth Pro"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 px-4 focus:border-emerald-500 focus:outline-none"
                  value={newBike.name}
                  onChange={e => setNewBike({...newBike, name: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Type</label>
                <select 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 px-4 focus:border-emerald-500 focus:outline-none"
                  value={newBike.type}
                  onChange={e => setNewBike({...newBike, type: e.target.value})}
                >
                  <option value="Mountain">Mountain</option>
                  <option value="Road">Road</option>
                  <option value="Electric">Electric</option>
                  <option value="City">City</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hourly Rate ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 px-4 focus:border-emerald-500 focus:outline-none"
                  value={newBike.hourlyRate}
                  onChange={e => setNewBike({...newBike, hourlyRate: parseFloat(e.target.value)})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Image URL</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2 px-4 focus:border-emerald-500 focus:outline-none"
                  value={newBike.imageUrl}
                  onChange={e => setNewBike({...newBike, imageUrl: e.target.value})}
                />
              </div>
              <div className="lg:col-span-4 mt-2">
                <button className="w-full py-3 bg-emerald-600 rounded-xl font-bold">Save to Fleet</button>
              </div>
            </motion.form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map(bike => (
              <div key={bike.id} className="glass rounded-2xl overflow-hidden flex items-center p-4 gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                  <img src={bike.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{bike.name}</h4>
                  <p className="text-sm text-slate-500">${bike.hourlyRate}/hr • {bike.type}</p>
                  <div className={`text-[10px] uppercase font-black mt-1 ${bike.status === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {bike.status === 0 ? 'Available' : 'Currently Rented'}
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteBike(bike.id)}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-white/10">
                <th className="p-5 font-bold text-slate-400 text-sm uppercase tracking-wider">Rider</th>
                <th className="p-5 font-bold text-slate-400 text-sm uppercase tracking-wider">Bike</th>
                <th className="p-5 font-bold text-slate-400 text-sm uppercase tracking-wider">Duration</th>
                <th className="p-5 font-bold text-slate-400 text-sm uppercase tracking-wider">Total</th>
                <th className="p-5 font-bold text-slate-400 text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map(rental => (
                <tr key={rental.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-5 font-medium">{rental.userName}</td>
                  <td className="p-5 text-slate-300">{rental.bikeName}</td>
                  <td className="p-5 text-slate-400">{rental.hours}h</td>
                  <td className="p-5 font-bold text-emerald-400">${rental.totalCost.toFixed(2)}</td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      rental.status === 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {rental.status === 0 ? 'Active' : 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
