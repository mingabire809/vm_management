import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {CalendarDaysIcon, CalendarDateRangeIcon, InboxStackIcon, BanknotesIcon, CloudArrowUpIcon} from '@heroicons/react/24/solid'
import PrimaryButton from '@/Components/PrimaryButton';
import { format } from "date-fns";
import SubscriptionCreation from '@/Components/SubscriptionCreation';
import BillPayment from '@/Components/BillPayment';
import { useState } from 'react';


export default function Index({ auth, billing, payments }){

    const [billPaymentOpen, setBillPaymentOpen] = useState(false);

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex flex-wrap items-center justify-between'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">My Bill</h2>
                </div>
        }
        >

        <Head title="My Bill"/>

        <div className='p-3'>
        {billing && (
                <div className="relative mx-auto rounded-lg border bg-white p-4  focus:outline-none lg:w-1/5 md:w-2/5">
                            <img className='mx-auto w-1/2 h-auto rounded-full' src={"https://ui-avatars.com/api/?name=" + billing.bill}/> 
                             <h2 className='text-center text-xl font-bold mt-4'>Ksh {billing.bill}</h2>
                             {billing.status==='unpaid' &&(
                                <div className="flex items-center text-gray-900 mt-2"> <CalendarDaysIcon className='w-auto h-5 text-gray-700 mr-1'/> Due Date: {format(
                                    new Date(billing.due_date),
                                    "MMM dd, yyyy"
                                )}</div>
                             )}
                       
    
                            <div className='flex'>
                            {billing.status==='unpaid' &&(
                                <PrimaryButton onClick={()=>setBillPaymentOpen(true)} className='mx-auto mt-5 bg-orange-700 w-1/2 text-center'><h2 className='text-center mx-auto'>PAY NOW</h2></PrimaryButton>
                            )}
                        
                        </div>
                         </div>
            )}

            <div className='lg:w-1/3 mx-auto'>
                <h2 className='mb-2 mt-2 text-xl font-bold'>Billing Payments</h2>
                <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-gray-200">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-3"
                            >
                                Date
                            </th>
                           
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                            >
                                Amount
                            </th>
                            
                            
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                    {payments.map(payment=>(
                         <tr className="hover:bg-gray-100">
 
                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-3.5">
                         <span className="font-bold text-lg">{format(
                                            new Date(payment.created_at),
                                            "MMM dd, yyyy"
                                        )}</span>
                         </td>

                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-3.5">
                         <span className="font-bold text-lg">Ksh {payment.amount?.toLocaleString()}</span>
                         </td>
                         </tr>
                    ))}
                    </tbody>
                </table>
           
            </div>

        </div>

        {billing &&(
            <BillPayment
            open={billPaymentOpen}
            setOpen={setBillPaymentOpen}
            billing={billing}
            />
        )}

        </AuthenticatedLayout>
    )
}