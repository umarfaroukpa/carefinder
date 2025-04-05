export interface Hospital {
    id: string; // From API mapping
    name: string;
    address: string;
    phone?: string; // From schema
    contactNumber?: string; // From API
    email?: string[]; // From schema
    city?: string; // From schema
    region?: string; // From schema
    location?: string; // From API
    description?: string;
    specializations?: string[];
    coordinates?: number[]; // From schema
    functionalStatus?: string; // From schema
}