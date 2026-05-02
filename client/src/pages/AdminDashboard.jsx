import React, { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent, getDashboardStats } from '../utils/api';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Search, Eye, Trash2, Users, CreditCard, Clock, RefreshCw, Download, Filter, GraduationCap, Briefcase } from 'lucide-react';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ totalStudents: 0, totalPayments: 0, pendingPayments: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmployment, setFilterEmployment] = useState('all');
  const [filterYear, setFilterYear] = useState('all');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, statsRes] = await Promise.all([getAllStudents(), getDashboardStats()]);
      setStudents(studentsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student permanently?')) return;
    try {
      await deleteStudent(id);
      toast.success('Student deleted.');
      fetchData();
    } catch { toast.error('Delete failed.'); }
  };

  const downloadCSV = () => {
    const headers = ['Full Name', 'Phone', 'Email', 'Course', 'Passout Year', 'Type', 'City', 'Graduation', 'Status', 'Payment'];
    const rows = students.map(s => [
      s.name, s.phone, s.email, s.course, s.rollNumber, s.collegeName, s.location, s.branch, s.status, s.paymentStatus
    ]);
    
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "glitch_skill_hub_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) || (s.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmployment = filterEmployment === 'all' || s.collegeName === filterEmployment;
    const matchesYear = filterYear === 'all' || s.rollNumber === filterYear;
    return matchesSearch && matchesEmployment && matchesYear;
  });

  const StatCard = ({ icon, label, value }) => (
    <div className="glass-card rounded-3xl p-8 group hover:border-primary/50 transition-all border border-white/5">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-primary/10 text-primary group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,215,0,0.1)]">
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</p>
      <p className="text-3xl font-black text-white mt-1">{value}</p>
    </div>
  );

  return (
    <div className="flex bg-black min-h-screen text-white">
      <Sidebar />
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-display font-black tracking-tighter uppercase italic">
              Student <span className="text-primary not-italic">Registrations</span>
            </h1>
            <p className="text-zinc-500 text-sm mt-1 font-medium">Control center for Glitch Skill Hub</p>
          </div>
          <button onClick={downloadCSV} className="btn-yellow text-xs font-black uppercase tracking-widest py-3 px-6 shadow-none">
            <Download size={16} /> Download CSV
          </button>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<Users size={24} />} label="Total Registrations" value={stats.totalStudents} />
          <StatCard icon={<CreditCard size={24} />} label="Payments Completed" value={stats.totalPayments} />
          <StatCard icon={<Clock size={24} />} label="Pending Users" value={stats.pendingPayments} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8 glass-card p-6 rounded-3xl border border-white/5">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="input-field pl-12 bg-white/5 border-white/10 rounded-2xl focus:rounded-2xl transition-all" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={filterEmployment} 
              onChange={(e) => setFilterEmployment(e.target.value)} 
              className="bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all cursor-pointer"
            >
              <option value="all">Type: All</option>
              <option value="Fresher">Fresher</option>
              <option value="Employee">Employee</option>
            </select>
            <select 
              value={filterYear} 
              onChange={(e) => setFilterYear(e.target.value)} 
              className="bg-white/5 border border-white/10 text-white rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none focus:border-primary transition-all cursor-pointer"
            >
              <option value="all">Year: All</option>
              {['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027'].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <button onClick={fetchData} className="p-3 bg-white/5 text-primary border border-white/10 rounded-2xl hover:bg-primary hover:text-black transition-all">
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Full Name</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Phone Number</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Email</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Course</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest">Payment</th>
                  <th className="px-8 py-5 text-[10px] font-black text-primary uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr><td colSpan="7" className="px-8 py-20 text-center text-zinc-500 italic">Processing registry...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="7" className="px-8 py-20 text-center text-zinc-500">No student records found.</td></tr>
                ) : filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary text-black flex items-center justify-center font-black text-sm">{s.name.charAt(0)}</div>
                        <div>
                          <p className="font-bold text-sm text-white">{s.name}</p>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{s.collegeName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-zinc-400 font-bold font-mono">{s.phone}</td>
                    <td className="px-8 py-5 text-sm text-zinc-400 font-medium">{s.email}</td>
                    <td className="px-8 py-5">
                       <span className="bg-primary/5 text-primary border border-primary/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {s.course}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${s.status === 'Approved' ? 'bg-green-500/10 text-green-500' : s.status === 'Rejected' ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.status === 'Approved' ? 'bg-green-500' : s.status === 'Rejected' ? 'bg-red-500' : 'bg-primary animate-pulse'}`}></span>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${s.paymentStatus === 'Paid' ? 'text-green-500' : 'text-zinc-500'}`}>
                        {s.paymentStatus}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-3">
                        <Link to={`/admin/student/${s._id}`} className="p-2 bg-white/5 text-zinc-400 rounded-xl hover:bg-primary hover:text-black transition-all"><Eye size={18} /></Link>
                        <button onClick={() => handleDelete(s._id)} className="p-2 bg-white/5 text-zinc-400 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
