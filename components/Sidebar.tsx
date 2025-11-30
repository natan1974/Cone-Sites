import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, RadioTower, FileText, Settings, Signal, Database, PlusCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { path: '/', label: 'TelecomTracker', icon: LayoutDashboard }, // Alterado para TelecomTracker como dashboard principal
    { path: '/projects', label: 'Gestão de Sites', icon: RadioTower },
    { path: '/reports', label: 'Relatórios', icon: FileText },
  ];

  const registerItems = [
    { path: '/register/clients', label: 'Clientes' },
    { path: '/register/projects', label: 'Projetos' },
    { path: '/register/collaborators', label: 'Colaboradores' },
    { path: '/register/sites', label: 'Sites' },
    { path: '/register/candidates', label: 'Candidatos' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col shadow-xl z-10 overflow-y-auto">
      <div className="p-6 flex items-center gap-3 border-b border-slate-800">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Signal className="w-6 h-6 text-white" />
        </div>
        <div>
            <h1 className="text-xl font-bold tracking-tight">Cone Sites</h1>
            <p className="text-xs text-slate-400">Sistema Integrado</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-6">
        <div>
            <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Principal</p>
            <div className="space-y-1">
                {mainNavItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                </Link>
                ))}
            </div>
        </div>

        <div>
             <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Database className="w-3 h-3" /> Cadastros (Forms)
             </p>
             <div className="space-y-1">
                {registerItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 text-sm ${
                        isActive(item.path)
                            ? 'bg-slate-800 text-white border-l-2 border-blue-500'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <PlusCircle className="w-4 h-4 opacity-70" />
                        <span>{item.label}</span>
                    </Link>
                ))}
             </div>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg w-full transition-colors">
          <Settings className="w-5 h-5" />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;