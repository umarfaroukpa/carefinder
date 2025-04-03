export interface Hospital {
    id: string;
    name: string;
    location: string;
    address: string;
    specializations: string[];
    contactNumber: string;
    email?: string;
    description?: string;
}