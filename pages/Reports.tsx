import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { FileText, Download, Database, User, MapPin, Building, Users } from 'lucide-react';

const Reports: React.FC = () => {
  const { clients, projects, sites, candidates, collaborators } = useData();
  const [activeTab, setActiveTab] = useState<'sites' | 'candidates' | 'clients' | 'projects' | 'collaborators'>('sites');

  const tabs = [
    { id: 'sites', label: 'Relatório de Sites', icon: MapPin },
    { id: 'candidates', label: 'Relatório de Candidatos', icon: Building },
    { id: 'clients', label: 'Relatório de Clientes', icon: User },
    { id: 'projects', label: 'Relatório de Projetos', icon: Database },
    { id: 'collaborators', label: 'Relatório de Colaboradores', icon: Users },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Relatórios Gerenciais</h2>
          <p className="text-slate-500 mt-1">Visão completa da base de dados do Cone Sites</p>
        </div>
        <button 
            onClick={() => window.print()}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors print:hidden"
        >
            <Download className="w-4 h-4" /> Exportar / Imprimir
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto pb-4 gap-2 mb-4 border-b border-slate-200 print:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
        
        {/* Tabela de SITES */}
        {activeTab === 'sites' && (
          <div className="overflow-x-auto">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-bold text-slate-700 uppercase">Base de Sites ({sites.length})</h3>
             </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3">ID Sharing</th>
                  <th className="px-4 py-3">Nome do Site</th>
                  <th className="px-4 py-3">Cidade/UF</th>
                  <th className="px-4 py-3">Projeto</th>
                  <th className="px-4 py-3">Coord. Cliente</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Data Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sites.map((site) => (
                  <tr key={site.sharingId} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-medium">{site.sharingId}</td>
                    <td className="px-4 py-3">{site.sharingName}</td>
                    <td className="px-4 py-3">{site.city}/{site.state}</td>
                    <td className="px-4 py-3">{site.projectId}</td>
                    <td className="px-4 py-3">{site.clientCoordinatorId}</td>
                    <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            {site.status}
                        </span>
                    </td>
                    <td className="px-4 py-3">{site.targetDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabela de CANDIDATOS */}
        {activeTab === 'candidates' && (
          <div className="overflow-x-auto">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-bold text-slate-700 uppercase">Base de Candidatos ({candidates.length})</h3>
             </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3">ID Candidato</th>
                  <th className="px-4 py-3">Candidato</th>
                  <th className="px-4 py-3">Site Vinculado</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Endereço</th>
                  <th className="px-4 py-3">Proprietário</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Selecionado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {candidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{cand.id}</td>
                    <td className="px-4 py-3 font-medium">{cand.name}</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">{cand.sharingName} ({cand.sharingId})</td>
                    <td className="px-4 py-3">{cand.siteType}</td>
                    <td className="px-4 py-3 truncate max-w-xs" title={`${cand.street}, ${cand.number} - ${cand.neighborhood}`}>
                        {cand.street}, {cand.number}
                    </td>
                    <td className="px-4 py-3">{cand.landlordName}</td>
                    <td className="px-4 py-3">{cand.status}</td>
                    <td className="px-4 py-3">
                        {cand.isSelected ? (
                            <span className="text-green-600 font-bold text-xs">SIM</span>
                        ) : (
                            <span className="text-slate-400 text-xs">NÃO</span>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabela de CLIENTES */}
        {activeTab === 'clients' && (
          <div className="overflow-x-auto">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-bold text-slate-700 uppercase">Base de Clientes ({clients.length})</h3>
             </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">CNPJ</th>
                  <th className="px-4 py-3">Razão Social</th>
                  <th className="px-4 py-3">Nome Fantasia</th>
                  <th className="px-4 py-3">Cidade/UF</th>
                  <th className="px-4 py-3">Situação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs">{client.id}</td>
                    <td className="px-4 py-3">{client.cnpj}</td>
                    <td className="px-4 py-3 font-medium">{client.businessName}</td>
                    <td className="px-4 py-3">{client.tradeName}</td>
                    <td className="px-4 py-3">{client.city}/{client.state}</td>
                    <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${client.status === 'Ativo' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                            {client.status.toUpperCase()}
                        </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tabela de PROJETOS */}
        {activeTab === 'projects' && (
          <div className="overflow-x-auto">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-bold text-slate-700 uppercase">Base de Projetos ({projects.length})</h3>
             </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3 w-32">ID Projeto</th>
                  <th className="px-4 py-3 w-64">Nome do Projeto</th>
                  <th className="px-4 py-3">Premissas</th>
                  <th className="px-4 py-3">Observações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-medium">{proj.id}</td>
                    <td className="px-4 py-3 font-bold text-blue-700">{proj.name}</td>
                    <td className="px-4 py-3 text-slate-600 italic truncate max-w-sm" title={proj.assumptions}>{proj.assumptions}</td>
                    <td className="px-4 py-3 text-slate-500 truncate max-w-sm" title={proj.notes}>{proj.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

         {/* Tabela de COLABORADORES */}
         {activeTab === 'collaborators' && (
          <div className="overflow-x-auto">
             <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h3 className="font-bold text-slate-700 uppercase">Base de Colaboradores ({collaborators.length})</h3>
             </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs font-bold">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Função</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Celular</th>
                  <th className="px-4 py-3">Cliente (Vínculo)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {collaborators.map((collab) => (
                  <tr key={collab.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs">{collab.id}</td>
                    <td className="px-4 py-3 font-medium">{collab.name}</td>
                    <td className="px-4 py-3">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${collab.type === 'CLIENTE' ? 'text-purple-600 bg-purple-50' : 'text-orange-600 bg-orange-50'}`}>
                            {collab.type}
                        </span>
                    </td>
                    <td className="px-4 py-3">{collab.role}</td>
                    <td className="px-4 py-3 text-slate-600">{collab.email}</td>
                    <td className="px-4 py-3 text-slate-600">{collab.mobile}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{collab.clientId || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default Reports;