import React, { useState, useEffect } from 'react';
import { 
  Play, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lock,
  Download,
  ExternalLink,
  Clock,
  BookOpen,
  Loader2
} from 'lucide-react';
import { getMyEnrollments, markLessonComplete } from '../../utils/api';
import toast from 'react-hot-toast';

const Curriculum = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [enrollment, setEnrollment] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getMyEnrollments();
      if (res.data && res.data.length > 0) {
        // Find first valid enrollment with course
        const active = res.data.find(e => e.course);
        if (active) {
          setEnrollment(active);
          setCourse(active.course);
          setCompletedLessons(active.completedLessons || []);
          
          if (active.course.modules && active.course.modules.length > 0 && active.course.modules[0].lessons.length > 0) {
            setActiveLesson(active.course.modules[0].lessons[0]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch curriculum', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async (lessonId) => {
    if (!enrollment || completedLessons.includes(lessonId)) return;
    
    try {
      await markLessonComplete(enrollment._id, { lessonId });
      setCompletedLessons([...completedLessons, lessonId]);
      toast.success('Lesson completed!');
    } catch (error) {
      console.error('Failed to mark lesson complete', error);
      toast.error('Failed to update progress');
    }
  };

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
        <div className="bento-card bg-white p-16 text-center border-dashed border-slate-200">
           <BookOpen size={48} className="mx-auto text-slate-200 mb-6" />
           <h3 className="text-xl font-black uppercase mb-4">No Active Curriculum</h3>
           <p className="text-slate-500 max-w-sm mx-auto">You haven't enrolled in any program yet or your course doesn't have a curriculum setup.</p>
        </div>
      </div>
    );
  }

  // Calculate overall progress based on modules/lessons
  const totalLessons = course.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;
  const progressPercent = totalLessons === 0 ? 0 : Math.round((completedLessons.length / totalLessons) * 100);

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Curriculum</h1>
          <p className="text-slate-500 font-medium mt-2">{course.title}</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase">{progressPercent}% Progress</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Module List */}
        <div className="lg:col-span-2 space-y-4">
          {course.modules && course.modules.map((module, i) => {
            // A simple locking logic: if the previous module isn't 100% complete, lock this one.
            // For MVP, let's keep all unlocked for testing unless specified.
            const locked = false;

            return (
              <div key={module._id || i} className={`bento-card bg-white p-0 overflow-hidden border-slate-200 ${locked ? 'opacity-60 grayscale' : ''}`}>
                <button 
                  onClick={() => !locked && setActiveModule(activeModule === i ? -1 : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  disabled={locked}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${activeModule === i ? 'bg-primary text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                      {i + 1}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        {module.title}
                        {locked && <Lock size={14} className="text-slate-400" />}
                      </h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{module.lessons?.length || 0} Lessons</p>
                    </div>
                  </div>
                  {locked ? (
                     <Lock size={20} className="text-slate-300" />
                  ) : (
                    activeModule === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                  )}
                </button>

                {activeModule === i && !locked && (
                  <div className="px-6 pb-6 pt-2 space-y-2">
                    {module.lessons && module.lessons.map((lesson, j) => {
                      const isCompleted = completedLessons.includes(lesson._id?.toString() || lesson.title);
                      const isCurrentlyActive = activeLesson?._id === lesson._id || activeLesson?.title === lesson.title;

                      return (
                        <div 
                          key={lesson._id || j} 
                          onClick={() => handleLessonClick(lesson)}
                          className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group ${isCurrentlyActive ? 'border-primary bg-primary/5' : 'border-slate-50 hover:border-primary/30 hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center gap-4">
                            {isCompleted ? (
                              <CheckCircle2 size={18} className="text-green-500" />
                            ) : (
                              lesson.videoUrl ? <Play size={18} className="text-primary" /> : <FileText size={18} className="text-slate-400" />
                            )}
                            <div>
                              <p className={`text-sm font-bold ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{lesson.title}</p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{lesson.videoUrl ? 'Video' : 'Reading'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            {!isCompleted && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLessonComplete(lesson._id?.toString() || lesson.title);
                                }}
                                className="text-[10px] font-black uppercase text-green-500 border border-green-500 px-2 py-1 rounded"
                              >
                                Mark Done
                              </button>
                            )}
                            <button className="text-[10px] font-black uppercase text-primary tracking-widest">Start →</button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Current Lesson Sidebar */}
        <div className="space-y-8">
          <div className="bento-card bg-slate-900 text-white p-8">
            <h3 className="text-lg font-black uppercase mb-6 tracking-tight flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-slate-900">
                {activeLesson?.videoUrl ? <Play size={16} fill="currentColor" /> : <BookOpen size={16} />}
              </div>
              {activeLesson ? 'Currently Viewing' : 'Select a Lesson'}
            </h3>
            
            {activeLesson?.videoUrl ? (
              <div className="bg-slate-800 rounded-2xl aspect-video mb-6 flex items-center justify-center group cursor-pointer relative overflow-hidden">
                <img src={course.thumbnail || "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60"} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="lesson" />
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-900 z-10 shadow-xl shadow-primary/20">
                    <Play size={24} fill="currentColor" />
                </div>
              </div>
            ) : (
              <div className="bg-slate-800 rounded-2xl aspect-video mb-6 flex flex-col items-center justify-center text-slate-400">
                <BookOpen size={48} className="mb-4 opacity-50" />
                <span className="text-xs uppercase font-bold tracking-widest">Reading Material</span>
              </div>
            )}
            
            <h4 className="font-bold text-sm mb-2">{activeLesson?.title || 'No lesson selected'}</h4>
            <p className="text-slate-400 text-xs mb-6 line-clamp-3">{activeLesson?.content || 'Select a lesson to begin learning.'}</p>
            
            {activeLesson && (
              <button 
                onClick={() => {
                  const lessonId = activeLesson._id?.toString() || activeLesson.title;
                  if (!completedLessons.includes(lessonId)) {
                    handleLessonComplete(lessonId);
                  }
                }}
                className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                  completedLessons.includes(activeLesson._id?.toString() || activeLesson.title)
                    ? 'bg-green-500 text-white'
                    : 'bg-primary text-slate-900 hover:scale-[1.02]'
                }`}
              >
                {completedLessons.includes(activeLesson._id?.toString() || activeLesson.title) ? 'Completed' : 'Mark as Complete'}
              </button>
            )}
          </div>

          {activeLesson?.resources && activeLesson.resources.length > 0 && (
            <div className="bento-card bg-white p-8">
              <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Resources</h3>
              <div className="space-y-4">
                {activeLesson.resources.map((res, i) => (
                  <a key={i} href={res} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <ExternalLink size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-700 truncate max-w-[150px]">{res}</span>
                    </div>
                    <span className="text-[8px] font-black bg-slate-200 px-2 py-1 rounded uppercase tracking-widest">LINK</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
