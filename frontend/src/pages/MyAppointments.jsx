// // eslint-disable-next-line no-unused-vars
// import React, { useContext } from 'react'
// import { AppContext } from '../context/AppContext'

// const MyAppointments = () => {

//   const { doctors } = useContext(AppContext)

//   return (
//     <div>
//       <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>Lịch hẹn của tôi</p>
//       <div>
//         {/* slice hiển thị số người muốn hiển thị bắt đầu người thứ nhất đến n (), 3(4,5,...) */}
//         {doctors.slice(0, 3).map((item, index) => (
//           <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
//             <div>
//               <img className='w-32 bg-indigo-50' src={item.image} alt="" />
//             </div>
//             <div className='flex-1 text-sm text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'>{item.name}</p>
//               <p>{item.speciality}</p>
//               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Ngày & Giờ:</span> 25, July, 2024 |  8:30 PM</p>
//             </div>
//             <div></div>
//             <div className='flex flex-col gap-2 justify-end'>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Thanh toán trực tuyến</button>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Hủy cuộc hẹn</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default MyAppointments


// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/user-appointment');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data); // Giả sử dữ liệu trả về là mảng lịch hẹn
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>Lịch hẹn của tôi</p>
      <div>
        {appointments.slice(0, 3).map((appointment, index) => {
          // Lấy thông tin bác sĩ từ context hoặc từ API
          const doctor = doctors.find(doc => doc._id === appointment.doctor_id);
          return (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={doctor?.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{doctor?.name}</p>
                <p>{doctor?.speciality}</p>
                <p className='text-xs mt-1'>
                  <span className='text-sm text-neutral-700 font-medium'>Ngày & Giờ:</span> {new Date(appointment.work_date).toLocaleDateString()} | {appointment.work_shift === 'afternoon' ? '2:00 PM' : '8:30 PM'}
                </p>
              </div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Thanh toán trực tuyến</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Hủy cuộc hẹn</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;