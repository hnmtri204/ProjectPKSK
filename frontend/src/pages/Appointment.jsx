// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [slotTime, setSlotTime] = useState('');
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const fetchDoctorSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-schedule-doctor/${docId}`);
      setDoctorSchedule(response.data);
    } catch (error) {
      console.error('Error fetching doctor schedule:', error);
    }
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      fetchDoctorSchedule(); 
    }
  }, [docInfo]);

  return docInfo && (
    <div>
      {/* ----- Doctor Details ----- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.user_id.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ----- Doc Info : name, degree, experience ----- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.user_id.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>Khoa : {docInfo.specialization_id.name}</p>
          </div>

          {/* ----- Doctor About ----- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>Giới thiệu <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.description}</p>
          </div>
        </div>
      </div>

      {/* ----- Booking slots ----- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Đặt chỗ</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {doctorSchedule.map(schedule => {
            const date = new Date(schedule.work_date);
            const dayOfWeek = date.toLocaleDateString('vi-VN', { weekday: 'long' }); 
            return (
              <div
                key={schedule._id}
                className={`text-center py-6 min-w-16 rounded-full border cursor-pointer ${selectedDate === schedule._id ? 'bg-[#00759c] text-white' : 'border-gray-200'}`}
                onClick={() => setSelectedDate(schedule._id)} 
              >
                <p className={`text-gray-600 ${selectedDate === schedule._id ? 'text-white' : 'text-gray-600'}`}>
                  {dayOfWeek} 
                </p>
                <p className={`text-gray-600 ${selectedDate === schedule._id ? 'text-white' : 'text-gray-600'}`}>
                  {`${date.getDate()}/${date.getMonth() + 1}`}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hiển thị các buổi sáng và chiều */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {doctorSchedule
            .filter(schedule => schedule._id === selectedDate) 
            .map(schedule => (
              <p
                key={schedule._id}
                onClick={() => setSlotTime(schedule.work_shift === 'morning' ? 'Buổi sáng' : 'Buổi chiều')}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === (schedule.work_shift === 'morning' ? 'Buổi sáng' : 'Buổi chiều') ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}
              >
                {schedule.work_shift === 'morning' ? 'Buổi sáng' : 'Buổi chiều'}
              </p>
            ))}
        </div>

        <button className='bg-[#00759c] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Đặt lịch hẹn</button>
      </div>

      {/* ----- Listing Related Doctors ----- */}
      <RelatedDoctors docId={docId} speciality={docInfo.specialization_id.name} />
    </div>
  );
}

export default Appointment;
