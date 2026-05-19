import React, { useEffect, useState } from 'react';
import { getAllBatches, deleteBatch, removeStudentFromBatch } from '../../utils/api';
import { 
  Layers, 
  Trash2, 
  UserMinus, 
  Users, 
  Calendar, 
  Search, 
  RefreshCw, 
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Batches = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await getAllBatches();
      setBatches(res.data);
      // Auto-select first batch if none selected
      if (res.data.length > 0 && !selectedBatch) {
        setSelectedBatch(res.data[0]);
      } else if (selectedBatch) {
        // Refresh the selected batch object from the new list
        const updated = res.data.find(b => b._id === selectedBatch._id);
        setSelectedBatch(updated || res.data[0] || null);
      }
    } catch (error) {
      toast.error('Failed to load batches.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleDeleteBatch = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the batch "${name}"? This will unassign all members.`)) {
      return;
    }
    try {
      await deleteBatch(id);
      toast.success(`Batch "${name}" deleted successfully.`);
      if (selectedBatch && selectedBatch._id === id) {
        setSelectedBatch(null);
      }
      fetchBatches();
    } catch {
      toast.error('Failed to delete batch.');
    }
  };

  const handleRemoveStudent = async (batchId, studentId, studentName) => {
    if (!window.confirm(`Remove ${studentName} from this batch?`)) {
      return;
    }
    try {
      await removeStudentFromBatch(batchId, studentId);
      toast.success(`${studentName} removed from batch.`);
      fetchBatches();
    } catch {
      toast.error('Failed to remove student from batch.');
    }
  };

  const filteredBatches = batches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900 flex items-center gap-4">
              Batch <span className="text-primary not-italic">Management</span>
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-xl text-xs not-italic border border-primary/20">
                {batches.length} Batches
              </span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Group students and assign tasks collectively</p>
        </div>
        <button 
          onClick={fetchBatches}
          className="flex items-center justify-center gap-2 bg-white border border-zinc-200 rounded-2xl px-6 py-3.5 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all text-zinc-600"
        >
           <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Sync Batches
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Batches List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search batches..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 text-sm focus:border-primary transition-all outline-none font-bold text-zinc-900"
            />
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
            {loading && batches.length === 0 ? (
              [1, 2, 3].map(i => (
                <div key={i} className="bg-white border border-zinc-200 p-6 rounded-[2rem] animate-pulse h-28" />
              ))
            ) : filteredBatches.length === 0 ? (
              <div className="bg-white border border-zinc-200 p-10 rounded-[2rem] text-center text-zinc-500 font-bold italic">
                No batches found. Create one by selecting students in the Students Registry!
              </div>
            ) : (
              filteredBatches.map((b) => {
                const isSelected = selectedBatch && selectedBatch._id === b._id;
                return (
                  <div 
                    key={b._id}
                    onClick={() => setSelectedBatch(b)}
                    className={`
                      border p-6 rounded-[2rem] cursor-pointer transition-all duration-300 relative group
                      ${isSelected 
                        ? 'bg-zinc-900 border-zinc-900 text-white shadow-xl shadow-zinc-900/10' 
                        : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300 hover:shadow-md'}
                    `}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className={`font-black text-lg italic tracking-tight ${isSelected ? 'text-primary' : 'text-zinc-900 group-hover:text-primary transition-colors'}`}>
                          {b.name}
                        </h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                          <span className="flex items-center gap-1.5">
                            <Users size={14} className="text-primary" />
                            {b.students?.length || 0} Members
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(b.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBatch(b._id, b.name);
                        }}
                        className={`
                          p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95
                          ${isSelected 
                            ? 'border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-red-400' 
                            : 'border-zinc-100 text-zinc-400 hover:bg-zinc-50 hover:text-red-600'}
                        `}
                        title="Delete Batch"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Selected Batch Members */}
        <div className="lg:col-span-2">
          {selectedBatch ? (
            <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-6">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight italic text-zinc-900 flex items-center gap-3">
                    <Layers className="text-primary" size={24} />
                    {selectedBatch.name}
                  </h2>
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mt-1">
                    Batch Members ({selectedBatch.students?.length || 0} total)
                  </p>
                </div>
              </div>

              {selectedBatch.students?.length === 0 ? (
                <div className="py-20 text-center text-zinc-400 font-bold italic">
                  This batch has no members. Select students in the registry to assign them.
                </div>
              ) : (
                <div className="overflow-x-auto scrollbar-hide">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-zinc-100 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
                        <th className="pb-4">Student</th>
                        <th className="pb-4">Contact</th>
                        <th className="pb-4">Course Details</th>
                        <th className="pb-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                      {selectedBatch.students.map((student) => (
                        <tr key={student._id} className="group/row">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black italic">
                                {student.name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-sm text-zinc-900">{student.name}</p>
                                <p className="text-[9px] font-bold text-zinc-400 tracking-wider mt-0.5">{student.rollNumber}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="space-y-0.5 text-xs text-zinc-500">
                              <div className="flex items-center gap-1.5">
                                <Mail size={10} className="text-primary" />
                                <span>{student.email}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone size={10} className="text-primary" />
                                <span>{student.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="text-xs font-bold text-zinc-900">{student.course}</p>
                              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">{student.branch}</p>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => handleRemoveStudent(selectedBatch._id, student._id, student.name)}
                              className="p-2 bg-zinc-50 text-zinc-400 hover:text-red-600 rounded-xl border border-zinc-100 hover:border-zinc-200 transition-all opacity-0 group-hover/row:opacity-100"
                              title="Remove from batch"
                            >
                              <UserMinus size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-16 shadow-sm text-center space-y-4 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-3xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                <Users size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-xl text-zinc-900 uppercase tracking-tight italic">No Batch Selected</h3>
                <p className="text-zinc-500 text-xs font-bold max-w-sm">
                  Select a batch from the sidebar list to view its registered members and manage collective options.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Batches;
