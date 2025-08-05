import { type Country } from "./common";

export type Stake = {
    id: number;
    name: string;
    country_id: number;
    user_id?: number;
    status: 'active' | 'inactive' | 'deleted';
    country?: Country & { code: string };
    user?: {
        id: number;
        firstname: string;
        lastname: string;
    };
};
