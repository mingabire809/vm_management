import React, {useState} from "react";
import { Fragment } from "react";
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function BillPayment({open, setOpen, billing}){

    const { data, setData, post, processing, errors, recentlySuccessful } =
    useForm({
        phone: ""        

    });

   

    const submit = (e) => {
        e.preventDefault();
        post(route("billing.pay"), {
            onSuccess: () => {setOpen(false), setData("phone", "")},
        });
    };

    return(
        <Transition show={open} as={Fragment}>
             <Dialog as="div" className="relative z-10" onClose={setOpen}>
             <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <form
                    onSubmit={submit}
                    className="fixed inset-0 z-10 w-screen overflow-y-auto"
                >

<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <BanknotesIcon
                                            className="h-6 w-6 text-gray-700"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Ksh {billing.bill} Payment
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                               Do you want to pay ksh {billing.bill} now?
                                            </p>
                                        </div>
                                         
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col justify-between">
                                                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                    <div className="space-y-6 pb-5 pt-6">
                                                        <div>
                                                            <InputLabel
                                                                htmlFor="name"
                                                                value="Phone Number"
                                                            />
                                                            <TextInput
                                                                id="name"
                                                                className="block w-full"
                                                                placeholder="2547XXXXXXXX"
                                                                value={
                                                                    data.phone
                                                                }
                                                                onChange={(e) =>
                                                                    setData((prevData) => ({
                                                                        ...prevData,
                                                                        phone: e.target.value,
                                                                      }))
                                                                }
                                                                required
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.phone
                                                                }
                                                            />
                                                        </div>

                                                        

                                                    </div>
                                                </div>
                                            </div>
                              
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <PrimaryButton
                                        type="submit"
                                        className="ml-2"
                                        disabled={processing}
                                    >
                                        Proceed
                                    </PrimaryButton>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>

                </form>
             </Dialog>
        </Transition>
    )
}