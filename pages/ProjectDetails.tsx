import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { generateLeaseClause, analyzePermittingRisks } from '../services/geminiService';
import { Site, Candidate, Project, SiteStatus, Collaborator } from '../types';
import ReactMarkdown from 'react-markdown';
import { 
  ArrowLeft, MapPin, Building, FileText, ShieldAlert, Sparkles, Loader2, Calendar, Ruler
} from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const { sites, projects, candidates, collaborators } = useData();
  
  // Relational Data State
  const [site, setSite] = useState<Site | undefined>(undefined);
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [siteCandidates, setSiteCandidates] = useState<Candidate[]>([]);
  const [siteCollaborators, setSiteCollaborators] = useState<Collaborator[]>([]);

  const [activeTab, setActiveTab] = useState<'overview' | 'candidates' | 'ai-tools'>('overview');
  
  // AI States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [clauseType, setClauseType] = useState('Reajuste Anual (IGPM)');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');

  useEffect(() => {
    const foundSite = sites.find(s => s.sharingId === id);
    setSite(foundSite);

    if (foundSite) {
        // Get Parent Project
        const foundProject = projects.find(p => p.id === foundSite.projectId);
        setProject(foundProject);

        // Get Related Candidates (WHERE siteId = site.sharingId)
        const relatedCandidates = candidates.filter(c => c.siteId === foundSite.sharingId);
        setSiteCandidates(relatedCandidates);
        
        if (relatedCandidates.length > 0) {
            setSelectedCandidateId(relatedCandidates[0].id);
        }

        // Get Collaborators (Simple check against IDs)
        const relatedCollabs = collaborators.filter(
            c => c.id === foundSite.clientCoordinatorId || c.id === foundSite.hhCoordinatorId
        );
        setSiteCollaborators(relatedCollabs);
    }
  }, [id, sites, projects, candidates, collaborators]);

  if (!site) return <div className="p-8">Site não encontrado...</div>;

  const handleGenerateClause = async () => {
    const candidate = siteCandidates.find(c => c.id === selectedCandidateId);
    if (!candidate) return;

    setAiLoading(true);
    setAiOutput(null);
    const result = await generateLeaseClause(site, candidate, clauseType);
    setAiOutput(result);
    setAiLoading(false);
  };

  const handleAnalyzeRisks = async () => {
    setAiLoading(true);
    setAiOutput(null);
    const result = await analyzePermittingRisks(site);
    setAiOutput(result);
    setAiLoading(false);
  };

  const getStageBadge = (status: SiteStatus) => {
      return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium";
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate('/projects')}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{site.sharingName}</h1>
                <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">{site.sharingId}</span>
            </div>
            <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
                <MapPin className="w-4 h-4" /> {site.city}, {site.state} • Regional: {site.regional}
            </p>
        </div>
        <div className="ml-auto flex flex-col items-end">
            <span className={getStageBadge(site.status)}>{site.status}</span>
            <span className="text-xs text-slate-400 mt-1">Projeto Pai: {project?.name || site.projectId}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-3 font-medium text-sm transition-colors ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Visão Geral
            </button>
            <button 
                onClick={() => setActiveTab('candidates')}
                className={`pb-3 font-medium text-sm transition-colors ${activeTab === 'candidates' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                Candidatos ({siteCandidates.length})
            </button>
            <button 
                onClick={() => setActiveTab('ai-tools')}
                className={`pb-3 font-medium text-sm transition-colors flex items-center gap-2 ${activeTab === 'ai-tools' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Sparkles className="w-4 h-4" />
                Assistente IA
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-slate-400" />
                            Detalhes do Site
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                             <div>
                                <p className="text-slate-500">Operadora</p>
                                <p className="font-medium">{site.operatorName}</p>
                            </div>
                            <div>
                                <p className="text-slate-500">Coord. Cliente</p>
                                <p className="font-medium">{site.clientCoordinatorId}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3"/> Data Target</p>
                                <p className="font-medium">{site.targetDate}</p>
                            </div>
                            <div>
                                <p className="text-slate-500 flex items-center gap-1"><Ruler className="w-3 h-3"/> Área Busca / Altura</p>
                                <p className="font-medium">{site.searchRadius}m / {site.requestedHeight}m</p>
                            </div>
                            <div className="col-span-2 mt-2">
                                <p className="text-slate-500">Progresso Geral</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{width: `${site.progress}%`}}></div>
                                    </div>
                                    <span className="font-medium">{site.progress}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-slate-500 mb-2">Premissas do Projeto</p>
                            <div className="bg-slate-50 p-3 rounded-lg text-slate-700 text-sm italic">
                                "{project?.assumptions || site.projectAssumptions}"
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                         <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-amber-500" />
                            Colaboradores
                        </h3>
                        <ul className="space-y-3">
                            {siteCollaborators.map(collab => (
                                <li key={collab.id} className="text-sm pb-2 border-b border-slate-50 last:border-0">
                                    <p className="font-medium text-slate-900">{collab.name}</p>
                                    <p className="text-slate-500 text-xs">{collab.role} ({collab.type})</p>
                                    <p className="text-slate-400 text-xs mt-1">{collab.email}</p>
                                </li>
                            ))}
                            {siteCollaborators.length === 0 && <li className="text-slate-400 text-sm">Nenhum colaborador vinculado.</li>}
                        </ul>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'candidates' && (
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Candidato</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Endereço</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Proprietário</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tipo</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {siteCandidates.map(c => (
                            <tr key={c.id}>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-slate-900">{c.name}</p>
                                        {c.isSelected && <span className="text-xs font-bold text-green-600 flex items-center gap-1"><Sparkles className="w-3 h-3"/> Selecionado</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{c.street}, {c.number} - {c.neighborhood}</td>
                                <td className="px-6 py-4 text-sm text-slate-600">{c.landlordName}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.siteType}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        c.isSelected ? 'bg-green-100 text-green-700' : 
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {siteCandidates.length === 0 && (
                            <tr><td colSpan={5} className="p-6 text-center text-slate-500">Nenhum candidato cadastrado para este site.</td></tr>
                        )}
                    </tbody>
                </table>
             </div>
        )}

        {activeTab === 'ai-tools' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tools Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                            <h3 className="text-lg font-bold">Assistente Jurídico & Regulatório</h3>
                        </div>
                        <p className="text-indigo-100 text-sm mb-6">Use a IA para acelerar a redação de contratos e análise de riscos de licenciamento.</p>
                        
                        <div className="space-y-3">
                            <button 
                                disabled={aiLoading}
                                onClick={handleAnalyzeRisks}
                                className="w-full bg-white/20 hover:bg-white/30 text-white text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group"
                            >
                                <span>Análise de Risco (Licenciamento)</span>
                                <ShieldAlert className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                            </button>
                            
                            <hr className="border-white/20 my-2" />

                            <div className="bg-white/10 p-3 rounded-lg">
                                <label className="block text-xs font-medium text-indigo-200 mb-2">Gerar Cláusula Contratual</label>
                                <select 
                                    className="w-full bg-indigo-900/50 border border-indigo-400/30 rounded text-sm px-2 py-1.5 text-white focus:outline-none mb-2"
                                    value={selectedCandidateId}
                                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                                >
                                    {siteCandidates.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <select 
                                    className="w-full bg-indigo-900/50 border border-indigo-400/30 rounded text-sm px-2 py-1.5 text-white focus:outline-none mb-3"
                                    value={clauseType}
                                    onChange={(e) => setClauseType(e.target.value)}
                                >
                                    <option>Reajuste Anual (IGPM)</option>
                                    <option>Rescisão Antecipada</option>
                                    <option>Acesso 24/7</option>
                                    <option>Sublocação de Espaço</option>
                                </select>
                                <button 
                                    disabled={aiLoading || siteCandidates.length === 0}
                                    onClick={handleGenerateClause}
                                    className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-2 rounded font-medium text-sm transition-colors"
                                >
                                    Gerar Minuta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Output Area */}
                <div className="lg:col-span-2">
                    <div className="bg-white h-full min-h-[500px] rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col">
                        <h3 className="font-semibold text-slate-800 border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
                            <span>Resultado da IA</span>
                            {aiOutput && (
                                <button onClick={() => setAiOutput(null)} className="text-xs text-slate-400 hover:text-slate-600">Limpar</button>
                            )}
                        </h3>

                        {aiLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                                <Loader2 className="w-10 h-10 animate-spin mb-3 text-blue-500" />
                                <p className="text-sm">Processando solicitação com Gemini...</p>
                            </div>
                        ) : aiOutput ? (
                            <div className="prose prose-slate max-w-none prose-sm overflow-y-auto max-h-[600px] bg-slate-50 p-6 rounded-lg border border-slate-200">
                                <ReactMarkdown>{aiOutput}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                                <Sparkles className="w-12 h-12 mb-3 opacity-50" />
                                <p className="text-sm">Selecione uma ferramenta ao lado para começar.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;