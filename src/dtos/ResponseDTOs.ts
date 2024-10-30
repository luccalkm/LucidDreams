export interface ResponseDTO<T> {
    success: boolean;
    data: T | null;
    message: string;
}
