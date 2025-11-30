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
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSite = {
        ...formData,
        // Garantindo que campos obrigatórios tenham valor se não preenchidos (mock)
    } as Site;
    
    addSite(newSite);
    alert('Site cadastrado com sucesso!');
    navigate('/projects');
  };

  // Filtrando colaboradores
  const clientCoords = collaborators.filter(c => c.type === 'CLIENTE');
  const hhCoords = collaborators.filter(c => c.type === 'FORNECEDOR');

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastro de Site</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bloco 1: Identificação */}
            <div className="md:col-span-3 border-b pb-2 mb-2">
                <h3 className="text-lg font-semibold text-slate-700">Identificação</h3>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ID Sharing</label>
                <input required name="sharingId" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">ID Operadora</label>
                <input required name="operatorId" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome Sharing</label>
                <input required name="sharingName" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome Operadora</label>
                <input required name="operatorName" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Projeto</label>
                <select required name="projectId" onChange={handleChange} className="w-full p-2 border rounded-lg">
                    <option value="">Selecione...</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>

            {/* Bloco 2: Localização */}
            <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-semibold text-slate-700">Localização e Técnica</h3>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cidade</label>
                <input required name="city" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">UF</label>
                <input required name="state" maxLength={2} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Regional</label>
                <input required name="regional" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Lat. Nominal</label>
                <input required type="number" step="any" name="nominalLatitude" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Long. Nominal</label>
                <input required type="number" step="any" name="nominalLongitude" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Altura Solicitada (m)</label>
                <input required type="number" name="requestedHeight" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            {/* Bloco 3: Gestão */}
             <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-semibold text-slate-700">Gestão e Prazos</h3>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Target Date</label>
                <input required type="date" name="targetDate" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Data Acionamento</label>
                <input required type="date" name="activationDate" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Ordem Acionamento</label>
                <input type="number" name="activationOrder" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Raio de Busca (m)</label>
                <input type="number" name="searchRadius" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Tamanho Área</label>
                <input name="size" onChange={handleChange} className="w-full p-2 border rounded-lg" placeholder="ex: 10x10" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Coord. Cliente</label>
                <select name="clientCoordinatorId" onChange={handleChange} className="w-full p-2 border rounded-lg">
                    <option value="">Selecione...</option>
                    {clientCoords.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Coord. HH (Fornecedor)</label>
                <select name="hhCoordinatorId" onChange={handleChange} className="w-full p-2 border rounded-lg">
                    <option value="">Selecione...</option>
                    {hhCoords.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

             <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-slate-700">Premissas do Projeto (Específicas)</label>
                <textarea name="projectAssumptions" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="md:col-span-3 flex justify-end pt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                    <Save className="w-4 h-4" /> Salvar Site
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SiteForm;