const courses = [
    {
        title: 'Competitive Strategy law for all students',
        image: '/images/course-1.jpg',
        duration: '5 Meses',
        level: 'Beginner',
        modules: '4 Módulos',
        price: 'Gratis',
    },
    {
        title: 'Machine Learning A-Z: Hands-On Python and Java',
        image: '/images/course-2.jpg',
        duration: '5 Meses',
        level: 'Beginner',
        modules: '4 Módulos',
        price: 'Gratis',
    },
    {
        title: 'Achieving Advanced in Insights with Big',
        image: '/images/course-3.jpg',
        duration: '5 Meses',
        level: 'Beginner',
        modules: '4 Módulos',
        price: 'Gratis',
    },
    {
        title: 'Education Makes A Person A Responsible Citizen',
        image: '/images/course-4.jpg',
        duration: '5 Meses',
        level: 'Beginner',
        modules: '4 Módulos',
        price: 'Gratis',
    },
    {
        title: 'Building A Better World One Student At A Time',
        image: '/images/course-5.jpg',
        duration: '5 Meses',
        level: 'Beginner',
        modules: '4 Módulos',
        price: 'Gratis',
    },
    {
        title: 'Education is About Forming Faithful Disciples',
        image: '/images/course-6.jpg',
        duration: '5 Meses',
        level: 'Beginner',
        modules: '4 Módulos',
        price: 'Gratis',
    },
];

const CourseCard = ({ course }) => {
    return (
        <div className="overflow-hidden bg-white text-left shadow-md">
            <div className="relative">
                <img src={course.image} alt={course.title} className="h-64 w-full object-cover" />

                <span className="absolute top-2 right-2 flex h-6 items-center gap-1.5 bg-[#2189d6] px-2 py-1 text-xs font-medium text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {course.duration}
                </span>
            </div>
            <div className="bg-white p-4">
                <span className="rounded border border-blue-300 bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">{course.level}</span>

                <div className="mt-2 flex items-center gap-1 text-sm text-gray-700">
                    <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9M12 4h9M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span>{course.modules}</span>
                </div>

                <h3 className="text-md mt-2 font-bold text-slate-800">{course.title}</h3>

                <p className="mt-1 text-sm font-semibold text-red-600">{course.price}</p>
            </div>
        </div>
    );
};

const CourseCatalog = () => {
    return (
        <div className="bg-[#c0def7] px-4 py-10 text-center text-[#113153]">
            <h2 className="mb-8 text-3xl font-bold">Comienza tu Viaje de Aprendizaje</h2>
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
                {courses.map((course, idx) => (
                    <CourseCard key={idx} course={course} />
                ))}
            </div>
            <button className="mt-10 rounded bg-[#136bb6] px-6 py-2 text-white hover:bg-blue-700">¡Empieza a aprender hoy mismo!</button>
        </div>
    );
};

export default CourseCatalog;
