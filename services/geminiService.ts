import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MetricResult } from '../types';

// Safely access process.env to prevent ReferenceError: process is not defined
// This is critical for browser environments where process is not polyfilled by default
const apiKey = (typeof process !== 'undefined' && process.env) ? (process.env.API_KEY || '') : '';

// Initialize logic lazily or handle missing key gracefully in UI
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const analyzeAssets = async (assetDescription: string): Promise<MetricResult> => {
  if (!ai) {
    throw new Error("Clé API Gemini manquante. Veuillez configurer process.env.API_KEY.");
  }

  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      monetaryValue: { type: Type.NUMBER, description: "Estimated resale or raw material value in Euros." },
      currency: { type: Type.STRING, description: "Currency code, usually EUR." },
      co2SavedKg: { type: Type.NUMBER, description: "Estimated CO2 emissions avoided in Kg by reusing/recycling." },
      jobsSupported: { type: Type.NUMBER, description: "Estimated number of hours or jobs supported (social impact)." },
      reusePotentialPercent: { type: Type.NUMBER, description: "A percentage (0-100) indicating the likelihood of reuse." },
      reasoning: { type: Type.STRING, description: "A short explanation of how these numbers were calculated based on the input." }
    },
    required: ["monetaryValue", "currency", "co2SavedKg", "jobsSupported", "reusePotentialPercent", "reasoning"],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tu es le Moteur de Valorisation Universel de Prisme Circulaire. 
      Analyse la liste d'actifs suivante (déchets industriels, stocks dormants, équipements) et estime leur valeur selon 4 piliers : Financier, Écologique, Social, et Potentiel de réemploi.
      Sois réaliste mais optimiste sur le potentiel de l'économie circulaire.
      
      Actifs à analyser : "${assetDescription}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3, // Low temperature for more consistent/analytical results
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Réponse vide de Gemini.");
    }

    const result = JSON.parse(text) as MetricResult;
    return result;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};