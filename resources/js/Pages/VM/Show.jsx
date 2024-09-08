import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { router, useForm } from "@inertiajs/react";


export default function Show({auth, virtual}){

    const { delete: destroy } = useForm({
        
    });


    return(
        <Authenticated
            user={auth.user}
            header={
                <div className='flex flex-wrap items-center justify-between'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">{virtual.name}</h2>
            </div>
            }
        >

            <div className="p-8">
                <PrimaryButton onClick={()=>destroy(route('vm.delete', virtual.id))} className="absolute top right-4 bg-red-700">Delete</PrimaryButton>
            </div>

        </Authenticated>
    )
}