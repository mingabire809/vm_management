import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Head } from '@inertiajs/react';
import Select from "react-select";


export default function Create({auth}){

    const { data, setData, post, processing, errors, recentlySuccessful } =
    useForm({
        name: "",
        storage: "",
        processor: "",
        ram: ""

    });

    const operatingSystems = [
        // Desktop Operating Systems
        "Windows 11",
        "Windows 10",
        "Windows 8.1",
        "Windows 7",
        "macOS Ventura",
        "macOS Monterey",
        "macOS Big Sur",
        "macOS Catalina",
        "Linux Ubuntu",
        "Linux Debian",
        "Linux Fedora",
        "Linux Arch",
        "Linux Mint",
        "Linux CentOS",
        "Linux Red Hat Enterprise Linux (RHEL)",
        "Linux openSUSE",
        "FreeBSD",
        "OpenBSD",
        "Solaris",
        
        // Mobile Operating Systems
        "iOS",
        "Android",
        "HarmonyOS",
        "KaiOS",
        "Windows Phone",
        "BlackBerry OS",
        "Sailfish OS",
        "Tizen",
      
        // Server Operating Systems
        "Windows Server 2022",
        "Windows Server 2019",
        "Windows Server 2016",
        "Linux Ubuntu Server",
        "Linux CentOS Server",
        "Linux Red Hat Enterprise Linux (RHEL) Server",
        "Linux Debian Server",
        "Linux SUSE Linux Enterprise Server (SLES)",
        "FreeBSD Server",
        "Oracle Linux",
      
        // Real-Time Operating Systems (RTOS)
        "FreeRTOS",
        "RTLinux",
        "VxWorks",
        "QNX",
        "ThreadX",
      
        // Legacy and Other Operating Systems
        "MS-DOS",
        "AmigaOS",
        "BeOS",
        "HP-UX",
        "AIX",
        "OS/2",
        "MorphOS"
      ];

      const storageSizes = [
        "64GB", 
        "128GB", 
        "256GB", 
        "512GB", 
        "1TB",   // 1024GB
        "2TB",   // 2048GB
        "4TB",   // 4096GB
        "8TB",   // 8192GB
        "16TB"   // 16384GB
      ];

      const ramSizes = [
        "2GB", 
        "4GB", 
        "8GB", 
        "16GB", 
        "32GB", 
        "64GB", 
        "128GB", 
        "256GB"
      ];
    
      const processors = [
        "Intel Core i3",
        "Intel Core i5",
        "Intel Core i7",
        "Intel Core i9",
        "AMD Ryzen 3",
        "AMD Ryzen 5",
        "AMD Ryzen 7",
        "AMD Ryzen 9",
        "Apple M1",
        "Apple M1 Pro",
        "Apple M1 Max",
        "Apple M2",
        "Qualcomm Snapdragon 888",
        "Qualcomm Snapdragon 8 Gen 1",
        "Exynos 2100",
        "MediaTek Dimensity 1200",
        "ARM Cortex-A76",
        "Intel Xeon",
        "AMD EPYC"
      ];
      

      const osOptions = operatingSystems.map((os)=>({
        value: os,
        label: os
      }));

      const storageOptions = storageSizes.map((storage)=>({
        value: storage,
        label: storage
      }));

      const ramOptions = ramSizes.map((ram)=>({
        value: ram,
        label: ram
      }));

      const processorOptions = processors.map((processor)=>({
        value: processor,
        label: processor
      }));
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className='flex flex-wrap items-center justify-between'>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">VM creation</h2>
                </div>
            }
        >
            <Head title='VM creation'/>

            <div className='p-4'>
            <form className='px-10'>
            <div className="space-y-10">
            <div className="border-b border-gray-900/10 pb-12">
            
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                >
                                    Operating System
                                </label>
                                <div className="mt-2">
                                    <Select
                                        options={osOptions}
                                        placeholder="Select an Operating System"
                                        isSearchable={true}
                                        onChange={(selectedOption) =>
                                            setData(
                                                "name",
                                                selectedOption.value
                                            )
                                        }
                                    />
                                </div>
                               
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                >
                                    Storage
                                </label>
                                <div className="mt-2">
                                    <Select
                                        options={storageOptions}
                                        placeholder="Select storage size"
                                        isSearchable={true}
                                        onChange={(selectedOption) =>
                                            setData(
                                                "storage",
                                                selectedOption.value
                                            )
                                        }
                                    />
                                </div>
                               
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                >
                                    Ram
                                </label>
                                <div className="mt-2">
                                    <Select
                                        options={ramOptions}
                                        placeholder="Select ram size"
                                        isSearchable={true}
                                        onChange={(selectedOption) =>
                                            setData(
                                                "ram",
                                                selectedOption.value
                                            )
                                        }
                                    />
                                </div>
                               
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="first-name"
                                    className="block text-base font-medium leading-6 text-gray-900"
                                >
                                    Processor
                                </label>
                                <div className="mt-2">
                                    <Select
                                        options={processorOptions}
                                        placeholder="Select a processor"
                                        isSearchable={true}
                                        onChange={(selectedOption) =>
                                            setData(
                                                "processor",
                                                selectedOption.value
                                            )
                                        }
                                    />
                                </div>
                               
                            </div>
            </div>
            </div>
            </div>

            <PrimaryButton className='h-11 bg-gray-900 mt-3 mx-auto'>CREATE THE VM</PrimaryButton>
            </form>
            </div>


        </AuthenticatedLayout>
    )
}