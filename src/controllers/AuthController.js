import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider, database } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";
import { responseObject } from "../utils/responseUtils";

// Função para fazer login de um usuário
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return responseObject(true, userCredential.user, "");
    } catch (error) {
        return responseObject(false, null, "Erro ao efetuar login.");
    }
};

// Função para registrar um novo usuário
export const registerUser = async (email, senha, nome, dataNascimento) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
        );
        const user = userCredential.user;
        const uid = user.uid;

        await saveUserData(uid, nome, email, dataNascimento);

        // Enviar e-mail de verificação
        await sendEmailVerification(user);
        console.log("E-mail de verificação enviado para:", email);

        return user;
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
    }
};

// Função para login com o Google
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Verifique se o usuário já tem um e-mail verificado
        if (!user.emailVerified) {
            // Enviar e-mail de verificação
            await sendEmailVerification(user);
        }

        // Salve os dados do usuário, se necessário
        await saveUserData(user.uid, user.displayName, user.email, null); // Pode passar null para dataNascimento se não for fornecido

        return user;
    } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
    }
};

// Função para salvar dados do usuário
export const saveUserData = async (uid, nome, email, dataNascimento) => {
    try {
        await set(ref(database, `usuarios/${uid}`), {
            nome: nome,
            email: email,
            dataNascimento: dataNascimento, // Adicione a data de nascimento, se disponível
        });
    } catch (error) {
        console.error("Erro ao salvar dados:", error);
    }
};
