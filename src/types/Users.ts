export interface User {
    _id?: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: Date;
}