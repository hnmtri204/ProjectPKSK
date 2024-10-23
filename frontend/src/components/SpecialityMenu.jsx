// eslint-disable-next-line no-unused-vars
import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
            <h1 className='text-3xl font-medium'>Tìm theo chuyên ngành</h1>
            <p className='sm:w-1/3 text-center text-sm'>Chỉ cần duyệt qua danh sách rộng lớn các bác sĩ đáng tin cậy của chúng tôi, lên lịch hẹn một cách dễ dàng.</p>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                {specialityData.map((item, index)=>(
                    <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                        <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                        <p>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu

