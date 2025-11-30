
import { GoogleGenAI } from "@google/genai";
import { Site, Candidate } from '../types';

const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const generateLeaseClause = async (
  site: Site,
  candidate: Candidate,
  clauseType: string
): Promise<string> => {
  try {
    const prompt = `
      Você é um especialista jurídico em contratos de telecomunicações no Brasil.
      
      Contexto do Site/Projeto:
      - ID Sharing: ${site.sharingId}
      - Cidade: ${site.city}
      - Regional: ${site.regional}
      
      Dados do Candidato (Locador):
      - Nome do Candidato: ${candidate.name}
      - Proprietário: ${candidate.landlordName}
      - Valor Proposto: R$ ${candidate.leaseAmount}
      - Endereço: ${candidate.street}, ${candidate.number} - ${candidate.neighborhood}

      Tarefa:
      Redija uma cláusula contratual de "${clauseType}" para este contrato de locação.
      A cláusula deve ser formal, proteger os interesses da operadora (locatária), mas estar em conformidade com a Lei do Inquilinato brasileira.
      Use formatação Markdown para o texto jurídico.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'Não foi possível gerar a cláusula.';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao comunicar com a IA. Verifique sua chave de API.";
  }
};

export const analyzePermittingRisks = async (site: Site): Promise<string> => {
  try {
    const prompt = `
      Você é um consultor especialista em licenciamento urbanístico para torres de celular (EBR - Estação Rádio Base).
      
      Analise o seguinte cenário e liste potenciais riscos e sugestões para o licenciamento:
      
      Site Sharing ID: ${site.sharingName} (${site.sharingId})
      Cidade: ${site.city}, ${site.state}
      Altura Solicitada: ${site.requestedHeight}m
      Estágio Atual: ${site.status}
      Premissas: "${site.projectAssumptions}"
      
      Considere as leis gerais de antenas no Brasil e as dificuldades típicas em grandes centros urbanos.
      Forneça a resposta em formato de lista (bullet points) HTML ou Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || 'Análise indisponível.';
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao analisar riscos.";
  }
};

export const chatWithLegalAssistant = async (history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "Você é um assistente virtual especializado em Telecomunicações, focado em Aquisição de Sites (SA) e Licenciamento. Responda de forma concisa e técnica sobre leis municipais, estaduais e federais (Lei das Antenas) do Brasil."
            },
            history: history.map(h => ({
                role: h.role,
                parts: [{ text: h.text }]
            }))
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Chat Error:", error);
        return "Desculpe, serviço indisponível no momento.";
    }
}
