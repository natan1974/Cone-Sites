import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { SiteStatus } from '../types';
import { Search, Filter, MapPin, ChevronRight, Signal } from 'lucide-react';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const { sites } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredSites = sites.filter(site => {
    const matchesSearch = 
      site.sharingName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      site.sharingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = filterStatus === 'all' || site.status === filterStatus;
    
    return matchesSearch && matchesStage;
  });

  const getStatusColor = (status: SiteStatus) => {
    switch(status) {
      case SiteStatus.BUSCA: return 'bg-gray-100 text-gray-700';
      case SiteStatus.NEGOCIACAO: return 'bg-amber-100 text-amber-700';
      case SiteStatus.JURIDICO: return 'bg-purple-100 text-purple-700';
      case SiteStatus.LICENCIAMENTO: return 'bg-blue-100 text-blue-700';
      case SiteStatus.PRONTO: return 'bg-emerald-100 text-emerald-700';
      case SiteStatus.CANCELADO: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestão de Sites</h2>
          <p className="text-slate-500 mt-1">Lista de Sites e Status de Aquisição</p>
        </div>
        
        <button 
          onClick={() => navigate('/register/sites')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Signal className="w-4 h-4" />
          + Novo Site
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por nome do site, ID Sharing ou cidade..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-slate-400 w-5 h-5" />
          <select 
            className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-700 w-full md:w-48"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos os Status</option>
            {Object.values(SiteStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sites List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sharing / ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Localização</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progresso</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Coord. Cliente</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSites.map((site) => (
                <tr 
                  key={site.sharingId} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/projects/${site.sharingId}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{site.sharingName}</span>
                      <span className="text-sm text-slate-500 font-mono">{site.sharingId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{site.city}, {site.state}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(site.status).replace('text', 'border-transparent')}`}>
                      {site.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[100px]">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>{site.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${site.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {site.clientCoordinatorId}
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </td>
                </tr>
              ))}
              
              {filteredSites.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Nenhum site encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;