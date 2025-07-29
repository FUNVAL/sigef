
export type Country = {
    id: number;
    name: string;
    code: string;
    phone_code: string;
    flag: string;
    status?:{
        id: number;
        name: string;
    }
}

type CountryForm = Omit<Country, 'id' | 'status'> &{
    status: number;
};


type UpdateCountryForm = Omit<Country, 'status' > & {
    status: number;
}; 

type DeleteCountryForm = Omit<Country, 'phone_code' | 'code' | 'name' > & {
    name: string;
    code: string;
    phone_code: number;

};
