import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { useData } from '../context/DataContext';
import { SiteStatus, SiteType } from '../types';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { sites, candidates } = useData();

  // Calculate Metrics
  const totalSites = sites.length;
  const inLicensing = sites.filter(s => s.status === SiteStatus.LICENCIAMENTO).length;
  const completed = sites.filter(s => s.status === SiteStatus.PRONTO).length;
  const inNegotiation = sites.filter(s => s.status === SiteStatus.NEGOCIACAO).length;

  // Data for Bar Chart (By Status)
  const statusData = Object.values(SiteStatus).map(status => ({
    name: status.split(' ')[0], // Short name
    fullName: status,
    count: sites.filter(s => s.status === status).length
  }));

  // Data for Pie Chart (By Candidate Site Type - using selected candidates)
  const selectedCandidates = candidates.filter(c => c.isSelected);
  const typeData = Object.values(SiteType).map(type => ({
    name: type.split(' ')[0],
    value: selectedCandidates.filter(c => c.siteType === type).length
  })).filter(d => d.value > 0);

  // Fallback
  if (typeData.length === 0) {
      typeData.push({ name: 'N/A', value: 1 });
  }

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">TelecomTracker</h2>
        <p className="text-slate-500 mt-1">Visão Geral do Sistema Cone Sites</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Total Sites</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalSites}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Em Negociação</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{inNegotiation}</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-full">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Licenciamento</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{inLicensing}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-full">
            <AlertCircle className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-sm font-medium text-slate-500">Prontos p/ Obra</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{completed}</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-full">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Sites por Status</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f1f5f9'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Tipologia (Candidatos Selecionados)</h3>
          <div className="h-80 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {typeData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;