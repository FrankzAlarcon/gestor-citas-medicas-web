import React from 'react'
import Option from '../components/home/Option'
import { options } from '../components/home/options'

const Home = () => {

  return (
    <div>
      <section className='flex flex-col gap-4 mt-10 px-2 max-w-2xl md:px-20'>
        {
          options.map((option) => (
            <Option key={option.title} option={option} />
          ))
        }
      </section>
    </div>
  )
}

export default Home