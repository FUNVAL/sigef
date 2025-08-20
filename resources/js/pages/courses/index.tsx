import { type BreadcrumbItem, } from '@/types';
import { Head, Link, } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AccessControlLayout from '@/layouts/access-control/layout';
import { DataTable } from '@/components/data-table/data-table';
import { createColumns } from '@/components/courses/course-data-table';
import { Button } from '@/components/ui/button';
import { Course } from '@/types/course';
import { CreateCourse } from '@/components/courses/create-course';
import { useState } from 'react';
import { EditCourse } from '@/components/courses/edit-course';
import { DeleteCourse } from '@/components/courses/delete-course';
import useFilters from '@/hooks/useFilters';
import { PaginationData } from '@/types/global';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cursos',
        href: '/cursos',
    },
];

interface Props {
    courses: { data: Course[] };
    pagination: PaginationData;
    filters?: {
        search?: string;
    };
}

export default function Courses({ courses, pagination, filters = {} }: Props) {
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
    const { handleSearch } = useFilters();

    const columns = createColumns({
        onEditCourse: (course) => setEditingCourse(course),
        onDeleteCourse: (course) => setDeletingCourse(course),
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cursos" />
            <AccessControlLayout headings={{
                title: 'Lista de cursos',
                description: 'Aquí puedes ver todos los cursos disponibles.',
            }}>
                <div className="space-y-6 w-full flex flex-col">
                    <div className="flex items-center justify-end absolute right-0 -top-16 p-4">
                        <CreateCourse />
                    </div>
                    <DataTable<Course>
                        data={courses.data}
                        columns={columns}
                        filterKey="name"
                        pagination={pagination}
                        searchValue={filters.search || ''}
                        onSearch={(value) => handleSearch(value, '/cursos')}
                    />
                </div>

                {editingCourse && (
                    <EditCourse
                        course={editingCourse}
                        open={!!editingCourse}
                        onOpenChange={(open) => !open && setEditingCourse(null)}
                    />
                )}

                {deletingCourse && (
                    <DeleteCourse
                        course={deletingCourse}
                        open={!!deletingCourse}
                        onOpenChange={(open) => !open && setDeletingCourse(null)}
                    />
                )}
            </AccessControlLayout>
        </AppLayout>
    );
}
