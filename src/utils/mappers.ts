import { User } from "firebase/auth";
import { UserDTO } from "../dtos/UserDTOs";
import { DreamDTO } from "../dtos/DreamDTOs";

export const mapUserToDTO = (user: User): UserDTO => ({
    uid: user.uid,
    nome: user.displayName || "",
    email: user.email || "",
    dataNascimento: null,
    emailVerificado: user.emailVerified,
});

export const mapDreamToDTO = (
    id: string,
    titulo: string,
    descricao: string,
    dataSonho: string,
    usuarioId: string
): DreamDTO => ({
    id,
    titulo,
    descricao,
    dataSonho,
    usuarioId,
});
