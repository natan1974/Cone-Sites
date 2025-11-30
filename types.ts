
// Enums para padronização
export enum SiteStatus {
  BUSCA = 'Em Busca',
  NEGOCIACAO = 'Negociação',
  JURIDICO = 'Análise Jurídica',
  LICENCIAMENTO = 'Licenciamento',
  PRONTO = 'Pronto para Obra',
  CANCELADO = 'Cancelado'
}

export enum CandidateStatus {
  SELECIONADO = 'Selecionado',
  BACKUP = 'Backup',
  REJEITADO = 'Rejeitado',
  EM_ANALISE = 'Em Análise'
}

export enum SiteType {
  GREENFIELD = 'Greenfield',
  ROOFTOP = 'Rooftop',
  STREET_LEVEL = 'Street Level (Biosite)',
  INDOOR = 'Indoor'
}

// TABELA CLIENTES
export interface Client {
  id: string; // ID CLIENTE
  cnpj: string; // CNPJ CLIENTE
  businessName: string; // RAZÃO SOCIAL
  tradeName: string; // NOME FANTASIA
  zipCode: string; // CEP
  street: string; // LOGRADOURO
  number: string; // NUM
  city: string; // CIDADE
  state: string; // UF
  registrationDate: string; // DATA DE CADASTRO
  activity: string; // ATIVIDADE
  status: 'Ativo' | 'Inativo'; // SITUAÇÃO
}

// TABELA PROJETOS
export interface Project {
  id: string; // ID PROJETO
  name: string; // NOME DO PROJETO
  assumptions: string; // PREMISSAS DO PROJETO
  notes: string; // OBSERVAÇÕES
}

// TABELA COLABORADOR (Unificada para Cliente e Fornecedor com campo de tipo)
export interface Collaborator {
  id: string; // ID
  name: string; // NOME
  clientId?: string; // CLIENTE (FK) - Opcional pois pode ser do fornecedor
  type: 'CLIENTE' | 'FORNECEDOR'; // Distinção entre as tabelas
  role: string; // FUNÇÃO
  mobile: string; // CELULAR
  email: string; // EMAIL
}

// TABELA SITES
export interface Site {
  sharingId: string; // ID SHARING
  operatorId: string; // ID OPERADORA
  sharingName: string; // SHARING (Nome)
  operatorName: string; // OPERADORA (Nome)
  projectId: string; // PROJETO (FK)
  city: string; // CIDADE
  state: string; // UF
  regional: string; // REGIONAL
  nominalLatitude: number; // LATITUDE PN
  nominalLongitude: number; // LONGITUDE PN
  requestedHeight: number; // ALTURA SOLICITADA
  targetDate: string; // TARGET
  activationDate: string; // DATA ACIONAMENTO
  activationOrder: number; // ORDEM DO ACIONAMENTO
  searchRadius: number; // ÁREA DE BUSCA (em metros)
  size: string; // TAMANHO (ex: 10x10)
  projectAssumptions: string; // PREMISSAS DO PROJETO (Cópia ou específico do site)
  clientCoordinatorId: string; // COORD. CLIENTE (FK)
  hhCoordinatorId: string; // COORD. HH (FK)
  clientSla: string; // SLA CLIENTE
  
  // Campos auxiliares para UI
  status: SiteStatus; 
  progress: number; // 0-100
}

// TABELA CANDIDATOS
export interface Candidate {
  id: string; // ID Interno
  sharingId: string; // ID SHARING (Referência ao Site)
  operatorId: string; // ID OPERADORA (Referência ao Site)
  siteId: string; // FK para conectar diretamente ao objeto Site
  
  sharingName: string; // SHARING
  operatorName: string; // OPERADORA
  name: string; // CANDIDATO (Nome do local/prédio)
  siteType: SiteType; // TIPO DE SITE
  isSelected: boolean; // SELECIONADO
  status: CandidateStatus; // STATUS DO CANDIDATO
  siteStatus: SiteStatus; // STATUS SITES (Do site pai)
  projectId: string; // PROJETO (FK)
  
  locality: string; // LOCALIDADE
  state: string; // UF
  latitude: number; // LATITUDE(decimal)
  longitude: number; // LONGITUDE(decimal)
  
  zipCode: string; // CEP
  street: string; // LOGRADOURO
  number: string; // NUM
  neighborhood: string; // BAIRRO
  complement: string; // COMPLEMENTO
  
  activationDate: string; // ACIONAMENTO
  searchOrder: number; // ORDEM DA BUSCA
  
  clientCoordinatorId: string; // COORD. CLIENTE (FK)
  supplierCoordinatorId: string; // COORD. FORNECEDOR (FK)
  
  // Campos extras para funcionamento do sistema
  landlordName: string;
  leaseAmount: number;
}
