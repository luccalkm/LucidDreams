export interface DreamRegisterDTO {
    title: string;
    description: string;
    date: string;
    image?: string;
}

export interface DreamDTO {
    id: string;
    title: string;
    description: string;
    date: string;
    userId: string;
}
