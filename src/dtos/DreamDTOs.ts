
export interface DreamRegisterDTO {
    titulo: string;
    descricao: string;
    dataSonho: string; // Data do sonho, no formato 'YYYY-MM-DD'
}

export interface DreamDTO {
    id: string;
    titulo: string;
    descricao: string;
    dataSonho: string;
    usuarioId: string;
}
