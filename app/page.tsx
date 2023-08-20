'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils'
import { CarState } from '@/types';

export default function Home() {
  /* As we are going through a NextJs built-in error of setting scroll unset whenever url search params are changing. We have to make this page a client-side
  rendered. We were using server-side rendering before which is much better than client-side but because to make the usablity of website better we've to
  set that error which is only possible in changing this component into a client-side. we have make this a pure react component */
  const [allCars, setAllCars] = useState<CarState>([]);
  const [loading, setLoading] = useState(false);

  // search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  // filter state
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState(2022);

  // limit state
  const [limit, setLimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer.toLowerCase() || "",
        model: model.toLowerCase() || "",
        fuel: fuel.toLowerCase() || "",
        year: year || 2022,
        limit: limit || 10,
      });

      setAllCars(result);
    } catch {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, [fuel, year, limit, manufacturer, model]);

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 sm:px-16 px-6 py-4 max-width'>

        {/* Home Text Container */}
        <div className='flex flex-col items-start justify-start gap-y-2.5 text-black-100'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        {/* Filters */}
        <div className='mt-12 w-full flex-between items-center flex-wrap gap-5'>
          <SearchBar setManufacturer={setManufacturer} setModel={setModel} />

          <div className='flex justify-start flex-wrap items-center gap-2'>
            <CustomFilter options={fuels} setFilter={setFuel} />
            <CustomFilter options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14'>
              {allCars?.map((car, index) => (
                <CarCard car={car} key={`car-${index}`} />
              ))}
            </div>

            {loading && (
              <div className='mt-16 w-full flex justify-center items-center'>
                <Image
                  src="/loader.svg"
                  alt='loader'
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore
              pageNumber={limit/10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          !loading && (<div className='mt-16 flex justify-center items-center flex-col gap-2'>
            <h2 className='text-black text-xl font-bold'>Oops, no result!</h2>
            <p>{allCars?.message}</p>
          </div>
          )
        )}

      </div>
    </main>
  )
}
