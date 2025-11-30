import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Candidate, CandidateStatus, SiteStatus, SiteType } from '../../types';
import { ArrowLeft, Save } from 'lucide-react';

const CandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const { addCandidate, sites, collaborators } = useData();

  const [formData, setFormData] = useState<Partial<Candidate>>({
    status: CandidateStatus.EM_ANALISE,
    isSelected: false,
    siteStatus: SiteStatus.BUSCA
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Se for número, converte e mantém. Se for string, converte para uppercase.
    const finalValue = type === 'number' ? Number(value) : value.toUpperCase();
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSiteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const siteId = e.target.value;
      const selectedSite = sites.find(s => s.sharingId === siteId);
      if (selectedSite) {
          setFormData({
              ...formData,
              siteId: selectedSite.sharingId,
              sharingId: selectedSite.sharingId,
              operatorId: selectedSite.operatorId,
              sharingName: selectedSite.sharingName,
              operatorName: selectedSite.operatorName,
              projectId: selectedSite.projectId,
              siteStatus: selectedSite.status
          });
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCandidate = {
        ...formData,
        id: `CAND-${Date.now()}`
    } as Candidate;
    
    addCandidate(newCandidate);
    alert('CANDIDATO CADASTRADO COM SUCESSO!');
    navigate('/projects');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
       <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase">Cadastro de Candidato</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-3 border-b pb-2 mb-2">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Vínculo</h3>
            </div>
            
             <div className="space-y-2 md:col-span-3">
                <label className="text-sm font-bold text-slate-700 uppercase">Vincular ao Site (ID Sharing)</label>
                <select required onChange={handleSiteChange} className="w-full p-2 border rounded-lg uppercase">
                    <option value="">SELECIONE UM SITE...</option>
                    {sites.map(s => <option key={s.sharingId} value={s.sharingId}>{s.sharingName} ({s.sharingId})</option>)}
                </select>
                <p className="text-xs text-slate-400">Selecione o site da tabela SITES para vincular este candidato.</p>
            </div>

            <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Dados do Imóvel</h3>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Candidato</label>
                <input required name="name" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" placeholder="EX: PRÉDIO AZUL" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Tipo de Site</label>
                <select required name="siteType" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    {Object.values(SiteType).map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Nome Proprietário</label>
                <input name="landlordName" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Valor Aluguel (R$)</label>
                <input type="number" name="leaseAmount" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Status Candidato</label>
                <select name="status" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    {Object.values(CandidateStatus).map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
                </select>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Ordem de Busca</label>
                <input type="number" name="searchOrder" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Endereço e Coordenadas</h3>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Latitude</label>
                <input required type="number" step="any" name="latitude" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Longitude</label>
                <input required type="number" step="any" name="longitude" onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">CEP</label>
                <input name="zipCode" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Logradouro</label>
                <input name="street" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Número</label>
                <input name="number" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Bairro</label>
                <input name="neighborhood" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase" />
            </div>

             <div className="md:col-span-3 border-b pb-2 mb-2 mt-4">
                <h3 className="text-lg font-bold text-slate-700 uppercase">Responsáveis</h3>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Coord. Cliente</label>
                <select name="clientCoordinatorId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    <option value="">SELECIONE...</option>
                    {collaborators.filter(c => c.type === 'CLIENTE').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase">Coord. Fornecedor</label>
                 <select name="supplierCoordinatorId" onChange={handleChange} className="w-full p-2 border rounded-lg uppercase">
                    <option value="">SELECIONE...</option>
                    {collaborators.filter(c => c.type === 'FORNECEDOR').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className="md:col-span-3 flex justify-end pt-4">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 uppercase font-semibold">
                    <Save className="w-4 h-4" /> Salvar Candidato
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;