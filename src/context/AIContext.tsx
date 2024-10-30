import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AIContextType {
    getTextResponse: (prompt: string) => Promise<string>;
    generateImageBase64: (prompt: string) => Promise<string>;
    chatResponse: string | null;
    loading: boolean;
    error: string | null;
    collectDreamDataPrompt: (title: string, description: string) => string;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
    const context = useContext(AIContext);
    if (!context) {
        throw new Error("useAI must be used within an AIProvider");
    }
    return context;
};

export const AIProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [chatResponse, setChatResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const huggingFaceApiKey = "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"; //chave temporária 1dia gratuita

    const collectDreamDataPrompt = (title: string, description: string): string => {
        return `
            A seguir está uma descrição de um sonho. Analise o sonho detalhadamente e forneça os seguintes elementos:
            1) Continuação ou desfecho,
            2) Significados simbólicos com base em interpretações populares,
            3) Imagens ou símbolos comuns que aparecem frequentemente em sonhos semelhantes,
            4) O contexto emocional ou psicológico do sonho,
            5) Eventos da vida real que podem estar relacionados.
            Título: ${title}
            Descrição: ${description}
        `;
    };

    const generateImageBase64 = async (prompt: string): Promise<string> => {
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4',
                {
                    inputs: prompt,
                    parameters: {
                        num_inference_steps: 90,
                        guidance_scale: 7.5
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${huggingFaceApiKey}`,
                        'Content-Type': 'application/json',
                    },
                    responseType: 'blob'
                }
            );

            const base64Image = await toBase64(response.data);
            return base64Image;
        } catch (err) {
            console.error('Erro ao gerar a imagem:', err);
            throw new Error('Erro ao gerar a imagem');
        }
    };

    const getTextResponse = async (prompt: string): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                `https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B`,
                {
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: 150,
                        temperature: 0.9,
                        top_p: 0.85
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${huggingFaceApiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const chatData = response.data.generated_text || response.data[0].generated_text;
            setChatResponse(chatData);
            setLoading(false);
            return chatData;
        } catch (err) {
            setError("Error fetching text response");
            setLoading(false);
            throw err;
        }
    };

    const toBase64 = (file: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <AIContext.Provider
            value={{
                getTextResponse,
                chatResponse,
                loading,
                error,
                collectDreamDataPrompt,
                generateImageBase64
            }}
        >
            {children}
        </AIContext.Provider>
    );
};
