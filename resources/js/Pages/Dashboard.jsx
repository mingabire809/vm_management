import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {CircleStackIcon, CpuChipIcon, InboxStackIcon} from '@heroicons/react/24/solid'
import PrimaryButton from '@/Components/PrimaryButton';



export default function Dashboard({ auth, vm }) {

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-wrap items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">My VMs</h2>
                    <Link
                    href={route('vm.create')}
                    className='inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 bg-blue-700 h-11 mt-2 lg:mt-0 md:mt-0'>Create a Virtual Machine</Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3">
                {vm.map(machine =>(
                    <div className="relative rounded-lg border bg-white p-4  focus:outline-none">
                    <img className='mx-auto' src={`https://robohash.org/${machine.name}`}/>
                    <h2 className='text-center text-xl font-bold mt-4'>{machine.name}</h2>
                    
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="flex items-center text-gray-900 mt-2"> <CircleStackIcon className='w-auto h-5 text-gray-700 mr-1'/> {machine.storage} GB storage</div>
                        <div className="flex items-center text-gray-900 mt-2"> <InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>{machine.ram}GB Ram</div>
                        <div className="flex items-center text-gray-900 mt-2"><CpuChipIcon className='w-auto h-5 text-gray-700 mr-1'/>{machine.processor}</div>
                        <div className="flex items-center text-gray-900 mt-2"> {machine.status==='active' ? <div className='mr-3 w-3 h-3 bg-green-500 rounded-full'/>:<div className='mr-3 w-3 h-3 bg-red-500 rounded-full'/>} {capitalizeFirstLetter(machine.status)}</div>
                    </div>

                    <div className='flex'>
                    <PrimaryButton onClick={()=>window.location.href=route('vm.show',machine.id)} className='mx-auto mt-5 w-1/2 bg-gray-700'><h2 className='text-center mx-auto'>OPEN</h2></PrimaryButton>
                    </div>
                </div>
                ))}
                

            

                

                
            </div>
        </AuthenticatedLayout>
    );
}
