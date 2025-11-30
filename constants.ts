
import { 
  Client, Project, Collaborator, Site, Candidate, 
  SiteStatus, SiteType, CandidateStatus 
} from './types';

// TABELA CLIENTES
export const MOCK_CLIENTS: Client[] = [
  {
    id: 'CLI-01',
    cnpj: '00.123.456/0001-78',
    businessName: 'Telecomunicações Brasil S.A.',
    tradeName: 'TelcoBR',
    zipCode: '01000-000',
    street: 'Av. das Comunicações',
    number: '1000',
    city: 'São Paulo',
    state: 'SP',
    registrationDate: '2023-01-15',
    activity: 'Telecomunicações',
    status: 'Ativo'
  }
];

// TABELA PROJETOS
export const MOCK_PROJECTS_DATA: Project[] = [
  {
    id: 'PROJ-SP-2024',
    name: 'Expansão 5G São Paulo',
    assumptions: 'Priorizar topos de prédio comerciais. Contratos de longo prazo (20 anos).',
    notes: 'Projeto prioritário para Q3 e Q4.'
  },
  {
    id: 'PROJ-RJ-2024',
    name: 'Redensificação Rio de Janeiro',
    assumptions: 'Foco em Biosites e Street Level.',
    notes: 'Atenção às áreas de proteção ambiental.'
  }
];

// TABELA COLABORADORES (CLIENTE E FORNECEDOR)
export const MOCK_COLLABORATORS: Collaborator[] = [
  {
    id: 'COL-01',
    name: 'Ana Souza',
    clientId: 'CLI-01',
    type: 'CLIENTE',
    role: 'Gerente Regional',
    mobile: '(11) 99999-1111',
    email: 'ana.souza@telcobr.com.br'
  },
  {
    id: 'COL-02',
    name: 'Carlos Lima',
    type: 'FORNECEDOR',
    role: 'Coordenador de Site Acquisition',
    mobile: '(11) 98888-2222',
    email: 'carlos.lima@vendor.com.br'
  }
];

// TABELA SITES
export const MOCK_SITES: Site[] = [
  {
    sharingId: 'SP-001',
    operatorId: 'TIM-1020',
    sharingName: 'Jardins Expansão',
    operatorName: 'TelcoBR',
    projectId: 'PROJ-SP-2024',
    city: 'São Paulo',
    state: 'SP',
    regional: 'SP-Capital',
    nominalLatitude: -23.561684,
    nominalLongitude: -46.655981,
    requestedHeight: 30,
    targetDate: '2024-12-01',
    activationDate: '2024-01-10',
    activationOrder: 1,
    searchRadius: 100,
    size: '4m x 4m',
    projectAssumptions: 'Rooftop preferencial',
    clientCoordinatorId: 'COL-01',
    hhCoordinatorId: 'COL-02',
    clientSla: '30 dias',
    status: SiteStatus.NEGOCIACAO,
    progress: 35
  },
  {
    sharingId: 'RJ-045',
    operatorId: 'VIVO-3050',
    sharingName: 'Barra da Tijuca Sol',
    operatorName: 'TelcoBR',
    projectId: 'PROJ-RJ-2024',
    city: 'Rio de Janeiro',
    state: 'RJ',
    regional: 'RJ-Capital',
    nominalLatitude: -23.000,
    nominalLongitude: -43.350,
    requestedHeight: 40,
    targetDate: '2024-11-15',
    activationDate: '2024-02-01',
    activationOrder: 2,
    searchRadius: 200,
    size: '10m x 10m',
    projectAssumptions: 'Greenfield',
    clientCoordinatorId: 'COL-01',
    hhCoordinatorId: 'COL-02',
    clientSla: '45 dias',
    status: SiteStatus.LICENCIAMENTO,
    progress: 75
  },
  {
    sharingId: 'RS-088',
    operatorId: 'CLARO-5001',
    sharingName: 'Porto Alegre ZN',
    operatorName: 'TelcoBR',
    projectId: 'PROJ-SP-2024', // Usando SP como exemplo de vínculo
    city: 'Porto Alegre',
    state: 'RS',
    regional: 'Sul',
    nominalLatitude: -30.000,
    nominalLongitude: -51.100,
    requestedHeight: 15,
    targetDate: '2024-10-30',
    activationDate: '2024-01-20',
    activationOrder: 1,
    searchRadius: 50,
    size: '2m x 2m',
    projectAssumptions: 'Biosite',
    clientCoordinatorId: 'COL-01',
    hhCoordinatorId: 'COL-02',
    clientSla: '20 dias',
    status: SiteStatus.PRONTO,
    progress: 100
  }
];

