'use client';

import { useState } from 'react';
import Image from 'next/image';

import { CarProps } from '@/types';
import { calculateCarRent, generateCarImageUrl } from '@/utils';

import CustomButton from './CustomButton';
import CarDetails from './CarDetails';

interface CarCardProps {
    car: CarProps;
};

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, drive, make, model, transmission, year } = car;

    const [isOpen, setIsOpen] = useState(false);

    const carRent = calculateCarRent(city_mpg, year);

    return (
        <div className='flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl group'>
            {/* Start Car's make and model */}
            <div className=' w-full flex justify-between items-start gap-2'>
                <p className='text-[22px] leading-[26px] font-bold capitalize'>
                    {make} {model}
                </p>
            </div>
            {/* End Car's make and model */}

            {/* Start Car's rent per day */}
            <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                <span className='self-start text-[14px] leading-[17px] font-semibold'>
                    $
                </span>
                {carRent}
                <span className='self-end text-[14px] leading-[17px] font-medium'>
                    /day
                </span>
            </p>
            {/* End Car's make and model */}

            {/* Start Car's Image */}
            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
            </div>
            {/* End Car's Image */}

            {/* Start Car's main 3 features */}
            <div className='relative flex w-full mt-2'>
                <div className='flex w-full group-hover:invisible justify-between text-gray'>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/steering-wheel.svg" alt='steering-wheel' width={20} height={20} />
                        <p className='text-[14px] leading-[17px]'>{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/tire.svg" alt='tire' width={20} height={20} />
                        <p className='text-[14px] leading-[17px]'>{drive.toUpperCase()}</p>
                    </div>

                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src="/gas.svg" alt='gas' width={20} height={20} />
                        <p className='text-[14px] leading-[17px]'>{city_mpg} MPG</p>
                    </div>

                </div>

                {/*  Start Button which will display 'View More' to display a modal which will display all details of car */}
                <div className='hidden group-hover:flex absolute bottom-0 w-full z-10'>
                    <CustomButton
                        title="View More"
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
                {/* End 'Show More' Button which is inside Car's 3 main features section */}

            </div>
            {/* End Car's main 3 features */}

            {/* Start Car's Details Modal */}
            <CarDetails
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                car={car}
            />

        </div>
    )
}

export default CarCard;