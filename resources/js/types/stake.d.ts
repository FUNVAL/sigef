export type Stake = {
    id: number;
    name: string;
    country_id: number;
    user_id?: number;
    status: 'active' | 'inactive'; // Nuevo campo añadido
    country?: {
        id: number;
        name: string;
        code: string;
    };
    user?: {
        id: number;
        firstname: string;
        lastname: string;
    };
};
