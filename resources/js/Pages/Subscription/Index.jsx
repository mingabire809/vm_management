import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {CalendarDaysIcon, CalendarDateRangeIcon, InboxStackIcon, BanknotesIcon, CloudArrowUpIcon} from '@heroicons/react/24/solid'
import PrimaryButton from '@/Components/PrimaryButton';
import { format } from "date-fns";
import SubscriptionCreation from '@/Components/SubscriptionCreation';
import { useState } from 'react';


export default function Index({ auth, rate, subscription }){
    const subscribe = (rate_id) =>{
        router.post(route('subscription.subscribe'), { rateplan_id: rate_id }, { preserveState: true });
    }

    const [subscriptionOpen, setSubscriptionOpen] = useState(false);
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-wrap items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Subscriptions</h2>
                    </div>
            }
        >

            <Head title="Subscriptions"/>

            <div className='p-3'>
            {subscription && (
                <div className="relative mx-auto rounded-lg border bg-white p-4  focus:outline-none lg:w-1/5 md:w-2/5">
                <div className='rounded-bl-xl bg-orange-500 w-1/4 text-white text-center font-bold absolute top-0 right-0'>Current</div>
                            <img className='mx-auto w-1/2 h-auto rounded-full' src={"https://ui-avatars.com/api/?name=" + subscription.name}/>
                             <h2 className='text-center text-xl font-bold mt-4'>{subscription.name}</h2>
                             <div className="flex items-center text-gray-900 mt-2"> <CalendarDaysIcon className='w-auto h-5 text-gray-700 mr-1'/> Start Date: {format(
                                            new Date(subscription.starting_date),
                                            "MMM dd, yyyy"
                                        )}</div>
                             <div className="flex items-center text-gray-900 mt-2"> <CalendarDateRangeIcon className='w-auto h-5 text-gray-700 mr-1'/> Expiry Date: {format(
                                            new Date(subscription.expiring_date),
                                            "MMM dd, yyyy"
                                        )}</div>
                            <div className="flex items-center text-gray-900 mt-2"> <CloudArrowUpIcon className='w-auto h-5 text-gray-700 mr-1'/>{subscription.number_of_vm_allowed} Virtual Machines</div>
                            <div className="flex items-center text-gray-900 mt-2"><InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>{subscription.number_of_backup_allowed} Backups</div>
    
                            <div className='flex'>
                        
                        </div>
                         </div>
            )}
            </div>

            <h2 className='text-center mt-2 mb-2 text-xl font-bold'>Make a subscription or upgrade your current one</h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3">
                {rate.map(subscription=>(
                     <div className="relative rounded-lg border bg-white p-4  focus:outline-none">
                        <img className='mx-auto w-1/2 h-auto rounded-full' src={"https://ui-avatars.com/api/?name=" + subscription.name}/>
                         <h2 className='text-center text-xl font-bold mt-4'>{subscription.name}</h2>
                         <div className="flex items-center text-gray-900 mt-2"> <BanknotesIcon className='w-auto h-5 text-gray-700 mr-1'/> Ksh {subscription.price.toLocaleString()}</div>
                        <div className="flex items-center text-gray-900 mt-2"> <CloudArrowUpIcon className='w-auto h-5 text-gray-700 mr-1'/>{subscription.number_of_vm_allowed} Virtual Machines</div>
                        <div className="flex items-center text-gray-900 mt-2"><InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>{subscription.number_of_backup_allowed} Backups</div>

                        <div className='flex'>
                    <PrimaryButton 
                    onClick={()=>{
                        setId(subscription.id)
                        setName(subscription.name)
                        setAmount(subscription.price)
                        
                        setSubscriptionOpen(true)}} 
                    className='mx-auto mt-5 w-1/2 bg-orange-700'><h2 className='text-center mx-auto'>SUBSCRIBE</h2></PrimaryButton>
                    </div>
                     </div>
                ))}
            </div>

            <SubscriptionCreation
            open={subscriptionOpen}
            setOpen={setSubscriptionOpen}
            subscriptionName={name}
            subscriptionId={id}
            amount={amount}
            />

        </AuthenticatedLayout>
    )
}