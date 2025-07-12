export interface CommonResponse<T> {
    content: T;
    response: {
        code: number;
        text: string;
        message?: string;
        description?: string;
    }
} 