import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

// Definição dos tipos
interface OpenAIContextType {
    getChatGPTResponse: (prompt: string) => Promise<string>;
    getDALLEImage: (prompt: string) => Promise<string>;
    chatResponse: string | null;
    imageBase64: string | null;
    loading: boolean;
    error: string | null;
}

// Inicialização do contexto
const OpenAIContext = createContext<OpenAIContextType | undefined>(undefined);

// Função para acessar o contexto
export const useOpenAI = () => {
    const context = useContext(OpenAIContext);
    if (!context) {
        throw new Error("useOpenAI must be used within an OpenAIProvider");
    }
    return context;
};

// Provedor do contexto
export const OpenAIProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [chatResponse, setChatResponse] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = "SUA_API_KEY"; // Substitua pela sua chave de API

    // Função para buscar resposta do ChatGPT
    const getChatGPTResponse = async (prompt: string): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-4", // Ou "gpt-3.5-turbo"
                    messages: [{ role: "user", content: prompt }],
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const chatData = response.data.choices[0].message.content;
            setChatResponse(chatData);
            setLoading(false);
            return chatData;
        } catch (err) {
            setError("Erro ao buscar resposta do ChatGPT");
            setLoading(false);
            throw err;
        }
    };

    // Função para gerar imagem do DALL-E
    const getDALLEImage = async (prompt: string): Promise<string> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/images/generations",
                {
                    prompt: prompt,
                    n: 1,
                    size: "1024x1024",
                },
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const imageUrl = response.data.data[0].url;

            // Baixar a imagem e convertê-la para base64
            const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });
            const imageBase64 = Buffer.from(imageResponse.data, "binary").toString("base64");
            setImageBase64(imageBase64);
            setLoading(false);
            return imageBase64;
        } catch (err) {
            setError("Erro ao gerar imagem do DALL-E");
            setLoading(false);
            throw err;
        }
    };

    return (
        <OpenAIContext.Provider
            value={{
                getChatGPTResponse,
                getDALLEImage,
                chatResponse,
                imageBase64,
                loading,
                error,
            }}
        >
            {children}
        </OpenAIContext.Provider>
    );
};
