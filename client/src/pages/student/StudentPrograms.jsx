import React, { useState, useEffect } from 'react';
import { Play, Rocket, Star, BookOpen, Clock, ChevronRight, Loader2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getMyEnrollments, getAllCourses } from '../../utils/api';

const StudentPrograms = () => {
  const [activePrograms, setActivePrograms] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramsAndCourses = async () => {
      try {
        const [enrollmentsRes, coursesRes] = await Promise.all([
          getMyEnrollments(),
          getAllCourses()
        ]);
        setActivePrograms(enrollmentsRes.data);
        setAvailableCourses(coursesRes.data);
      } catch (error) {
        console.error("Failed to fetch programs or courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgramsAndCourses();
  }, []);

  // Filter out courses the student is already active in
  const enrolledCourseTitles = new Set(
    activePrograms.map(p => p.course?.title?.toLowerCase().trim() || p.title?.toLowerCase().trim())
  );
  
  const coursesToShow = availableCourses.filter(
    c => !enrolledCourseTitles.has(c.title?.toLowerCase().trim())
  );

  const upcomingPrograms = [
    { title: "DevOps & Cloud", icon: Rocket, status: "Coming Soon" },
    { title: "Data Science", icon: Star, status: "Under Development" }
  ];

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">My Programs</h1>
          <p className="text-slate-500 font-medium mt-2">Continue your learning journey.</p>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="space-y-6">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          Active Enrollments
        </h2>
        
        {activePrograms.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {activePrograms.map((program, i) => (
              <div key={i} className="bento-card bg-white flex flex-col md:flex-row gap-10 p-10 border-slate-200 group">
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden relative shadow-lg">
                  <img 
                    src={program.course?.thumbnail || program.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt="program" 
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                     <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-900 shadow-xl">
                        <Play size={24} fill="currentColor" />
                     </div>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{program.course?.title || program.title}</h3>
                  <p className="text-slate-500 text-xs mb-6 font-bold line-clamp-2">
                     {program.course?.description || program.description || 'Access your full curriculum, learning modules, assignments and support channels.'}
                  </p>
                  <div className="space-y-6 mb-8">
                     <div className="flex justify-between items-end mb-2">
                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">Progress: {program.progress || 0}%</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target: Completion by June</p>
                     </div>
                     <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${program.progress || 0}%` }}></div>
                     </div>
                     <p className="text-xs font-bold text-slate-500 italic">
                       Next up: <span className="text-slate-900 not-italic">{program.nextLesson || 'Getting Started'}</span>
                     </p>
                  </div>
                  <Link to="/student/curriculum" className="btn-premium py-5 px-10 self-start group">
                    <span>Continue Learning</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bento-card bg-white p-16 text-center border-dashed border-slate-200">
            <BookOpen size={48} className="mx-auto text-slate-200 mb-6" />
            <h3 className="text-xl font-black uppercase mb-4">No Active Programs</h3>
            <p className="text-slate-500 mb-10 max-w-sm mx-auto">You haven't enrolled in any program yet. Enroll now to start your high-performance career journey.</p>
            <a href="#available-programs" className="btn-premium py-4 px-10 inline-flex items-center justify-center gap-2">
               <span>Explore Available Programs</span>
               <ChevronRight size={16} />
            </a>
          </div>
        )}
      </div>

      {/* Available Programs Section */}
      <div id="available-programs" className="space-y-6 pt-10 border-t border-slate-100">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
          Explore Available Programs
        </h2>

        {coursesToShow.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesToShow.map((course) => (
              <div key={course._id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden group hover:border-primary/30 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-2xl">
                 <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={course.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80'} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                       <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg">
                          {course.duration || '45 Days'}
                       </span>
                    </div>
                 </div>

                 <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                       <h3 className="text-xl font-black uppercase tracking-tighter italic text-slate-900 group-hover:text-primary transition-colors leading-tight">
                          {course.title}
                       </h3>
                       <p className="text-slate-500 text-xs font-bold line-clamp-3 leading-relaxed">
                          {course.description}
                       </p>
                       {course.startDate && (
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 pt-2">
                            <Clock size={12} className="text-primary" />
                            Starts: <span className="text-slate-950 font-black">{course.startDate}</span>
                         </p>
                       )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Full Course</p>
                          <p className="text-lg font-black text-slate-900 italic">₹{course.price || '9,999'}</p>
                       </div>
                       <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Slot Booking</p>
                          <p className="text-lg font-black text-primary italic">₹3,000</p>
                       </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-4 mt-auto">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500 border border-slate-200">
                                {course.instructor ? course.instructor.charAt(0) : 'G'}
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{course.instructor || 'Glitch Team'}</p>
                          </div>
                          
                          {course.readMoreLink && (
                            <a 
                              href={course.readMoreLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline flex items-center gap-1 group/btn"
                            >
                                Learn More <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                          )}
                       </div>

                       <Link 
                         to={`/register?course=${encodeURIComponent(course.title)}`}
                         className="btn-premium py-4 w-full flex items-center justify-center gap-2 text-center group"
                       >
                          <span>Enroll In Program</span>
                          <Rocket size={16} className="group-hover:translate-x-1 transition-transform animate-pulse" />
                       </Link>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bento-card bg-white p-12 text-center border-dashed border-slate-200">
             <Compass size={40} className="mx-auto text-slate-300 mb-4 animate-spin-slow" />
             <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">All programs are already in your active curriculum!</p>
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div className="space-y-6 pt-10">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {upcomingPrograms.map((program, i) => (
             <div key={i} className="bento-card bg-slate-50 border-dashed border-slate-200 p-8 flex items-center gap-6 grayscale opacity-60">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
                   <program.icon size={32} />
                </div>
                <div>
                   <h3 className="text-lg font-black text-slate-900 mb-1">{program.title}</h3>
                   <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{program.status}</span>
                </div>
                <button className="ml-auto bg-white border border-slate-200 text-slate-400 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-slate-900 hover:border-primary transition-all">Notify Me</button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StudentPrograms;
