type Course = {
    id: number;
    name: string;
    duration: number;
    modality: {
        id: number;
        name: string;
    };
    status: {
        id: number;
        name: string;
    };
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

