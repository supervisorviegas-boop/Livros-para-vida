
import { GoogleGenAI } from "@google/genai";

export const getExpertAdvice = async (topic: string, userFear: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sou uma mulher buscando evolução. No contexto de "${topic}", sinto o seguinte desafio: "${userFear}". Como mentora internacional, o que você me diria?`,
      config: {
        systemInstruction: "Você é uma mentora internacional de oratória feminina, especialista em Psicologia da Confiança e Comunicação Emocional. Seus conselhos devem ser curtos (máximo 3 parágrafos), acolhedores, empoderadores e práticos. Use uma linguagem que funcione para mulheres de diferentes culturas. Nunca use termos excessivamente técnicos.",
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI advice:", error);
    return "Minha querida, lembre-se que sua voz é única e o mundo precisa da sua perspectiva. Respire fundo, aceite sua vulnerabilidade e dê o próximo passo com coragem. Você já é vitoriosa por estar aqui.";
  }
};

export const translateContent = async (text: string, targetLang: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}, keeping the emotional and empowering tone for women: "${text}"`,
    });
    return response.text;
  } catch (error) {
    return text;
  }
};
