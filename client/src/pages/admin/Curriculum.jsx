import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Trash2, 
  BookOpen, 
  Play, 
  FileText, 
  ExternalLink,
  ChevronDown, 
  ChevronUp, 
  X, 
  Layout, 
  Settings,
  ListPlus,
  Tv,
  Loader2
} from 'lucide-react';
import { 
  getAllCourses, 
  getCourse, 
  addModule, 
  deleteModule, 
  addLesson, 
  deleteLesson 
} from '../../utils/api';
import { toast } from 'react-hot-toast';

const Curriculum = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  
  // Modals state
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  // Form states
  const [newModuleName, setNewModuleName] = useState('');
  const [newLesson, setNewLesson] = useState({
    title: '', content: '', videoUrl: '', resources: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await getAllCourses();
      setCourses(res.data);
      if (res.data.length > 0) {
        setSelectedCourse(res.data[0]._id);
      }
    } catch {
      toast.error('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseDetails(selectedCourse);
    }
  }, [selectedCourse]);

  const fetchCourseDetails = async (courseId) => {
    setDetailsLoading(true);
    try {
      const res = await getCourse(courseId);
      setCourseDetails(res.data);
    } catch {
      toast.error('Failed to load curriculum details.');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    if (!newModuleName.trim()) return;
    try {
      const res = await addModule(selectedCourse, { title: newModuleName });
      toast.success('Module added successfully!');
      setNewModuleName('');
      setIsAddModuleOpen(false);
      setCourseDetails(res.data);
    } catch {
      toast.error('Failed to add module.');
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module and all its lessons?')) return;
    try {
      const res = await deleteModule(selectedCourse, moduleId);
      toast.success('Module deleted successfully!');
      setCourseDetails(res.data);
    } catch {
      toast.error('Failed to delete module.');
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!newLesson.title.trim()) return;
    try {
      const resourcesArray = newLesson.resources
        ? newLesson.resources.split(',').map(r => r.trim()).filter(Boolean)
        : [];
      
      const res = await addLesson(selectedCourse, activeModuleId, {
        title: newLesson.title,
        content: newLesson.content,
        videoUrl: newLesson.videoUrl,
        resources: resourcesArray
      });

      toast.success('Lesson added successfully!');
      setNewLesson({ title: '', content: '', videoUrl: '', resources: '' });
      setIsAddLessonOpen(false);
      setCourseDetails(res.data);
    } catch {
      toast.error('Failed to add lesson.');
    }
  };

  const handleDeleteLesson = async (moduleId, lessonId) => {
    if (!window.confirm('Delete this lesson?')) return;
    try {
      const res = await deleteLesson(selectedCourse, moduleId, lessonId);
      toast.success('Lesson deleted.');
      setCourseDetails(res.data);
    } catch {
      toast.error('Failed to delete lesson.');
    }
  };

  const toggleModuleExpand = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 text-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900">
              Curriculum <span className="text-primary not-italic">Builder</span>
           </h1>
           <p className="text-zinc-500 text-sm mt-1 font-bold">Construct structured modules and interactive resources</p>
        </div>
        
        {courses.length > 0 && (
          <div className="flex gap-4 items-center">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Select Program:</label>
            <select 
              value={selectedCourse} 
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-white border border-zinc-200 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none text-zinc-700"
            >
              {courses.map(c => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {courses.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-[2.5rem] border border-zinc-100 border-dashed shadow-sm">
           <BookOpen className="mx-auto text-zinc-300 mb-4 animate-pulse" size={48} />
           <p className="text-zinc-400 font-bold italic text-lg uppercase tracking-widest">No programs created yet</p>
           <p className="text-zinc-400 text-xs mt-2">Go to Program Manager to create your first course!</p>
        </div>
      ) : detailsLoading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 className="animate-spin text-primary" size={36} />
        </div>
      ) : courseDetails ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Module list */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Course Syllabus ({courseDetails.modules?.length || 0} Modules)</h3>
                <button 
                  onClick={() => setIsAddModuleOpen(true)}
                  className="flex items-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                >
                   <Plus size={14} /> New Module
                </button>
             </div>

             <div className="space-y-4">
                {courseDetails.modules?.length === 0 ? (
                  <div className="py-16 text-center bg-white rounded-[2rem] border border-zinc-100 border-dashed">
                     <ListPlus className="mx-auto text-zinc-300 mb-4" size={36} />
                     <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No modules built for this syllabus</p>
                     <button onClick={() => setIsAddModuleOpen(true)} className="mt-4 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:underline">Insert module</button>
                  </div>
                ) : courseDetails.modules.map((module, index) => {
                  const isExpanded = !!expandedModules[module._id];
                  return (
                    <div key={module._id} className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm hover:border-zinc-200 transition-all">
                       <div className="flex items-center justify-between p-6 hover:bg-zinc-50/50 transition-colors">
                          <button 
                            onClick={() => toggleModuleExpand(module._id)}
                            className="flex items-center gap-4 flex-1 text-left"
                          >
                             <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black italic">
                                {index + 1}
                             </div>
                             <div>
                                <h4 className="font-black text-zinc-900 uppercase tracking-tight text-sm flex items-center gap-2">
                                   {module.title}
                                </h4>
                                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">{module.lessons?.length || 0} Lessons</p>
                             </div>
                          </button>
                          
                          <div className="flex items-center gap-3">
                             <button 
                               onClick={() => {
                                 setActiveModuleId(module._id);
                                 setIsAddLessonOpen(true);
                               }}
                               className="px-4 py-2 bg-zinc-50 border border-zinc-200 text-zinc-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all"
                             >
                                Add Lesson
                             </button>
                             <button 
                               onClick={() => handleDeleteModule(module._id)}
                               className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                             >
                                <Trash2 size={16} />
                             </button>
                             <button 
                               onClick={() => toggleModuleExpand(module._id)}
                               className="p-2 text-zinc-400 hover:text-zinc-900 rounded-xl transition-all"
                             >
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                             </button>
                          </div>
                       </div>

                       {isExpanded && (
                          <div className="border-t border-zinc-50 p-6 space-y-3 bg-zinc-50/30">
                             {module.lessons?.length === 0 ? (
                               <p className="text-center text-zinc-400 py-6 text-xs font-bold uppercase tracking-widest">No lessons added yet.</p>
                             ) : module.lessons.map((lesson, lessonIndex) => (
                               <div key={lesson._id} className="bg-white border border-zinc-100 rounded-2xl p-4 flex items-center justify-between group hover:border-primary/20 transition-all shadow-sm">
                                  <div className="flex items-center gap-4">
                                     <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-all border border-zinc-100">
                                        {lesson.videoUrl ? <Play size={14} /> : <FileText size={14} />}
                                     </div>
                                     <div>
                                        <p className="text-xs font-black uppercase text-zinc-900">{lesson.title}</p>
                                        <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                                           {lesson.videoUrl ? 'Video Lesson' : 'Reading Material'}
                                        </p>
                                     </div>
                                  </div>

                                  <div className="flex items-center gap-3">
                                     <button 
                                       onClick={() => handleDeleteLesson(module._id, lesson._id)}
                                       className="p-2 text-zinc-400 hover:text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                     >
                                        <Trash2 size={14} />
                                     </button>
                                  </div>
                               </div>
                             ))}
                          </div>
                       )}
                    </div>
                  )
                })}
             </div>
          </div>

          {/* Quick info panel */}
          <div className="space-y-8">
             <div className="bg-zinc-900 rounded-[2.5rem] text-white p-8 space-y-6 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(250,204,21,0.15)_0%,transparent_60%)]"></div>
                
                <h3 className="text-xl font-black uppercase tracking-tighter italic text-white flex items-center gap-3 relative z-10">
                   <Settings size={22} className="text-primary animate-spin-slow" /> Stats
                </h3>

                <div className="space-y-4 relative z-10">
                   <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-800">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Assigned Program</p>
                      <p className="text-sm font-black uppercase tracking-tight italic text-zinc-100">{courseDetails.title}</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-800">
                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Total Modules</p>
                         <p className="text-2xl font-black italic text-primary">{courseDetails.modules?.length || 0}</p>
                      </div>
                      <div className="p-4 bg-zinc-800/80 rounded-2xl border border-zinc-800">
                         <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-1">Total Lessons</p>
                         <p className="text-2xl font-black italic text-primary">
                            {courseDetails.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0}
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      ) : null}

      {/* Add Module Modal */}
      {isAddModuleOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModuleOpen(false)}></div>
           <div className="relative w-full max-w-md bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black">
                       <Layout size={20} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">New Module</h3>
                    </div>
                 </div>
                 <button onClick={() => setIsAddModuleOpen(false)} className="p-2 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-xl transition-all">
                    <X size={18} />
                 </button>
              </div>

              <form onSubmit={handleAddModule} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Module Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                      placeholder="Module 1: Getting Started"
                      value={newModuleName}
                      onChange={(e) => setNewModuleName(e.target.value)}
                    />
                 </div>
                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                 >
                    Create Module
                 </button>
              </form>
           </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {isAddLessonOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddLessonOpen(false)}></div>
           <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-black">
                       <Tv size={20} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black uppercase tracking-tighter italic leading-none text-zinc-900">Add Lesson</h3>
                       <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">Insert learning content into current module</p>
                    </div>
                 </div>
                 <button onClick={() => setIsAddLessonOpen(false)} className="p-2 bg-zinc-100 text-zinc-400 hover:text-zinc-900 rounded-xl transition-all">
                    <X size={18} />
                 </button>
              </div>

              <form onSubmit={handleAddLesson} className="space-y-5">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Lesson Title</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-900 font-bold"
                      placeholder="Intro to Node.js Servers"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Description / Content</label>
                    <textarea 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600 min-h-[80px]"
                      placeholder="Enter reading content or descriptive summary..."
                      value={newLesson.content}
                      onChange={(e) => setNewLesson({...newLesson, content: e.target.value})}
                    ></textarea>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Video URL (Optional)</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600"
                      placeholder="https://youtube.com/... or Cloudinary URL"
                      value={newLesson.videoUrl}
                      onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Resources (Comma separated links)</label>
                    <input 
                      type="text" 
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm focus:border-primary transition-all outline-none text-zinc-600"
                      placeholder="https://github.com/example, https://drive.google.com/..."
                      value={newLesson.resources}
                      onChange={(e) => setNewLesson({...newLesson, resources: e.target.value})}
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-primary text-black py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
                 >
                    Insert Lesson
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
