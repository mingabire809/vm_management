import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { PlayIcon, PauseIcon, CircleStackIcon, CpuChipIcon, InboxStackIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Select from "react-select";
import BackupCreation from "@/Components/BackupCreation";

export default function Show({auth, virtual, backup}){

    const { delete: destroy } = useForm({
        
    });

    const [backupCreationForm, setBackupCreationForm] = useState(false);

    const { data, setData, patch, processing, errors, recentlySuccessful } =
    useForm({
        storage: "",
        processor: "",
        ram: ""

    });

    const storageSizes = [
        16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
      ];

      const ramSizes = [
        2, 4, 8, 16, 32, 64, 128, 256
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
      

      const storageOptions = storageSizes.map((storage)=>({
        value: storage,
        label: `${storage} GB`
      }));

      const ramOptions = ramSizes.map((ram)=>({
        value: ram,
        label: `${ram} GB`
      }));

      const processorOptions = processors.map((processor)=>({
        value: processor,
        label: processor
      }));

      const submit = ()=>{
        patch(route('vm.update', virtual.id));
      }

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    

    const suspend = () =>{
        router.patch(route('vm.status', virtual.id), { status: 'inactive' }, { preserveState: true });
    }

    const resume = () =>{
        router.patch(route('vm.status', virtual.id), { status: 'active' }, { preserveState: true });
    }

    

    const svgStyle = {
        width: '200%', // Twice the width to create a continuous loop
        height: '200px',
        position: 'absolute',
        top: 0,
        left: 0,
      };

      const [editView, setEditView] = useState(false)


    return(
        <Authenticated
            user={auth.user}
            header={
                <div className='flex flex-wrap items-center justify-between'>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">{virtual.name}</h2>

                <PrimaryButton onClick={()=>destroy(route('vm.delete', virtual.id))} className="bg-red-700">Delete</PrimaryButton>
            </div>
            }
        >
            <Head title={virtual.name}/>

            <div className="p-8">
                
            
                <div className="w-1/2 mx-auto " style={{ overflow: 'hidden', height: '350px', position: 'relative', background: '#000' }}>
      <motion.svg
        style={svgStyle}
        viewBox="0 0 1000 200"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-100%'] }} // Move the wave from left to right
        transition={{
          duration: 4,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <motion.path
          d={virtual.status==='active' ? "M0 100 L100 100 L150 50 L200 150 L300 100 L400 100 L450 20 L500 180 L600 100 L1000 100": "M0 100 H1000"}
          fill="transparent"
          stroke="#00FF00" // Green color for the monitor wave
          strokeWidth="2"
        />
        {/* Duplicate the wave for seamless animation */}
        <motion.path
          d={virtual.status==='active' ? "M0 100 L100 100 L150 50 L200 150 L300 100 L400 100 L450 20 L500 180 L600 100 L1000 100": "M0 100 H1000"}
          fill="transparent"
          stroke="#00FF00"
          strokeWidth="2"
          transform="translate(1000, 0)"
        />
      </motion.svg>
    </div>

    <div className="w-1/2 mx-auto">
        {virtual.status==='active' ?<div className="flex items-center mt-2"><PauseIcon className="w-7 h-5 cursor-pointer" onClick={suspend}/> Pause</div> :<div className="flex items-center mt-2"><PlayIcon className="w-7 h-5 cursor-pointer" onClick={resume}/> Resume</div>}
        
        <div className="flex">

        </div>
        <div className="flex items-center text-gray-900 mt-2"> <CircleStackIcon className='w-auto h-5 text-gray-700 mr-1'/> {virtual.storage} GB storage</div>
                        <div className="flex items-center text-gray-900 mt-2"> <InboxStackIcon className='w-auto h-5 text-gray-700 mr-1'/>{virtual.ram}GB Ram</div>
                        <div className="flex items-center text-gray-900 mt-2"><CpuChipIcon className='w-auto h-5 text-gray-700 mr-1'/>{virtual.processor}</div>
                        <div className="flex items-center text-gray-900 mt-2"> {virtual.status==='active' ? <div className='mr-3 w-3 h-3 bg-green-500 rounded-full'/>:<div className='mr-3 w-3 h-3 bg-red-500 rounded-full'/>} {capitalizeFirstLetter(virtual.status)}</div>
        
    
                        <div className="flex items-center justify-between">
                        <PrimaryButton className="bg-blue-500 mt-5" onClick={()=>setEditView(!editView)}>{!editView ? "Edit Specification": "Close"}</PrimaryButton>

                        <PrimaryButton className="bg-gray-500 mt-5" onClick={()=>setBackupCreationForm(true)}>Create a backup</PrimaryButton>
                        </div>

                       {editView && (
                        <form 
                        onSubmit={submit}
                        >
                        <div className="mt-3 w-1/2">
                        <label
                                     htmlFor="first-name"
                                     className="block text-base font-medium leading-6 text-gray-900"
                                 >
                                     Storage
                                 </label>
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
 
                        <div className="mt-3 w-1/2">
                        <label
                                     htmlFor="first-name"
                                     className="block text-base font-medium leading-6 text-gray-900"
                                 >
                                     Ram
                                 </label>
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
 
                        <div className="mt-3 w-1/2">
                        <label
                                     htmlFor="first-name"
                                     className="block text-base font-medium leading-6 text-gray-900"
                                 >
                                     Processor
                                 </label>
                        <Select
                                         options={processorOptions}
                                         placeholder="Select processor"
                                         isSearchable={true}
                                         onChange={(selectedOption) =>
                                             setData(
                                                 "processor",
                                                 selectedOption.value
                                             )
                                         }
                                     />
                        </div>
                        <PrimaryButton type='submit' className="bg-orange-500 mt-5">Apply Changes</PrimaryButton>
                        </form>
                       )}

                       
                        <div className="mt-3">
                          <h3 className="mt-5 mb-3 text-xl font-bold underline">Backup for your {virtual.name} Virtual Machine</h3>
                        {backup.map(data_backup =>(
                          <div>
                            <h3>{data_backup.backup_name}</h3>
                            <h3></h3>
                          </div>
                        ))}
                        </div>
                      
    </div>

    
            </div>

                       <BackupCreation
                       open={backupCreationForm}
                       setOpen={setBackupCreationForm}
                       virtual={virtual}
                       />
            

        </Authenticated>
    )
}