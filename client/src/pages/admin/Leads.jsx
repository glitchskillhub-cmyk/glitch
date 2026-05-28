import React, { useState, useEffect } from 'react';
import { getAllLeads, updateLead, deleteLead } from '../../utils/api';
import toast from 'react-hot-toast';
import { 
  Users, 
  Search, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Edit,
  ExternalLink
} from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      // We can fetch specifically for node-js-course or all leads. 
      // For now, getting all leads. The endpoint supports ?source=node-js-course if needed.
      const res = await getAllLeads('node-js-course'); 
      setLeads(res.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus });
      setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
      toast.success('Lead status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(id);
      setLeads(leads.filter(lead => lead._id !== id));
      toast.success('Lead deleted successfully');
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Contacted': return 'bg-yellow-100 text-yellow-700';
      case 'Interested': return 'bg-primary/20 text-primary-dark';
      case 'Enrolled': return 'bg-green-100 text-green-700';
      case 'Not Interested': return 'bg-red-100 text-red-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Node JS Course Leads</h1>
          <p className="text-sm text-zinc-500 font-medium">Manage leads captured from the Node.js landing page</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border border-zinc-200 flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <span className="font-bold text-zinc-900">{leads.length}</span>
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">Total Leads</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {['All', 'New', 'Contacted', 'Interested', 'Enrolled', 'Not Interested'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                statusFilter === status 
                  ? 'bg-zinc-900 text-white shadow-md' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-200">
                <th className="p-4 text-xs font-black uppercase tracking-widest text-zinc-500">Lead Info</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-zinc-500">Contact</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-zinc-500">Date</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-zinc-500">Status</th>
                <th className="p-4 text-xs font-black uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-zinc-500 font-medium">
                    <div className="flex justify-center mb-2"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-zinc-500 font-medium">
                    No leads found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead._id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center text-primary-dark font-black text-lg">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900">{lead.name}</p>
                          <p className="text-xs text-zinc-500 font-medium capitalize flex items-center gap-1">
                            <ExternalLink size={10} /> {lead.source.replace(/-/g, ' ')}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-zinc-700">
                          <Mail size={14} className="text-zinc-400" />
                          <a href={`mailto:${lead.email}`} className="hover:text-primary transition-colors">{lead.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-700">
                          <Phone size={14} className="text-zinc-400" />
                          <a href={`tel:${lead.phone}`} className="hover:text-primary transition-colors">{lead.phone}</a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                        <Calendar size={14} className="text-zinc-400" />
                        {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer appearance-none ${getStatusColor(lead.status)}`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Interested">Interested</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Not Interested">Not Interested</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(lead._id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                        title="Delete Lead"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
