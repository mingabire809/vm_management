import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {CalendarDaysIcon, CalendarDateRangeIcon, InboxStackIcon, BanknotesIcon, CloudArrowUpIcon} from '@heroicons/react/24/solid'
import PrimaryButton from '@/Components/PrimaryButton';
import { format } from "date-fns";
import { useState } from 'react';

export default function Index({ auth, backups }){
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={
            <div className='flex flex-wrap items-center justify-between'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">My backups</h2>
                </div>
        }
        >
            <Head title="My backups"/>

            <div className='p-3'>

            <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                <thead className="bg-gray-200">
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-3"
                            >
                                Backup Name
                            </th>
                           
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                            >
                                Path
                            </th>

                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-base font-semibold text-gray-900"
                            >
                                Date
                            </th>

                            <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                            >
                                <span className="sr-only">Delete</span>
                            </th>
                            
                            
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                    {backups.map(backup=>(
                         <tr className="hover:bg-gray-100">
                            
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-3.5 hidden lg:table-cell">
                         <span className="font-bold text-lg">{backup.backup_name}</span>
                         </td>

                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-3.5 hidden lg:table-cell">
                         <span className="font-bold text-lg">{backup.path}</span>
                         </td>

                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:pl-3.5 hidden lg:table-cell">
                         <span className="font-bold text-lg">{format(
                                            new Date(backup.created_at),
                                            "MMM dd, yyyy"
                                        )}</span>
                         </td>

                         <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-base font-medium sm:pr-0">
                            <Link
                            className="text-red-800 mr-4 hover:text-purple-800"
                            >Delete</Link>
                         </td>

                         </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    )
}