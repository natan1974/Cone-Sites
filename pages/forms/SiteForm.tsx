import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Site, SiteStatus } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

const SiteForm: React.FC = () => {
  const navigate = useNavigate();
  const { addSite, projects, collaborators } = useData();

  const [formData, setFormData] = useState<Partial<Site>>({
    status: SiteStatus.BUSCA,
    progress: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Se for número, converte e mantém. Se for string, converte para uppercase.
    const finalValue = type === 'number' ? Number(value) : value.toUpperCase();
    
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite = {
        ...formData,
    } as Site;
    
    addSite(newSite);
    alert('SITE CADASTRADO COM SUCESSO!');
    navigate('/projects');
  };

  const clientCoords = collaborators.filter(c => c.type === 'CLIENTE');
  const hhCoords = collaborators.filter(c => c.type === 'FORNECEDOR');

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase">Cadastro de Site</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bloco 1: Identificação */}
            <div className="md:col-span-3 border-b pb-2 mb-2">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Identificação</h3>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">ID Sharing</label>
                <input required name="sharingId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">ID Operadora</label>
                <input required name="operatorId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Nome Sharing</label>
                <input required name="sharingName" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Nome Operadora</label>
                <input required name="operatorName" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Projeto</label>
                <select required name="projectId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    <option value="">SELECIONE...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>

            {/* Bloco 2: Localização */}
            <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Localização e Técnica</h3>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Cidade</label>
                <input required name="city" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">UF</label>
                <input required name="state" maxLength={2} onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Regional</label>
                <input required name="regional" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Lat. Nominal</label>
                <input required type="number" step="any" name="nominalLatitude" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Long. Nominal</label>
                <input required type="number" step="any" name="nominalLongitude" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Altura Solicitada (m)</label>
                <input required type="number" name="requestedHeight" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            {/* Bloco 3: Gestão */}
             <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Gestão e Prazos</h3>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Target Date</label>
                <input required type="date" name="targetDate" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Data Acionamento</label>
                <input required type="date" name="activationDate" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Ordem Acionamento</label>
                <input type="number" name="activationOrder" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Raio de Busca (m)</label>
                <input type="number" name="searchRadius" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Tamanho Área</label>
                <input name="size" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" placeholder="EX: 10X10" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Coord. Cliente</label>
                <select name="clientCoordinatorId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    <option value="">SELECIONE...</option>
                    {clientCoords.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Coord. HH (Fornecedor)</label>
                <select name="hhCoordinatorId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    <option value="">SELECIONE...</option>
                    {hhCoords.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

             <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Premissas do Projeto (Específicas)</label>
                <textarea name="projectAssumptions" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>

            <div className="md:col-span-3 flex justify-end pt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 uppercase font-semibold">
                    <Save className="w-4 h-4" /> Salvar Site
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SiteForm;