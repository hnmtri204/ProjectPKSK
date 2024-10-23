// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from 'react-router-dom'
import banner_network from '../assets/banner_network.png';

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'
        style={{ backgroundImage: `url(${banner_network})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* ----- Left Side ----- */}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-[#00759c]' style={{ marginLeft: '-70px'}}>
                    <p>Đặt lịch hẹn</p>
                    <p className='mt-4'>Với hơn 100 bác sĩ</p>
                    <p className='mt-4'> đáng tin cậy</p>
                </div>
                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all' style={{ color: '#00759c', marginLeft: '-70px'}}>Tạo tài khoản</button>
            </div>
        </div>
    )
}

export default Banner