// TABELA CANDIDATOS
export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'CAND-01',
    sharingId: 'SP-001',
    operatorId: 'TIM-1020',
    siteId: 'SP-001',
    sharingName: 'Jardins Expansão',
    operatorName: 'TelcoBR',
    name: 'Condomínio Solar',
    siteType: SiteType.ROOFTOP,
    isSelected: true,
    status: CandidateStatus.SELECIONADO,
    siteStatus: SiteStatus.NEGOCIACAO,
    projectId: 'PROJ-SP-2024',
    locality: 'Jardins',
    state: 'SP',
    latitude: -23.561684,
    longitude: -46.655981,
    zipCode: '01415-000',
    street: 'Av. Paulista',
    number: '1000',
    neighborhood: 'Bela Vista',
    complement: '',
    activationDate: '2024-01-10',
    searchOrder: 1,
    clientCoordinatorId: 'COL-01',
    supplierCoordinatorId: 'COL-02',
    landlordName: 'Síndico Roberto',
    leaseAmount: 4500
  },
  {
    id: 'CAND-02',
    sharingId: 'SP-001',
    operatorId: 'TIM-1020',
    siteId: 'SP-001',
    sharingName: 'Jardins Expansão',
    operatorName: 'TelcoBR',
    name: 'Edifício Comercial Beta',
    siteType: SiteType.ROOFTOP,
    isSelected: false,
    status: CandidateStatus.BACKUP,
    siteStatus: SiteStatus.NEGOCIACAO,
    projectId: 'PROJ-SP-2024',
    locality: 'Jardins',
    state: 'SP',
    latitude: -23.562,
    longitude: -46.656,
    zipCode: '01415-001',
    street: 'Rua Peixoto Gomide',
    number: '500',
    neighborhood: 'Jardim Paulista',
    complement: '',
    activationDate: '2024-01-10',
    searchOrder: 2,
    clientCoordinatorId: 'COL-01',
    supplierCoordinatorId: 'COL-02',
    landlordName: 'Administradora Predial',
    leaseAmount: 5200
  },
  {
    id: 'CAND-03',
    sharingId: 'RJ-045',
    operatorId: 'VIVO-3050',
    siteId: 'RJ-045',
    sharingName: 'Barra da Tijuca Sol',
    operatorName: 'TelcoBR',
    name: 'Terreno Sr. João',
    siteType: SiteType.GREENFIELD,
    isSelected: true,
    status: CandidateStatus.SELECIONADO,
    siteStatus: SiteStatus.LICENCIAMENTO,
    projectId: 'PROJ-RJ-2024',
    locality: 'Barra',
    state: 'RJ',
    latitude: -23.000,
    longitude: -43.350,
    zipCode: '22793-080',
    street: 'Av. das Américas',
    number: '5000',
    neighborhood: 'Barra da Tijuca',
    complement: 'Lote 2',
    activationDate: '2024-02-01',
    searchOrder: 1,
    clientCoordinatorId: 'COL-01',
    supplierCoordinatorId: 'COL-02',
    landlordName: 'João da Silva',
    leaseAmount: 3000
  }
];
