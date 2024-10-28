// eslint-disable-next-line no-unused-vars
import React from 'react'
import { assets } from '../assets/assets'
import HomepageBanner from '../assets/Homepage-Banner.jpg';

const Header1 = () => {
    return (
        <div 
            className='flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20'
            style={{ backgroundImage: `url(${HomepageBanner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            {/* ----- Left Side ----- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-[#00759c]' style={{ marginLeft: '-300px' }}>
                Đặt lịch hẹn <br /> Với bác sĩ đáng tin cậy
                </p>
                <div className='flex flex-col md:flex-row items-start gap-3 text-[#00759c]' style={{ marginLeft: '-300px' }}>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Với các bác sĩ đáng tin cậy, <br className='hidden sm:block' /> lên lịch cuộc hẹn của bạn một cách dễ dàng.</p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-[#00759c] text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300 text-[#00759c]' style={{ marginLeft: '-300px' }}>
                    Đặt lịch hẹn <img className='w-3' src={assets.arrow_icon} alt="" />
                </a>
            </div>
        </div>
    )
}

export default Header1
