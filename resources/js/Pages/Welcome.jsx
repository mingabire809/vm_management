import { Link, Head } from '@inertiajs/react';
import {CalendarDaysIcon, CalendarDateRangeIcon, InboxStackIcon, BanknotesIcon, CloudArrowUpIcon} from '@heroicons/react/24/solid'
import PrimaryButton from '@/Components/PrimaryButton';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion, rate }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-gray-900 dark:text-white/50">
                
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <ApplicationLogo/>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">

                            <div className='text-white font-bold'>WELCOME TO OUR VIRTUAL MANAGEMENT PLATEFORM</div>

                            <div className='flex items-center'>
                            <img src='images/vm_image_2.png' className='w-1/3 h-auto'/>
                                    <div className='text-center bg-gradient-to-br'>OUR PLATFORM ENHANCE COLLABORABILITY AND FUTURE DEVELOPMENT</div>
                                <img src='images/vm_image_3.png' className='w-1/3 h-auto'/>
                               
                            </div>

                            <div className='text-white'>OUR PLANS ARE AS FOLLOW</div>

                            <div className="mb-5 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-3">
                {rate.map(subscription=>(
                     <div className="relative rounded-lg border bg-gray-700 p-4  focus:outline-none">
                        <img className='mx-auto w-1/2 h-auto rounded-full' src={"https://ui-avatars.com/api/?name=" + subscription.name}/>
                         <h2 className='text-center text-xl font-bold mt-4'>{subscription.name}</h2>
                         <div className="flex items-center text-white mt-2"> <BanknotesIcon className='w-auto h-5 text-white mr-1'/> Ksh {subscription.price.toLocaleString()}</div>
                        <div className="flex items-center text-white mt-2"> <CloudArrowUpIcon className='w-auto h-5 text-white mr-1'/>{subscription.number_of_vm_allowed} Virtual Machines</div>
                        <div className="flex items-center text-white mt-2"><InboxStackIcon className='w-auto h-5 text-white mr-1'/>{subscription.number_of_backup_allowed} Backups</div>

                        <div className='flex'>
                    <PrimaryButton 
                    onClick={()=>{auth.user ? window.location.href=route('subscription.index'):window.location.href=route('login')}
                        } 
                    className='mx-auto mt-5 w-1/2 bg-orange-700'><h2 className='text-center mx-auto'>SUBSCRIBE</h2></PrimaryButton>
                    </div>
                     </div>
                ))}
            </div>

            <div className='text-white text-center font-bold text-xl'>OUR EXPERIENCE</div>

            <p className='text-white mt-4 w-1/2 mx-auto leading-loose tracking-wider'>
            We specialize in providing comprehensive virtual machine management solutions designed to ensure optimal performance, scalability, and reliability across all business-critical applications. Leveraging industry-leading platforms such as VMware vSphere, Microsoft Hyper-V, and KVM, we tailor virtual environments to meet the unique needs of each client. Our services encompass everything from VM provisioning and resource optimization to network configuration and the automation of key workflows, streamlining operations and reducing manual overhead.
            </p>

            <p className='text-white mt-4 w-1/2 mx-auto leading-loose tracking-wider'>
            In addition to our core services, we implement robust disaster recovery and backup strategies to guarantee high availability and minimize downtime. Our team continuously monitors system performance, addressing potential issues before they impact business operations. We also prioritize security, ensuring all virtual environments are compliant with industry standards and protected from emerging threats. By focusing on delivering flexible and scalable solutions, We empower businesses to maintain dynamic IT infrastructures that support both current and future growth.
            </p>

            <div className='flex mt-7 items-center'>
            <img src='images/vm_image_4.png' className='w-1/3 h-auto'/>
            
            <div className='w-1/2'>
            <p className='text-white'>
            Get started with our virtual machine management solutions and optimize your IT infrastructure for peak performance and scalability. From VM provisioning to automation and disaster recovery, our expert team handles everything, ensuring secure and efficient virtual environments tailored to your business needs. Let us help you build a flexible, reliable IT foundation that supports your growth and innovation.
            </p>
            <PrimaryButton
            onClick={()=>{auth.user ? window.location.href=route('vm.create'):window.location.href=route('login')}} 
            className='bg-orange-700 mt-10'>GET STARTED NOW</PrimaryButton>
            </div>
            </div>


                           
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
