'use client';

import { Fragment } from 'react';
import Image from 'next/image';

import { Dialog, Transition } from '@headlessui/react';

import { CarProps } from '@/types';
import { generateCarImageUrl } from '@/utils';

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {
    const { city_mpg, class: carClass, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year } = car;

    return (
        <>
            <Transition appear as={Fragment} show={isOpen}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>

                    {/* Start Overlay. Transition.Child will display a backdrop using a div */}
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>
                    {/* End Overly */}

                    {/* Start Modal */}
                    <div className='fixed inset-0 overflow-y-auto'>

                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className="relative w-full max-w-lg max-h-[95vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">

                                    {/* Start Modal Close Button */}
                                    <button
                                        type='button'
                                        className='absolute top-2 right-2 z-10 w-fit bg-primary-blue-100 rounded-full'
                                        onClick={closeModal}
                                    >
                                        <Image
                                            src="/close.svg"
                                            alt="Close"
                                            width={20}
                                            height={20}
                                            className='object-contain'
                                        />
                                    </button>
                                    {/* End Modal Close Button */}

                                    {/* Start: Images Conatiner */}
                                    <div className='flex-1 flex flex-col gap-3'>

                                        {/* Showing a bigger single picture */}
                                        <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                                            <Image
                                                src={generateCarImageUrl(car)}
                                                alt='car model'
                                                fill
                                                priority
                                                className='object-contain'
                                            />
                                        </div>

                                        {/* Showing 3 smaller images in a row */}
                                        <div className='flex gap-3'>
                                            <div className='relative flex-1 w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                <Image
                                                    src={generateCarImageUrl(car, '29')}
                                                    alt='car model'
                                                    fill
                                                    priority
                                                    className='object-contain'
                                                />
                                            </div>

                                            <div className='relative flex-1 w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                <Image
                                                    src={generateCarImageUrl(car, '33')}
                                                    alt='car model'
                                                    fill
                                                    priority
                                                    className='object-contain'
                                                />
                                            </div>

                                            <div className='relative flex-1 w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                <Image
                                                    src={generateCarImageUrl(car, '13')}
                                                    alt='car model'
                                                    fill
                                                    priority
                                                    className='object-contain'
                                                />
                                            </div>
                                        </div>
                                        {/* End showing 3 images */}

                                    </div>
                                    {/* End: Images Container */}

                                    {/* Start Car's other data container */}
                                    <div className='flex-1 flex flex-col gap-2'>
                                        <h2 className='font-semibold text-xl capitalize'>
                                            {car.make} {car.model}
                                        </h2>

                                        <div className='mt-3 flex flex-wrap gap-4'>
                                            {Object.entries(car).map(([key, value]) => (
                                                <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                    <h4 className='text-gray capitalize'>
                                                        {key.split('_').join(" ")}
                                                    </h4>
                                                    <p className='font-semibold text-black-100'>
                                                        {value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </Dialog.Panel>
                            </ Transition.Child>
                        </div>

                    </div>

                </Dialog>
            </Transition>
        </>
    )
}

export default CarDetails