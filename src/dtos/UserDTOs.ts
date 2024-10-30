
export interface UserRegisterDTO {
    nome: string;
    email: string;
    senha: string;
    dataNascimento: string;
}

export interface UserDTO {
    uid: string;
    nome: string;
    email: string;
    dataNascimento: string | null;
    emailVerificado: boolean;
}
