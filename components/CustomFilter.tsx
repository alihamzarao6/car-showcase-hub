'use client';

import { useState, Fragment } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Transition, Listbox } from '@headlessui/react';

import { CustomFilterProps } from '@/types';


export default function CustomFilter<T>({ options, setFilter }: CustomFilterProps<T>) {
  const [menu, setMenu] = useState(options[0]);

  return (
    <div className='w-fit'>
      <Listbox
        value={menu}
        onChange={(e) => {
          setMenu(e)
          setFilter(e.value as unknown as T) // updating just value of filter not their title
        }}
      >

        <div className='relative w-fit z-10'>

          <Listbox.Button className='relative w-full min-w-[127px] flex justify-between items-center cursor-default rounded-lg bg-white py-2 px-3 text-left shadow-md sm:text-sm border'>
            <span className='block truncate'>
              {menu.title}
            </span>

            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt='chevron up down'
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>

              {options.map((option) => (
                <Listbox.Option value={option} key={option.title} className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? ' bg-primary-blue text-white' : 'text-gray'}`}>

                  {({ selected }) => (
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.title}
                    </span>
                  )}

                </Listbox.Option>
              ))}

            </Listbox.Options>

          </Transition>

        </div>

      </Listbox>
    </div>
  )
}
