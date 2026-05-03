import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';

const Curriculum = () => {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      title: "Module 1: Introduction to Full Stack",
      duration: "4 Hours",
      lessons: [
        { title: "Web Development Overview", type: "video", duration: "15m", completed: true },
        { title: "Setting up your Dev Environment", type: "video", duration: "25m", completed: true },
        { title: "HTML5 Semantic Tags & Best Practices", type: "reading", duration: "10m", completed: true },
      ]
    },
    {
      title: "Module 2: Advanced JavaScript (ES6+)",
      duration: "12 Hours",
      lessons: [
        { title: "Closures & Prototypes", type: "video", duration: "45m", completed: true },
        { title: "Async/Await & Event Loop", type: "video", duration: "40m", completed: true },
        { title: "Functional Programming in JS", type: "video", duration: "35m", completed: false },
        { title: "DOM Manipulation Masterclass", type: "resource", duration: "15m", completed: false },
      ]
    },
    {
      title: "Module 3: React.js Fundamentals",
      duration: "20 Hours",
      lessons: [
        { title: "React Components & Props", type: "video", duration: "30m", completed: false },
        { title: "State Management with Hooks", type: "video", duration: "50m", completed: false },
        { title: "Virtual DOM Deep Dive", type: "video", duration: "25m", completed: false },
      ]
    },
    {
      title: "Module 4: Express.js & Backend Architecture",
      duration: "15 Hours",
      locked: false,
      lessons: [
        { title: "Node.js Architecture", type: "video", duration: "30m", completed: false },
        { title: "Express.js Routing", type: "video", duration: "45m", completed: false },
        { title: "Middleware Patterns", type: "video", duration: "40m", completed: false },
      ]
    },
    {
      title: "Module 5: MongoDB & Database Design",
      duration: "10 Hours",
      locked: true,
      lessons: []
    }
  ];

  return (
    <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Curriculum</h1>
          <p className="text-slate-500 font-medium mt-2">Master the stack step by step.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
          <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '45%' }}></div>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase">45% Progress</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Module List */}
        <div className="lg:col-span-2 space-y-4">
          {modules.map((module, i) => (
            <div key={i} className={`bento-card bg-white p-0 overflow-hidden border-slate-200 ${module.locked ? 'opacity-60 grayscale' : ''}`}>
              <button 
                onClick={() => !module.locked && setActiveModule(activeModule === i ? -1 : i)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                disabled={module.locked}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${activeModule === i ? 'bg-primary text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                    {i + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      {module.title}
                      {module.locked && <Lock size={14} className="text-slate-400" />}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{module.duration} • {module.lessons.length} Lessons</p>
                  </div>
                </div>
                {module.locked ? (
                   <Lock size={20} className="text-slate-300" />
                ) : (
                  activeModule === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />
                )}
              </button>

              {activeModule === i && !module.locked && (
                <div className="px-6 pb-6 pt-2 space-y-2">
                  {module.lessons.map((lesson, j) => (
                    <div key={j} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-primary/30 hover:bg-slate-50 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        {lesson.completed ? (
                          <CheckCircle2 size={18} className="text-green-500" />
                        ) : (
                          lesson.type === 'video' ? <Play size={18} className="text-primary" /> : <FileText size={18} className="text-slate-400" />
                        )}
                        <div>
                          <p className={`text-sm font-bold ${lesson.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{lesson.title}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">{lesson.type} • {lesson.duration}</p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[10px] font-black uppercase text-primary tracking-widest">Start →</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Current Lesson Sidebar */}
        <div className="space-y-8">
          <div className="bento-card bg-slate-900 text-white p-8">
            <h3 className="text-lg font-black uppercase mb-6 tracking-tight flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-slate-900">
                <Play size={16} fill="currentColor" />
              </div>
              Resume Now
            </h3>
            <div className="bg-slate-800 rounded-2xl aspect-video mb-6 flex items-center justify-center group cursor-pointer relative overflow-hidden">
               <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="lesson" />
               <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-slate-900 z-10 shadow-xl shadow-primary/20">
                  <Play size={24} fill="currentColor" />
               </div>
            </div>
            <h4 className="font-bold text-sm mb-2">Functional Programming in JS</h4>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-6">Module 2 • Lesson 3</p>
            <button className="btn-premium w-full py-4 text-xs">
              <span>Continue Video</span>
            </button>
          </div>

          <div className="bento-card bg-white p-8">
            <h3 className="text-lg font-black uppercase mb-6 tracking-tight">Resources</h3>
            <div className="space-y-4">
              {[
                { name: "Node.js Cheatsheet", type: "PDF" },
                { name: "Express Patterns", type: "DOC" },
                { name: "Github Repo", type: "LINK" }
              ].map((res, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {res.type === 'LINK' ? <ExternalLink size={14} /> : <Download size={14} />}
                    </div>
                    <span className="text-xs font-bold text-slate-700">{res.name}</span>
                  </div>
                  <span className="text-[8px] font-black bg-slate-200 px-2 py-1 rounded uppercase tracking-widest">{res.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
