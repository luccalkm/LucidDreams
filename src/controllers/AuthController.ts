import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    User,
    UserCredential,
} from "firebase/auth";
import { auth, googleProvider, database } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";

export const loginUser = async (email: string, password: string): Promise<User | undefined> => {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
};

export const registerUser = async (
    email: string,
    password: string,
    name: string,
    dateOfBirth: string
): Promise<User | undefined> => {
    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user: User = userCredential.user;
        const uid: string = user.uid;
        
        await saveUserData(uid, name, email, dateOfBirth);

        await sendEmailVerification(user);
        console.log("E-mail de verificação enviado para:", email);

        return user;
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
    }
};

export const signInWithGoogle = async (): Promise<User | undefined> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user: User = result.user;

        if (!user.emailVerified) {
            await sendEmailVerification(user);
        }

        await saveUserData(user.uid, user.displayName || "", user.email || "", null);

        return user;
    } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
    }
};

export const saveUserData = async (
    uid: string,
    name: string,
    email: string,
    dateOfBirth: string | null
): Promise<void> => {
    try {
        await set(ref(database, `users/${uid}`), {
            nome: name,
            email: email,
            dateOfBirth: dateOfBirth,
        });
    } catch (error) {
        console.error("Erro ao salvar dados:", error);
    }
};
