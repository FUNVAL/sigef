// Constantes para estados de Stake (deben coincidir con StatusEnum de PHP)
export const STAKE_STATUS = {
    ACTIVE: 1,
    INACTIVE: 2,
    DELETED: 3,
} as const;

export type StakeStatus = (typeof STAKE_STATUS)[keyof typeof STAKE_STATUS];
