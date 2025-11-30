import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Collaborator } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

const CollaboratorForm: React.FC = () => {
  const navigate = useNavigate();
  const { addCollaborator, clients } = useData();

  const [formData, setFormData] = useState<Partial<Collaborator>>({
    type: 'CLIENTE'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCollab = {
      ...formData,
      id: `COL-${Date.now()}`
    } as Collaborator;
    
    addCollaborator(newCollab);
    alert('Colaborador cadastrado com sucesso!');
    navigate('/projects');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastro de Colaborador</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Tipo de Colaborador</label>
            <select name="type" onChange={handleChange} className="w-full p-2 border rounded-lg">
                <option value="CLIENTE">Colaborador Cliente</option>
                <option value="FORNECEDOR">Colaborador Fornecedor</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nome Completo</label>
            <input required name="name" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Função/Cargo</label>
            <input required name="role" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          {formData.type === 'CLIENTE' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Vincular a Cliente (Empresa)</label>
                <select name="clientId" onChange={handleChange} className="w-full p-2 border rounded-lg">
                    <option value="">Selecione...</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.tradeName}</option>)}
                </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Celular</label>
            <input required name="mobile" onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="(00) 00000-0000" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input required type="email" name="email" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>

          <div className="col-span-2 flex justify-end pt-4">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Salvar Colaborador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollaboratorForm;