// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['Thứ 6', 'Thứ 7', 'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // Getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let morningEndTime = new Date(currentDate);
      morningEndTime.setHours(12, 0, 0, 0); // End of the morning session at 12 PM

      let afternoonStartTime = new Date(currentDate);
      afternoonStartTime.setHours(13, 0, 0, 0); // Start of the afternoon session at 1 PM

      let afternoonEndTime = new Date(currentDate);
      afternoonEndTime.setHours(17, 0, 0, 0); // End of the afternoon session at 5 PM

      // Function to generate slots within a given time period
      const generateTimeSlots = (startTime, endTime) => {
        let timeSlots = [];
        while (startTime < endTime) {
          let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          // Add slot to array
          timeSlots.push({
            datetime: new Date(startTime),
            time: formattedTime,
          });

          // Increment current time by 30 minutes
          startTime.setMinutes(startTime.getMinutes() + 30);
        }
        return timeSlots;
      };

      // Generate morning and afternoon slots
      let morningSlots = generateTimeSlots(new Date(currentDate.setHours(8, 0, 0, 0)), morningEndTime);
      let afternoonSlots = generateTimeSlots(new Date(afternoonStartTime), afternoonEndTime);

      // Merge morning and afternoon slots for the current date
      setDocSlots((prev) => [...prev, [...morningSlots, ...afternoonSlots]]);
    }
  };

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* ----- Doctor Details ----- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ----- Doc Info : name, degree, experience ----- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>

          {/* ----- Doctor About ----- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>Giới thiệu <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Phí hẹn: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ----- Booking slots ----- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Đặt chỗ</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#00759c] text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        {/* Hiển thị các buổi sáng và chiều */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          <p onClick={() => setSlotTime('Buổi sáng')} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === 'Buổi sáng' ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}>
            Buổi sáng
          </p>
          <p onClick={() => setSlotTime('Buổi chiều')} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === 'Buổi chiều' ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}>
            Buổi chiều
          </p>
        </div>

        <button className='bg-[#00759c] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Đặt lịch hẹn</button>
      </div>

      {/* ----- Listing Related Doctors ----- */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment
