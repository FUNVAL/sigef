import { type IdNameEntity } from "./common";

type Course = {
    id: number;
    name: string;
    duration: number;
    modality: IdNameEntity;
    status: IdNameEntity;
}

type CreateCourseForm = Omit<Course, 'id' | 'modality' | 'status'> & {
    modality: number;
    status: number;
};
type UpdateCourseForm = Omit<Course, 'modality' | 'status'> & {
    modality: number;
    status: number;
};


export type { Course, CreateCourseForm, UpdateCourseForm };

