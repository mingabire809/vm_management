import { Fragment, useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Select from "react-select";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AddChildAccount({ open, setOpen, subscriptionId }) {
    const [options, setOptions] = useState([]);

    /*const defaultServices = components.map((service) => ({
        value: service.id,
        label: service.item_name,
    }));*/

    const { setData, post, errors } = useForm({
        user_id: options.map((users) => users.id),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("subscription.add_child_account", subscriptionId), {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        axios
            .get(route("subscription.users"))
            .then((response) => {
                setOptions(
                    response.data.map((user) => ({
                        value: user.id,
                        label:  user.name,
                    }))
                );
            })
            .catch((error) => console.error(error));
    }, []);

    return (
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
                    onSubmit={handleSubmit}
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
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <PlusIcon
                                            className="h-6 w-6 text-purple-600"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle
                                            as="h3"
                                            className="text-base font-semibold leading-6 text-gray-900"
                                        >
                                            Add a child account
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                               Add child account
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <Select
                                    className="mt-2 z-100"
                                    isMulti
                                    options={options}
                                    //defaultValue={defaultServices}
                                    onChange={(selected) => {
                                        setData(
                                            "user_id",
                                            selected.map(
                                                (user) => user.value
                                            )
                                        );
                                    }}
                                />
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <PrimaryButton
                                        type="submit"
                                        className="ml-2"
                                    >
                                        Save
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
    );
}
