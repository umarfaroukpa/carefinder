export interface Hospital {
    _id?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    city: string;
    region: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}