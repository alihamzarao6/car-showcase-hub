import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils'

export default async function Home({ searchParams }: HomeProps) {
  /* As we are going through a NextJs built-in error of setting scroll unset whenever url search params are changing. We have to make this page a client-side
  rendered. We were using server-side rendering before which is much better than client-side but because to make the usablity of website better we've to
  set that error which is only possible in changing this component into a client-side. */

  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || '',
  });


  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

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
          <SearchBar />

          <div className='flex justify-start flex-wrap items-center gap-2'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14'>
              {allCars.map((car, index) => (
                <CarCard car={car} key={`car-${index}`} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length} // if it returns 'false' it means there is Next page present and if it returns 'true' it means there is next page present.
            />
          </section>
        ) : (
          <div className='mt-16 flex justify-center items-center flex-col gap-2'>
            <h2 className='text-black text-xl font-bold'>Oops, no result!</h2>
          </div>
        )}

      </div>
    </main>
  )
}
