export interface UserRegisterDTO {
    name: string;
    email: string;
    password: string;
    dateOfBirth: string;
}

export interface UserDTO {
    uid: string;
    name: string;
    email: string;
    dateOfBirth: string | null;
    emailVerified: boolean;
}
