import { usePage } from "@inertiajs/react";
import DropdownFilter from "../dropdown-filter";
import { EnumItem, Enums } from "@/types/global";

type PageProps = {
    enums: Enums;
    responsables: EnumItem[] | null;
}
export default function FilterBar() {
    const { enums, responsables } = usePage<PageProps>().props;
    return (
        <div className='flex gap-4 px-4'>
            <DropdownFilter
                data={enums.requestStatus}
                paramKey="status"
                placeholder="Selecciona un estado"
                allowAll={true}
            />
            {responsables &&
                <DropdownFilter
                    data={responsables}
                    paramKey="responsable"
                    placeholder="Selecciona un responsable"
                    allowAll={true}
                />
            }

        </div>
    )
}