import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {CircleStackIcon, CpuChipIcon, InboxStackIcon} from '@heroicons/react/24/solid'
import PrimaryButton from '@/Components/PrimaryButton';



export default function Dashboard({ auth }) {
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
                <div className="relative rounded-lg border bg-white p-4  focus:outline-none">
                    <img className='mx-auto' src="https://robohash.org/windows 11"/>
                    <h2 className='text-center text-xl font-bold mt-4'>Windows 11</h2>
                    
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="flex items-center text-gray-900 mt-2"> <CircleStackIcon className='w-auto h-5 text-gray-700 mr-1'/> 18 GB storage</div>
                        <div className="flex items-center text-gray-900 mt-2"> <InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>8GB Ram</div>
                        <div className="flex items-center text-gray-900 mt-2"><CpuChipIcon className='w-auto h-5 text-gray-700 mr-1'/>Core i7</div>
                        <div className="flex items-center text-gray-900 mt-2"><div className='mr-3 w-3 h-3 bg-green-500 rounded-full'></div>Active</div>
                    </div>

                    <div className='flex'>
                    <PrimaryButton className='mx-auto mt-5 w-1/2 bg-gray-700'><h2 className='text-center mx-auto'>OPEN</h2></PrimaryButton>
                    </div>
                </div>

                <div className="relative rounded-lg border bg-white p-4  focus:outline-none">
                    <img className='mx-auto' src="https://robohash.org/windows 10"/>
                    <h2 className='text-center text-xl font-bold mt-4'>Windows 10</h2>
                    
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="flex items-center text-gray-900 mt-2"> <CircleStackIcon className='w-auto h-5 text-gray-700 mr-1'/> 18 GB storage</div>
                        <div className="flex items-center text-gray-900 mt-2"> <InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>8GB Ram</div>
                        <div className="flex items-center text-gray-900 mt-2"><CpuChipIcon className='w-auto h-5 text-gray-700 mr-1'/>Core i7</div>
                        <div className="flex items-center text-gray-900 mt-2"><div className='mr-3 w-3 h-3 bg-green-500 rounded-full'></div>Active</div>
                    </div>

                    <div className='flex'>
                    <PrimaryButton className='mx-auto mt-5 w-1/2 bg-gray-700'><h2 className='text-center mx-auto'>OPEN</h2></PrimaryButton>
                    </div>
                </div>

                <div className="relative rounded-lg border bg-white p-4  focus:outline-none">
                    <img className='mx-auto' src="https://robohash.org/kali"/>
                    <h2 className='text-center text-xl font-bold mt-4'>Kali Linux</h2>
                    <div className="bg-white overflow-hidden sm:rounded-lg">
                        <div className="flex items-center text-gray-900 mt-2"> <CircleStackIcon className='w-auto h-5 text-gray-700 mr-1'/> 36 GB storage</div>
                        <div className="flex items-center text-gray-900 mt-2"> <InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>8GB Ram</div>
                        <div className="flex items-center text-gray-900 mt-2"><CpuChipIcon className='w-auto h-5 text-gray-700 mr-1'/>Core i5</div>
                        <div className="flex items-center text-gray-900 mt-2"><div className='mr-3 w-3 h-3 bg-red-500 rounded-full'></div>Inactive</div>
                    </div>

                    <div className='flex'>
                    <PrimaryButton className='mx-auto mt-5 w-1/2 bg-gray-700'><h2 className='text-center mx-auto'>OPEN</h2></PrimaryButton>
                    </div>
                </div>

                
            </div>
        </AuthenticatedLayout>
    );
}
