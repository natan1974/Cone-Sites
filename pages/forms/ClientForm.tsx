import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Client } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

const ClientForm: React.FC = () => {
  const navigate = useNavigate();
  const { addClient } = useData();

  const [formData, setFormData] = useState<Partial<Client>>({
    status: 'Ativo',
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      ...formData,
      id: `CLI-${Date.now()}` // Geração simples de ID
    } as Client;
    
    addClient(newClient);
    alert('Cliente cadastrado com sucesso!');
    navigate('/projects'); // Redireciona ou limpa o form
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastro de Cliente</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">CNPJ</label>
            <input required name="cnpj" onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="00.000.000/0000-00" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Razão Social</label>
            <input required name="businessName" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nome Fantasia</label>
            <input required name="tradeName" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Atividade</label>
            <input required name="activity" onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          
          <div className="col-span-2 grid grid-cols-3 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">CEP</label>
                <input required name="zipCode" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-slate-700">Logradouro</label>
                <input required name="street" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 col-span-2">
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Número</label>
                <input required name="number" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cidade</label>
                <input required name="city" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">UF</label>
                <input required name="state" onChange={handleChange} className="w-full p-2 border rounded-lg" maxLength={2} />
            </div>
          </div>

           <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Situação</label>
                <select name="status" onChange={handleChange} className="w-full p-2 border rounded-lg">
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                </select>
            </div>

          <div className="col-span-2 pt-4 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;