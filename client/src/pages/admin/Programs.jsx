import React, { useEffect, useState } from 'react';
import { getAllCourses, deleteCourse, createCourse, updateCourse } from '../../utils/api';
import { 
  Plus, 
  Search, 
  BookOpen, 
  Trash2, 
  Edit, 
  Settings, 
  X,
  CreditCard,
  Clock,
  Layout,
  UploadCloud,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Programs = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  
  const [newCourse, setNewCourse] = useState({
    title: '', description: '', price: '9999', duration: '6 Months',
    instructor: 'Glitch Team', thumbnail: '', readMoreLink: '', startDate: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllCourses();
      setCourses(res.data);
    } catch (error) {
      toast.error('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program?')) return;
    try {
      await deleteCourse(id);
      toast.success('Course deleted.');
      fetchData();
    } catch { toast.error('Delete failed.'); }
  };

  const handleEditClick = (course) => {
    setIsEditMode(true);
    setEditingCourseId(course._id);
    setNewCourse({
      title: course.title || '',
      description: course.description || '',
      price: course.price?.toString() || '9999',
      duration: course.duration || '6 Months',
      instructor: course.instructor || 'Glitch Team',
      thumbnail: course.thumbnail || '',
      readMoreLink: course.readMoreLink || '',
      startDate: course.startDate || ''
    });
    setIsAddModalOpen(true);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCourse(editingCourseId, newCourse);
        toast.success('Course updated successfully!');
      } else {
        await createCourse(newCourse);
        toast.success('Course added successfully!');
      }
      setIsAddModalOpen(false);
      setIsEditMode(false);
      setEditingCourseId(null);
      setNewCourse({ 
        title: '', description: '', price: '9999', duration: '6 Months', 
        instructor: 'Glitch Team', thumbnail: '', readMoreLink: '', startDate: '' 
      });
      fetchData();
    } catch {
      toast.error(isEditMode ? 'Failed to update course.' : 'Failed to add course.');
    }
  };

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Program <span className="text-primary not-italic">Manager</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Curate and control all hub offerings</p>
        </div>
        <button 
          onClick={() => {
            setIsEditMode(false);
            setEditingCourseId(null);
            setNewCourse({ title: '', description: '', price: '9999', duration: '6 Months', instructor: 'Glitch Team', thumbnail: '', readMoreLink: '', startDate: '' });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-8 py-4 bg-primary text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
           <Plus size={16} /> New Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-[400px] bg-white rounded-[2.5rem] animate-pulse border border-zinc-100 shadow-sm"></div>)
        ) : courses.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border border-zinc-100 border-dashed">
             <BookOpen className="mx-auto text-zinc-300 mb-4" size={48} />
             <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No active programs found</p>
             <button 
               onClick={() => {
                 setIsEditMode(false);
                 setEditingCourseId(null);
                 setNewCourse({ title: '', description: '', price: '9999', duration: '6 Months', instructor: 'Glitch Team', thumbnail: '', readMoreLink: '', startDate: '' });
                 setIsAddModalOpen(true);
               }} 
               className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline"
             >
                Add one now
             </button>
          </div>
        ) : courses.map((course) => (
          <div key={course._id} className="bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden group hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-2xl">
             <div className="relative h-48 overflow-hidden bg-zinc-100">
                <img 
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => handleEditClick(course)}
                     className="p-2.5 bg-white/90 backdrop-blur-md text-zinc-900 rounded-xl hover:text-primary transition-all shadow-lg"
                   >
                      <Edit size={16} />
                   </button>
                   <button 
                     onClick={() => handleDelete(course._id)}
                     className="p-2.5 bg-white/90 backdrop-blur-md text-zinc-900 rounded-xl hover:text-red-500 transition-all shadow-lg"
                   >
                      <Trash2 size={16} />
                   </button>
                </div>
                <div className="absolute bottom-6 left-6">
                   <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg">
                      {course.duration}
                   </span>
                </div>
             </div>

             <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div>
                   <h3 className="text-xl font-black uppercase tracking-tighter italic text-zinc-900 group-hover:text-primary transition-colors leading-tight">
                      {course.title}
                   </h3>
                   <p className="text-zinc-500 text-xs font-bold line-clamp-2 mt-2 leading-relaxed">
                      {course.description}
                   </p>
                   {course.startDate && (
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-3 flex items-center gap-1.5">
                        <Clock size={12} className="text-primary" />
                        Starts: <span className="text-zinc-950 font-black">{course.startDate}</span>
                     </p>
                   )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Full Course</p>
                      <p className="text-lg font-black text-zinc-900 italic">₹{course.price || '9,999'}</p>
                   </div>
                   <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Slot Booking</p>
                      <p className="text-lg font-black text-primary italic">₹3,000</p>
                   </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center font-black text-[10px] text-zinc-500 border border-zinc-200">
                         {course.instructor.charAt(0)}
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{course.instructor}</p>
                   </div>
                   {course.readMoreLink ? (
                     <a 
                       href={course.readMoreLink} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1 group/btn"
                     >
                        Info/Read More <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                     </a>
                   ) : (
                     <button className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-primary flex items-center gap-1 group/btn">
                        Syllabus <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   )}
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Course Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-black">
                       <Layout size={24} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">
                          {isEditMode ? 'Edit Program' : 'New Program'}
                       </h3>
                       <p className="text-zinc-500 text-xs font-bold mt-1 uppercase tracking-widest">
                          {isEditMode ? 'Modify course parameters' : 'Create a course entry'}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setIsAddModalOpen(false)} className="p-3 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-2xl transition-all">
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Program Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                      placeholder="Node.js Full Stack Mastery"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Description</label>
                    <textarea 
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[80px]"
                      placeholder="What will students learn in this course?"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Price (₹)</label>
                       <input 
                         required
                         type="number" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="9999"
                         value={newCourse.price}
                         onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Duration</label>
                       <input 
                         required
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="6 Months"
                         value={newCourse.duration}
                         onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Course Start Date</label>
                       <input 
                         type="text" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="e.g. June 15, 2026"
                         value={newCourse.startDate}
                         onChange={(e) => setNewCourse({...newCourse, startDate: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Read More Link</label>
                       <input 
                         type="url" 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                         placeholder="https://glitchskillhub.com/course"
                         value={newCourse.readMoreLink}
                         onChange={(e) => setNewCourse({...newCourse, readMoreLink: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="pt-6">
                    <button 
                      type="submit"
                      className="w-full bg-primary text-black py-5 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
                    >
                       {isEditMode ? 'Save Changes' : 'Create Program'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Programs;
