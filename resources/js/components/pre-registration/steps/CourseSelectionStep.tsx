import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { StepperContext } from '@/pages/forms/stepper-provider';
import { Course } from '@/types/course';
import { Enums, Translation } from '@/types/global';
import { PreRegistrationFormData } from '@/types/pre-inscription';
import { usePage } from '@inertiajs/react';
import { ArrowLeft, Clock, Globe } from 'lucide-react';
import { useContext } from 'react';
import { StepsHeader } from '../steps-header';

interface CourseSelectionStepProps {
    courses: Course[];
    request: {
        data: PreRegistrationFormData;
        setData: (field: keyof PreRegistrationFormData, value: any) => void;
        errors: Record<string, string>;
    };
}

export function CourseSelectionStep({ courses, request }: CourseSelectionStepProps) {
    const { data, setData } = request;
    const { nextStep, previousStep } = useContext(StepperContext);
    const { enums, forms, ui } = usePage<{
        enums: Enums;
        forms: Translation['forms'];
        ui: Translation['ui'];
    }>().props;

    const selectedCourse = courses.find((course) => course.id === data.course_id)?.name || '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Card className="mx-auto w-full max-w-4xl overflow-hidden border-0 pt-0 shadow-2xl">
            <StepsHeader title={forms.pre_inscription.course_selection.title} subtitle={forms.pre_inscription.course_selection.description} />

            <CardContent className="space-y-6 p-3 sm:space-y-8 sm:p-6 md:p-8">
                <RadioGroup
                    name="course_id"
                    value={data.course_id?.toString()}
                    onValueChange={(val) => setData('course_id', Number(val))}
                    className="space-y-1"
                >
                    {courses.map((course, index) => (
                        <label
                            key={course.id}
                            htmlFor={`course-${index}`}
                            className={`hover:bg-muted/50 flex cursor-pointer flex-col items-start rounded-lg border p-3 transition select-none sm:flex-row sm:items-center sm:p-4 ${data.course_id === course.id ? 'bg-[rgb(46_131_242_/_1)]/5 ring-2 ring-[rgb(46_131_242_/_1)]' : ''}`}
                            tabIndex={0}
                        >
                            <div className="grid w-full flex-1 grid-cols-1 gap-2 sm:grid-cols-5">
                                <div className="col-span-3 flex items-center gap-2 text-sm md:text-base">
                                    <RadioGroupItem
                                        value={course.id.toString()}
                                        id={`course-${index}`}
                                        className="mt-1 size-5"
                                        checked={data.course_id === course.id}
                                        aria-label={course.name}
                                        tabIndex={-1}
                                    />
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{course.name}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 sm:text-[16px]">
                                    <Clock className="h-4 w-4 text-[rgb(46_131_242_/_1)]" />
                                    <span className="font-medium text-[rgb(46_131_242_/_1)]">
                                        {course.duration} {forms.pre_inscription.course_selection.duration}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-[rgb(46_131_242_/_1)]" />
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            course.modality.name === 'En Línea'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        }`}
                                    >
                                        {course.modality.name}
                                    </span>
                                </div>
                            </div>
                        </label>
                    ))}
                </RadioGroup>

                {selectedCourse && (
                    <div className="mt-4 rounded-lg border border-[rgb(46_131_242_/_1)]/20 bg-[rgb(46_131_242_/_1)]/5 p-3 sm:mt-6 sm:p-4">
                        <h3 className="text-funval-darkBlue mb-2 font-semibold">
                            {forms.pre_inscription.course_selection.selected_course} {selectedCourse}
                        </h3>
                        <p className="text-muted-foreground text-sm">{forms.pre_inscription.course_selection.selection_confirmation}</p>
                    </div>
                )}

                <div className="flex justify-between pt-4">
                    <Button onClick={previousStep} variant="outline" size="lg" className="min-w-[120px]">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {ui.buttons.previous}
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={!data.course_id}
                        variant="default"
                        size="lg"
                        className="min-w-[140px] bg-[rgb(46_131_242_/_1)] text-white hover:bg-[rgb(46_131_242_/_1)]/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {ui.buttons.continue}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
