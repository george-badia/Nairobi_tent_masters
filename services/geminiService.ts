
import { GoogleGenAI, Type } from "@google/genai";
import { CustomOrderResponse } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = "gemini-2.5-flash";

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.STRING,
            description: "A brief, exciting summary of the proposed custom tent design."
        },
        materials: {
            type: Type.ARRAY,
            description: "A list of recommended materials for the tent's fabric, poles, and other components.",
            items: {
                type: Type.STRING
            }
        },
        estimatedPriceKES: {
            type: Type.NUMBER,
            description: "A rough cost estimate for the tent in Kenyan Shillings (KES)."
        }
    },
    required: ["summary", "materials", "estimatedPriceKES"]
};

export const generateCustomTentProposal = async (prompt: string): Promise<CustomOrderResponse> => {
  try {
    const fullPrompt = `You are an expert tent designer for 'Nairobi Tent Masters'. A customer has submitted a request for a custom tent. Based on their requirements below, provide a summary of the proposed tent, a list of recommended materials, and a price estimate in Kenyan Shillings (KES). Format your response as a JSON object. Customer requirements: "${prompt}"`;

    const response = await ai.models.generateContent({
        model: model,
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    // Validate the parsed response
    if (
        typeof parsedResponse.summary === 'string' &&
        Array.isArray(parsedResponse.materials) &&
        typeof parsedResponse.estimatedPriceKES === 'number'
    ) {
        return parsedResponse;
    } else {
        throw new Error("Invalid response structure from AI model.");
    }

  } catch (error) {
    console.error("Error generating tent proposal:", error);
    throw new Error("Failed to generate a proposal. The AI might be busy, please try again later.");
  }
};
