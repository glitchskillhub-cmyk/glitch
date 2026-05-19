import React, { useEffect, useState } from 'react';
import { 
  getAllStudents, 
  deleteStudent, 
  createStudent, 
  updateStudent,
  getAllBatches,
  createBatch
} from '../../utils/api';
import { 
  Search, 
  Plus, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  X,
  UserPlus,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Building,
  Save,
  CreditCard,
  MapPin,
  Layers,
  Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '', phone: '', email: '', course: 'Node.js Full Stack',
    rollNumber: '', collegeName: 'Fresher', location: '', branch: ''
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Batching States
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, batchesRes] = await Promise.all([
        getAllStudents(),
        getAllBatches()
      ]);
      setStudents(studentsRes.data);
      setBatches(batchesRes.data);
    } catch (error) {
      toast.error('Failed to load students & batches context.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete student record?')) return;
    try {
      await deleteStudent(id);
      toast.success('Record deleted.');
      fetchData();
    } catch { toast.error('Action failed.'); }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent(newStudent);
      toast.success('Student added manually!');
      setIsAddModalOpen(false);
      setNewStudent({
        name: '', phone: '', email: '', course: 'Node.js Full Stack',
        rollNumber: '', collegeName: 'Fresher', location: '', branch: ''
      });
      fetchData();
    } catch {
      toast.error('Failed to add student.');
    }
  };

  const openEditModal = (s) => {
    setEditStudent(s);
    setEditForm({
      name: s.name || '', phone: s.phone || '', email: s.email || '',
      course: s.course || 'Node.js Full Stack', rollNumber: s.rollNumber || '',
      collegeName: s.collegeName || 'Fresher', location: s.location || '',
      branch: s.branch || '', status: s.status || 'Pending'
    });
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(editStudent._id, editForm);
      toast.success('Student updated successfully!');
      setEditStudent(null);
      fetchData();
    } catch {
      toast.error('Failed to update student.');
    }
  };

  const handleBatchSubmit = async (e) => {
    e.preventDefault();
    const finalBatchName = selectedBatchId ? batches.find(b => b._id === selectedBatchId)?.name : batchName.trim();
    if (!finalBatchName) {
      return toast.error('Please specify a batch name or select an existing batch.');
    }
    if (selectedStudentIds.length === 0) {
      return toast.error('Please select at least one student.');
    }

    try {
      await createBatch({
        name: finalBatchName,
        studentIds: selectedStudentIds
      });
      toast.success(`Successfully assigned students to batch "${finalBatchName}"!`);
      setSelectedStudentIds([]);
      setBatchName('');
      setSelectedBatchId('');
      setIsBatchModalOpen(false);
      fetchData();
    } catch {
      toast.error('Failed to assign students to batch.');
    }
  };

  const toggleStudentSelection = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllStudents = () => {
    if (selectedStudentIds.length === filtered.length) {
      setSelectedStudentIds([]);
    } else {
      setSelectedStudentIds(filtered.map(s => s._id));
    }
  };

  const getDisplayStatus = (s) => {
    if (s.paymentStatus === 'Paid' || s.status === 'Active') return 'Active';
    if (s.status === 'Approved') return 'Approved';
    if (s.paymentStatus === 'Failed') return 'Failed';
    return s.status || 'Pending';
  };

  const filtered = students.filter(s => {
    const nameMatch = (s.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const phoneMatch = (s.phone || '').includes(searchTerm);
    const emailMatch = (s.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSearch = nameMatch || phoneMatch || emailMatch;
    const matchesType = filterType === 'all' || s.collegeName === filterType;
    return matchesSearch && matchesType;
  });

  const downloadCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Course', 'Passout', 'Type', 'Location', 'Status'];
    const rows = filtered.map(s => [s.name, s.phone, s.email, s.course, s.rollNumber, s.collegeName, s.location, s.status]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "glitch_students.csv";
    link.click();
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900 flex items-center gap-4">
              Student <span className="text-primary not-italic">Registry</span>
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-xl text-xs not-italic border border-primary/20">
                {filtered.length} Total
              </span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Manage and monitor all hub participants</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
           {selectedStudentIds.length > 0 && (
             <button 
               onClick={() => {
                 setBatchName('');
                 setSelectedBatchId('');
                 setIsBatchModalOpen(true);
               }}
               className="flex items-center gap-2 px-6 py-3.5 bg-yellow-400 text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-yellow-400/20 border border-yellow-500/20"
             >
                <Layers size={16} /> Batch Action ({selectedStudentIds.length})
             </button>
           )}
           <button 
             onClick={downloadCSV}
             className="flex items-center gap-2 px-6 py-3.5 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all text-zinc-600"
           >
              <Download size={16} /> Export CSV
           </button>
           <button 
             onClick={() => setIsAddModalOpen(true)}
             className="flex items-center gap-2 px-6 py-3.5 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
           >
              <Plus size={16} /> Add Student
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white border border-zinc-200 p-6 rounded-[2rem] shadow-sm">
         <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or phone..." 
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-6 py-3.5 text-sm focus:border-primary transition-all outline-none text-zinc-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <div>
            <select 
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-3.5 text-[10px] font-black uppercase tracking-widest focus:border-primary transition-all outline-none text-zinc-900 cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
               <option value="all">All Status</option>
               <option value="Fresher">Fresher</option>
               <option value="Employee">Employee</option>
            </select>
         </div>
         <button 
           onClick={fetchData}
           className="flex items-center justify-center gap-2 bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all group text-zinc-600"
         >
            <RefreshCw size={16} className={loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} /> Sync Data
         </button>
      </div>

      {/* Students Table */}
      <div className="bg-white border border-zinc-200 rounded-[2.5rem] overflow-hidden shadow-sm">
         <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-zinc-100 bg-zinc-50">
                     <th className="pl-8 py-6 w-12 text-left">
                        <input 
                          type="checkbox"
                          className="rounded border-zinc-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                          checked={filtered.length > 0 && selectedStudentIds.length === filtered.length}
                          onChange={toggleAllStudents}
                        />
                     </th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Student Info</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Contact</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Course</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Status</th>
                     <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 text-right">Actions</th>
               </tr>
               </thead>
               <tbody className="divide-y divide-zinc-50">
                  {loading ? (
                    [1,2,3,4,5].map(i => (
                      <tr key={i} className="animate-pulse">
                        <td colSpan="6" className="px-8 py-10 bg-white/[0.01]"></td>
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-8 py-20 text-center italic text-zinc-500">No student records matches your search.</td>
                    </tr>
                  ) : filtered.map((s) => (
                    <tr key={s._id} className="group hover:bg-white/[0.02] transition-all">
                       <td className="pl-8 py-6 w-12">
                          <input 
                            type="checkbox"
                            className="rounded border-zinc-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                            checked={selectedStudentIds.includes(s._id)}
                            onChange={() => toggleStudentSelection(s._id)}
                          />
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-yellow-500/10 border border-primary/20 flex items-center justify-center font-black text-primary italic">
                                {s.name.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-sm text-zinc-900 group-hover:text-primary transition-colors">{s.name}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mt-1 flex flex-wrap items-center gap-2">
                                  <span>{s.collegeName} • {s.rollNumber}</span>
                                  {s.batch && (
                                    <span className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest leading-none">
                                      {s.batch}
                                    </span>
                                  )}
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="space-y-1">
                             <div className="flex items-center gap-2 text-zinc-400">
                                <Mail size={12} className="text-primary" />
                                <span className="text-xs font-medium">{s.email}</span>
                             </div>
                             <div className="flex items-center gap-2 text-zinc-400">
                                <Phone size={12} className="text-primary" />
                                <span className="text-xs font-bold font-mono tracking-tighter">{s.phone}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="bg-zinc-50 border border-zinc-200 px-4 py-2 rounded-xl inline-block">
                             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900">{s.course}</p>
                             <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">{s.branch}</p>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                           {(() => { const ds = getDisplayStatus(s); const isActive = ds === 'Active' || ds === 'Approved'; const isFailed = ds === 'Failed'; return (
                           <span className={`
                             inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider
                             ${isActive ? 'bg-green-100 text-green-700' : isFailed ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-700'}
                           `}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : isFailed ? 'bg-red-500' : 'bg-orange-500 animate-pulse'}`}></span>
                              {ds}
                           </span>
                           ); })()}
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex justify-end items-center gap-2">
                              <button 
                                onClick={() => setSelectedStudent(s)}
                                title="View Details"
                                className="p-2.5 bg-zinc-100 text-zinc-500 rounded-xl hover:text-primary hover:bg-primary/10 transition-all border border-zinc-200"
                              >
                                 <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => openEditModal(s)}
                                title="Edit Student"
                                className="p-2.5 bg-zinc-100 text-zinc-500 rounded-xl hover:text-primary hover:bg-primary/10 transition-all border border-zinc-200"
                              >
                                 <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => handleDelete(s._id)}
                                title="Delete Student"
                                className="p-2.5 bg-zinc-100 text-zinc-500 rounded-xl hover:text-red-500 hover:bg-red-500/10 transition-all border border-zinc-200"
                              >
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
           <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-y-auto max-h-[90vh] scrollbar-hide">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <UserPlus size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Manual Entry</h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Enroll a student into the hub</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleAddStudent} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900"
                         placeholder="John Doe"
                         value={newStudent.name}
                         onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Email ID</label>
                       <input 
                         required
                         type="email" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900"
                         placeholder="john@example.com"
                         value={newStudent.email}
                         onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Phone Number</label>
                       <input 
                         required
                         type="tel" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900"
                         placeholder="9876543210"
                         value={newStudent.phone}
                         onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Passout Year</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900"
                         placeholder="2024"
                         value={newStudent.rollNumber}
                         onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Program Selection</label>
                       <select 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 cursor-pointer"
                         value={newStudent.course}
                         onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                       >
                          <option>Node.js Full Stack</option>
                          <option>React & Frontend</option>
                          <option>UI/UX Design</option>
                          <option>Python Data Science</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Current Status</label>
                       <select 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 cursor-pointer"
                         value={newStudent.collegeName}
                         onChange={(e) => setNewStudent({...newStudent, collegeName: e.target.value})}
                       >
                          <option value="Fresher">Fresher</option>
                          <option value="Employee">Employee</option>
                       </select>
                    </div>
                 </div>

                 <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full bg-zinc-900 text-white py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all shadow-xl"
                    >
                       Initialize Enrollment
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
      {/* View Details Modal */}
       {selectedStudent && (
         <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedStudent(null)}></div>
            <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center font-black text-2xl italic text-black">
                        {selectedStudent.name.charAt(0)}
                     </div>
                     <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter italic text-zinc-900 leading-none">{selectedStudent.name}</h3>
                        <p className="text-zinc-500 text-xs font-bold mt-2">{selectedStudent.collegeName} • ID: {selectedStudent._id.slice(-8)}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedStudent(null)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                     <X size={20} />
                  </button>
               </div>

               <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                     <div className="flex items-center gap-2 mb-2">
                        <Mail size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</p>
                     </div>
                     <p className="text-sm font-bold text-zinc-900 break-all">{selectedStudent.email}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                     <div className="flex items-center gap-2 mb-2">
                        <Phone size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</p>
                     </div>
                     <p className="text-sm font-bold text-zinc-900 font-mono">{selectedStudent.phone}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                     <div className="flex items-center gap-2 mb-2">
                        <Building size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Current Program</p>
                     </div>
                     <p className="text-sm font-bold text-zinc-900">{selectedStudent.course}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                     <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Batch / Branch</p>
                     </div>
                     <p className="text-sm font-bold text-zinc-900">{selectedStudent.branch || 'Not Specified'}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                     <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Passout Year</p>
                     </div>
                     <p className="text-sm font-bold text-zinc-900">{selectedStudent.rollNumber}</p>
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                     <div className="flex items-center gap-2 mb-2">
                        <CreditCard size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Payment Status</p>
                     </div>
                     {(() => { const ds = getDisplayStatus(selectedStudent); const isActive = ds === 'Active' || ds === 'Approved'; return (
                     <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                        <p className={`text-sm font-black uppercase ${isActive ? 'text-green-600' : 'text-orange-600'}`}>{ds}</p>
                     </div>
                     ); })()}
                  </div>
                  {selectedStudent.location && (
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 col-span-2">
                     <div className="flex items-center gap-2 mb-2">
                        <MapPin size={14} className="text-primary" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</p>
                     </div>
                     <p className="text-sm font-bold text-zinc-900">{selectedStudent.location}</p>
                  </div>
                  )}
               </div>

               <div className="flex gap-4">
                  <button onClick={() => { setSelectedStudent(null); openEditModal(selectedStudent); }} className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all flex items-center justify-center gap-2">
                     <Edit size={14} /> Edit Record
                  </button>
                  <button onClick={() => setSelectedStudent(null)} className="flex-1 bg-zinc-100 text-zinc-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-zinc-900 transition-all border border-zinc-200">Close Profile</button>
               </div>
            </div>
         </div>
       )}

       {/* Edit Student Modal */}
       {editStudent && (
         <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditStudent(null)}></div>
            <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[90vh] scrollbar-hide">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                        <Edit size={22} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Edit Student</h3>
                        <p className="text-zinc-500 text-xs font-bold mt-1">Update {editStudent.name}'s record</p>
                     </div>
                  </div>
                  <button onClick={() => setEditStudent(null)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                     <X size={20} />
                  </button>
               </div>

               <form onSubmit={handleEditStudent} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Name</label>
                        <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Email ID</label>
                        <input required type="email" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Phone Number</label>
                        <input required type="tel" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Passout Year</label>
                        <input required type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" value={editForm.rollNumber} onChange={(e) => setEditForm({...editForm, rollNumber: e.target.value})} />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Program</label>
                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 cursor-pointer" value={editForm.course} onChange={(e) => setEditForm({...editForm, course: e.target.value})}>
                           <option>Node.js Full Stack</option>
                           <option>React & Frontend</option>
                           <option>UI/UX Design</option>
                           <option>Python Data Science</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Type</label>
                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 cursor-pointer" value={editForm.collegeName} onChange={(e) => setEditForm({...editForm, collegeName: e.target.value})}>
                           <option value="Fresher">Fresher</option>
                           <option value="Employee">Employee</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Branch</label>
                        <input type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900" value={editForm.branch} onChange={(e) => setEditForm({...editForm, branch: e.target.value})} placeholder="e.g. CSE, ECE" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Status</label>
                        <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 cursor-pointer" value={editForm.status} onChange={(e) => setEditForm({...editForm, status: e.target.value})}>
                           <option value="Pending">Pending</option>
                           <option value="Active">Active</option>
                           <option value="Approved">Approved</option>
                           <option value="Rejected">Rejected</option>
                        </select>
                     </div>
                  </div>
                  <div className="pt-4">
                     <button type="submit" className="w-full bg-zinc-900 text-white py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all shadow-xl flex items-center justify-center gap-3">
                        <Save size={16} /> Save Student Changes
                     </button>
                  </div>
               </form>
            </div>
         </div>
       )}

        {/* Batch Creation/Assignment Modal */}
        {isBatchModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsBatchModalOpen(false)}></div>
             <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between mb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                         <Layers size={24} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Manage Batch</h3>
                         <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">Assign {selectedStudentIds.length} students to a batch</p>
                      </div>
                   </div>
                   <button onClick={() => setIsBatchModalOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                      <X size={20} />
                   </button>
                </div>

                <form onSubmit={handleBatchSubmit} className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Assign to Existing Batch</label>
                      <select 
                        value={selectedBatchId}
                        onChange={(e) => {
                          setSelectedBatchId(e.target.value);
                          if (e.target.value) setBatchName('');
                        }}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold cursor-pointer"
                      >
                        <option value="">-- Create a new batch instead --</option>
                        {batches.map(b => (
                          <option key={b._id} value={b._id}>{b.name} ({b.students?.length || 0} members)</option>
                        ))}
                      </select>
                   </div>

                   {!selectedBatchId && (
                     <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2 font-bold text-primary">New Batch Name</label>
                        <input 
                          type="text" 
                          required={!selectedBatchId}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                          placeholder="e.g. Batch-May-2026"
                          value={batchName}
                          onChange={(e) => setBatchName(e.target.value)}
                        />
                     </div>
                   )}

                   {/* Selected Students Preview */}
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Selected Students ({selectedStudentIds.length})</label>
                      <div className="max-h-36 overflow-y-auto bg-zinc-50 border border-zinc-150 rounded-2xl p-4 space-y-2 scrollbar-hide">
                        {students.filter(s => selectedStudentIds.includes(s._id)).map(s => (
                          <div key={s._id} className="flex items-center justify-between text-xs text-zinc-700 bg-white border border-zinc-100 p-2.5 rounded-xl">
                            <span className="font-bold">{s.name}</span>
                            <span className="text-[9px] uppercase tracking-wider text-zinc-400">{s.course}</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <button 
                     type="submit"
                     className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                   >
                      Apply Batch Assignment
                   </button>
                </form>
             </div>
          </div>
        )}
    </div>
  );
};

export default Students;
