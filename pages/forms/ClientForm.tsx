import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { Client } from '../../types';
import { ArrowLeft, Save, Search, Loader2 } from 'lucide-react';

const ClientForm: React.FC = () => {
  const navigate = useNavigate();
  const { addClient } = useData();

  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [formData, setFormData] = useState<Partial<Client>>({
    status: 'Ativo',
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCnpjSearch = async () => {
    const cnpjInput = formData.cnpj;
    if (!cnpjInput) return;

    // Remove caracteres não numéricos
    const cleanCnpj = cnpjInput.replace(/\D/g, '');

    if (cleanCnpj.length !== 14) {
      alert('Por favor, insira um CNPJ válido com 14 dígitos.');
      return;
    }

    setIsLoadingCnpj(true);

    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
      
      if (!response.ok) {
        throw new Error('CNPJ não encontrado');
      }

      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        businessName: data.razao_social,
        tradeName: data.nome_fantasia || data.razao_social, // Usa razão social se não tiver fantasia
        activity: data.cnae_fiscal_descricao,
        zipCode: data.cep,
        street: data.logradouro,
        number: data.numero,
        city: data.municipio,
        state: data.uf,
        status: data.descricao_situacao_cadastral === 'ATIVA' ? 'Ativo' : 'Inativo'
      }));

    } catch (error) {
      console.error(error);
      alert('Erro ao buscar dados do CNPJ. Verifique o número e tente novamente.');
    } finally {
      setIsLoadingCnpj(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient = {
      ...formData,
      id: `CLI-${Date.now()}` // Geração simples de ID
    } as Client;
    
    addClient(newClient);
    alert('Cliente cadastrado com sucesso!');
    navigate('/projects'); // Redireciona ou limpa o form
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
      </button>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Cadastro de Cliente</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">CNPJ</label>
            <div className="relative">
              <input 
                required 
                name="cnpj" 
                value={formData.cnpj || ''}
                onChange={handleChange} 
                className="w-full p-2 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="00.000.000/0000-00" 
              />
              <button 
                type="button"
                onClick={handleCnpjSearch}
                disabled={isLoadingCnpj}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 p-1"
                title="Buscar dados do CNPJ"
              >
                {isLoadingCnpj ? <Loader2 className="w-5 h-5 animate-spin text-blue-600" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-slate-400">Clique na lupa para preencher automaticamente.</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Razão Social</label>
            <input required name="businessName" value={formData.businessName || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-slate-50" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Nome Fantasia</label>
            <input required name="tradeName" value={formData.tradeName || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Atividade</label>
            <input required name="activity" value={formData.activity || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
          </div>
          
          <div className="col-span-2 grid grid-cols-3 gap-4">
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">CEP</label>
                <input required name="zipCode" value={formData.zipCode || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
            <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium text-slate-700">Logradouro</label>
                <input required name="street" value={formData.street || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 col-span-2">
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Número</label>
                <input required name="number" value={formData.number || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Cidade</label>
                <input required name="city" value={formData.city || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">UF</label>
                <input required name="state" value={formData.state || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" maxLength={2} />
            </div>
          </div>

           <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Situação</label>
                <select name="status" value={formData.status || 'Ativo'} onChange={handleChange} className="w-full p-2 border rounded-lg">
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                </select>
            </div>

          <div className="col-span-2 pt-4 flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;