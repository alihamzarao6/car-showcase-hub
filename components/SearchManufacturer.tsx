'use client'

import { Fragment, useState } from 'react';

import Image from 'next/image';

import { Combobox, Transition } from '@headlessui/react';

import { SearchManufacturerProps } from '@/types';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('');

  const filteredManufacturers = query === ''
    ? manufacturers
    : manufacturers.filter((item) => (
      item.toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    ))

  return (
    <div className='flex-1 max-sm:w-full flex justify-start items-center'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative w-full'>
          <Combobox.Button className='absolute top-[14px]'>
            <Image
              src='/car-logo.svg'
              alt='Car Logo'
              width={20}
              height={20}
              className='ml-4'
            />
          </Combobox.Button>

          <Combobox.Input
            className="w-full h-[48px] pl-12 p-4 rounded-l-full max-sm:rounded-full bg-light-white outline-none cursor-pointer text-sm"
            placeholder='Volkswagen'
            displayValue={(item: string) => item}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm' static>
              {
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    value={item}
                    className={({ active }) => `
                  relative cursor-default select-none py-2 pl-10 pr-4 
                  ${active ? 'bg-primary-blue text-white' : 'text-gray-900f'}`}
                  // this callback in className is provided by Combobox and we are destructuring 'active' prop
                  >
                    {/* Below given code is directly copied from headless ui website */}
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              }

            </Combobox.Options>
          </Transition>

        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer