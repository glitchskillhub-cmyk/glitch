import React from 'react';

const Placeholder = ({ title }) => (
  <div className="py-20 text-center">
    <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-4">{title}</h1>
    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Module integration in progress...</p>
  </div>
);

export const Curriculum = () => <Placeholder title="Curriculum Manager" />;
export const Tasks = () => <Placeholder title="Task Control" />;
export const CareerHub = () => <Placeholder title="Career Hub Admin" />;
export const Certificates = () => <Placeholder title="Certificate Generator" />;
export const Community = () => <Placeholder title="Community Manager" />;
