import React from 'react'
import Greeting from '../Greeting'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='flex flex-col space-y-5'>
        <span><Greeting /> I'm</span>
        <p className='text-3xl font'>Femi Ajanaku</p>
    </div>
  )
}

export default Hero