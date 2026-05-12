/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGemini(question: string, context: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Tu és um assistente educativo especializado na União Europeia. 
      Responde de forma clara, educativa e concisa em Português.
      
      Contexto: ${context}
      Pergunta do utilizador: ${question}`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "Desculpa, não consegui obter uma resposta de momento.";
  } catch (error) {
    console.error("Erro ao contactar o Gemini:", error);
    return "Ocorreu um erro ao processar a tua pergunta. Tenta novamente mais tarde.";
  }
}
