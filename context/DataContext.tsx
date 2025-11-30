import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Client, Project, Collaborator, Site, Candidate } from '../types';
import { MOCK_CLIENTS, MOCK_PROJECTS_DATA, MOCK_COLLABORATORS, MOCK_SITES, MOCK_CANDIDATES } from '../constants';

interface DataContextType {
  clients: Client[];
  projects: Project[];
  collaborators: Collaborator[];
  sites: Site[];
  candidates: Candidate[];
  addClient: (client: Client) => void;
  addProject: (project: Project) => void;
  addCollaborator: (collaborator: Collaborator) => void;
  addSite: (site: Site) => void;
  addCandidate: (candidate: Candidate) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS_DATA);
  const [collaborators, setCollaborators] = useState<Collaborator[]>(MOCK_COLLABORATORS);
  const [sites, setSites] = useState<Site[]>(MOCK_SITES);
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);

  const addClient = (client: Client) => setClients(prev => [...prev, client]);
  const addProject = (project: Project) => setProjects(prev => [...prev, project]);
  const addCollaborator = (collaborator: Collaborator) => setCollaborators(prev => [...prev, collaborator]);
  const addSite = (site: Site) => setSites(prev => [...prev, site]);
  const addCandidate = (candidate: Candidate) => setCandidates(prev => [...prev, candidate]);

  return (
    <DataContext.Provider value={{
      clients,
      projects,
      collaborators,
      sites,
      candidates,
      addClient,
      addProject,
      addCollaborator,
      addSite,
      addCandidate
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};