import { Stake } from '@/types/stake';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useReducer } from 'react';

interface StakeState {
    stakes: Stake[];
    loading: boolean;
    error: string | null;
}

type StakeAction =
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: Stake[] }
    | { type: 'FETCH_ERROR'; payload: string };

const initialState: StakeState = {
    stakes: [],
    loading: false,
    error: null
};

const stakeReducer = (state: StakeState, action: StakeAction): StakeState => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                stakes: action.payload,
                error: null
            };
        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

const useFilteredStakes = (country_id: number) => {
    const [state, dispatch] = useReducer(stakeReducer, initialState);
    const { token } = usePage<{ token: string }>().props;

    useEffect(() => {
        const fetchStakes = async () => {
            // Si no hay country_id, limpiar stakes
            if (!country_id) {
                dispatch({ type: 'FETCH_SUCCESS', payload: [] });
                return;
            }

            dispatch({ type: 'FETCH_START' });

            try {
                const response = await fetch(`/api/stakes/${country_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Public-Form-Token': token,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                // Verificar la estructura de la respuesta
                if (data.status === 'success' && Array.isArray(data.stakes)) {
                    dispatch({ type: 'FETCH_SUCCESS', payload: data.stakes });
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                console.error('Error fetching stakes:', error);
                dispatch({ type: 'FETCH_ERROR', payload: errorMessage });
            }
        };
        if (country_id) {
            fetchStakes();
        }
    }, [country_id]);

    return {
        stakes: state.stakes,
        loading: state.loading,
        error: state.error
    };
};

export default useFilteredStakes;
