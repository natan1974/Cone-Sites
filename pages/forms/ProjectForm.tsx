import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Project } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

const ProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useData();

  const [formData, setFormData] = useState<Partial<Project>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      id: `PROJ-${Date.now()}`
    } as Project;
    
    addProject(newProject);
    alert('Projeto cadastrado com sucesso!');
    navigate('/projects');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastro de Projeto</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nome do Projeto</label>
            <input required name="name" onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="Ex: Expansão 5G SP" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Premissas do Projeto</label>
            <textarea required name="assumptions" onChange={handleChange} className="w-full p-2 border rounded-lg h-32" placeholder="Descreva as regras de negócio, tipos de site preferenciais, etc." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Observações</label>
            <textarea name="notes" onChange={handleChange} className="w-full p-2 border rounded-lg h-24" />
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Salvar Projeto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;