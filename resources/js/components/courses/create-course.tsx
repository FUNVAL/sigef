import { useState } from "react"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useForm, usePage } from "@inertiajs/react";
import { CreateCourseForm } from "@/types/course";
import InputError from "../input-error";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LoaderCircle } from "lucide-react";

type Enums = {
    courseModality: { id: number; name: string }[];
    statusEnum: { id: number; name: string }[];
}

export function CreateCourse() {
    const [open, setOpen] = useState(false);
    const { enums } = usePage<{ enums: Enums }>().props;
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<CreateCourseForm>(initialData);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('courses.store'), {
            onSuccess: () => {
                setOpen(false);
                setData(initialData);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className='cursor-pointer'>
                    Crear Curso
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Crear Curso</DialogTitle>
                    <DialogDescription>
                        Aquí puedes crear un nuevo curso. Asegúrate de completar todos los campos requeridos.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre del curso</Label>
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                placeholder="Primer nombre"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="duration">Duración</Label>
                            <Input
                                id="duration"
                                name="duration"
                                value={data.duration}
                                onChange={(e) => setData('duration', Number(e.target.value))}
                                required
                                placeholder="Duración del curso"
                            />
                            <InputError message={errors.duration} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="modality">Modalidad del Cursos</Label>
                            <Select
                                name="modality"
                                value={String(data.modality)}
                                required
                                onValueChange={(value) => setData('modality', Number(value))}
                            >
                                <SelectTrigger id="modality">
                                    <SelectValue placeholder="Seleccione tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {enums.courseModality?.map((doc) => (
                                        <SelectItem key={doc.id} value={String(doc.id)}>
                                            {doc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.modality} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Estado</Label>
                            <Select
                                name="status"
                                value={String(data.status)}
                                required
                                onValueChange={(value) => setData('status', Number(value))}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Seleccione estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        enums.statusEnum?.slice(0, 2).map((status) => (
                                            <SelectItem key={status.id} value={String(status.id)}>
                                                {status.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <InputError message={errors.status} />
                        </div>
                    </div>
                    <DialogFooter className="mt-6 gap-4 flex">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={processing}
                            onClick={() => setOpen(false)}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Guardar
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

const initialData: CreateCourseForm = {
    name: '',
    duration: 1,
    modality: 1,
    status: 1,
}