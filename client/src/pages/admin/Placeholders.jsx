import React from 'react';
import { Layout } from 'lucide-react';

const Placeholder = ({ title }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white border border-zinc-100 border-dashed rounded-[3rem] p-12 text-center shadow-sm">
    <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mb-8 animate-pulse">
      <Layout size={48} />
    </div>
    <h2 className="text-4xl font-black uppercase tracking-tighter italic text-zinc-900 mb-4">{title}</h2>
    <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Module Integration in Progress...</p>
  </div>
);

export const Curriculum = () => <Placeholder title="Curriculum Manager" />;
export const Tasks = () => <Placeholder title="Task Control" />;
export const CareerHub = () => <Placeholder title="Career Hub Admin" />;
export const Certificates = () => <Placeholder title="Certificate Generator" />;
export const Community = () => <Placeholder title="Community Manager" />;
