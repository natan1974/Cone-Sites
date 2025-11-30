import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import Reports from './pages/Reports';
import { DataProvider } from './context/DataContext';

// Forms
import ClientForm from './pages/forms/ClientForm';
import ProjectForm from './pages/forms/ProjectForm';
import CollaboratorForm from './pages/forms/CollaboratorForm';
import SiteForm from './pages/forms/SiteForm';
import CandidateForm from './pages/forms/CandidateForm';

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <main className="flex-1 ml-64 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/reports" element={<Reports />} />
              
              {/* Formulários de Cadastro */}
              <Route path="/register/clients" element={<ClientForm />} />
              <Route path="/register/projects" element={<ProjectForm />} />
              <Route path="/register/collaborators" element={<CollaboratorForm />} />
              <Route path="/register/sites" element={<SiteForm />} />
              <Route path="/register/candidates" element={<CandidateForm />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </DataProvider>
  );
};

export default App;