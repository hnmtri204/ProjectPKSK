// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import RelatedDoctors from '../components/RelatedDoctors';
// import axios from 'axios';

// const Appointment = () => {
//   const { docId } = useParams();
//   const { doctors, setDoctors } = useContext(AppContext);
//   const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState('');

//   const fetchDocInfo = async () => {
//     const docInfo = doctors.find(doc => doc._id === docId);
//     setDocInfo(docInfo);
//   };

//   const getAvailableSlots = () => {
//     setDocSlots([]);

//     let today = new Date();
//     let dayOfWeek = today.getDay(); 

//     if (dayOfWeek === 0) dayOfWeek = 6; 
//     else dayOfWeek -= 1; 

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + (i + 1 - dayOfWeek)); 

//       let morningEndTime = new Date(currentDate);
//       morningEndTime.setHours(12, 0, 0, 0); 

//       let afternoonStartTime = new Date(currentDate);
//       afternoonStartTime.setHours(13, 0, 0, 0); 

//       let afternoonEndTime = new Date(currentDate);
//       afternoonEndTime.setHours(17, 0, 0, 0); 

//       const generateTimeSlots = (startTime, endTime) => {
//         let timeSlots = [];
//         while (startTime < endTime) {
//           let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//           timeSlots.push({
//             datetime: new Date(startTime),
//             time: formattedTime,
//           });

//           startTime.setMinutes(startTime.getMinutes() + 30);
//         }
//         return timeSlots;
//       };

//       let morningSlots = generateTimeSlots(new Date(currentDate.setHours(8, 0, 0, 0)), morningEndTime);
//       let afternoonSlots = generateTimeSlots(new Date(afternoonStartTime), afternoonEndTime);

//       setDocSlots((prev) => [...prev, [...morningSlots, ...afternoonSlots]]);
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/doctor/find-all');
//       setDoctors(response.data);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors(); // Fetch doctors when component mounts
//   }, []);

//   useEffect(() => {
//     fetchDocInfo();
//   }, [doctors, docId]);

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   return docInfo && (
//     <div>
//       {/* ----- Doctor Details ----- */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.user_id.image} alt="" />
//         </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           {/* ----- Doc Info : name, degree, experience ----- */}
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.user_id.name}
//             <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>Khoa : {docInfo.specialization_id.name}</p>
//           </div>

//           {/* ----- Doctor About ----- */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>Giới thiệu <img src={assets.info_icon} alt="" /></p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.description}</p>
//           </div>
//         </div>
//       </div>

//       {/* ----- Booking slots ----- */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Đặt chỗ</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item, index) => (
//               <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#00759c] text-white' : 'border border-gray-200'}`} key={index}>
//                 <p>{item[0] && daysOfWeek[index]}</p>
//                 <p>{item[0] && `${item[0].datetime.getDate()}/${item[0].datetime.getMonth() + 1}`}</p>
//               </div>
//             ))
//           }
//         </div>

//         {/* Hiển thị các buổi sáng và chiều */}
//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           <p onClick={() => setSlotTime('Buổi sáng')} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === 'Buổi sáng' ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}>
//             Buổi sáng
//           </p>
//           <p onClick={() => setSlotTime('Buổi chiều')} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === 'Buổi chiều' ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}>
//             Buổi chiều
//           </p>
//         </div>

//         <button className='bg-[#00759c] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Đặt lịch hẹn</button>
//       </div>

//       {/* ----- Listing Related Doctors ----- */}
//       <RelatedDoctors docId={docId} speciality={docInfo.specialization_id.name} />
//     </div>
//   );
// }

// export default Appointment;


// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, setDoctors } = useContext(AppContext);
  const daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots] = useState([]);
  const [setSchedule] = useState([]); // State to hold the doctor's schedule
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = () => {
    // ... (your existing code for generating slots)
  };

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/schedule/find-all?doctorId=${docId}`);
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/find-all');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors(); // Fetch doctors when component mounts
  }, []);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
      fetchSchedule(); // Fetch schedule when doctor info is available
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
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.user_id.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>Khoa : {docInfo.specialization_id.name}</p>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>Giới thiệu <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.description}</p>
          </div>
        </div>
      </div>

      {/* ----- Booking slots and Schedule ----- */}
      {/* ----- Booking slots ----- */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Đặt chỗ</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length > 0 ? docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#00759c] text-white' : 'border border-gray-200'}`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[index]}</p>
                <p>{item[0] && `${item[0].datetime.getDate()}/${item[0].datetime.getMonth() + 1}`}</p>
              </div>
            )) : (
              <p className='text-gray-500'>Không có lịch làm việc</p>
            )
          }
        </div>

        {/* Hiển thị các buổi sáng và chiều */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          <p
            onClick={() => setSlotTime('Buổi sáng')}
            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === 'Buổi sáng' ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}
          >
            Buổi sáng
          </p>
          <p
            onClick={() => setSlotTime('Buổi chiều')}
            className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${slotTime === 'Buổi chiều' ? 'bg-[#00759c] text-white' : 'text-gray-400 border border-gray-300'}`}
          >
            Buổi chiều
          </p>
        </div>

        <button className='bg-[#00759c] text-white text-sm font-light px-14 py-3 rounded-full my-6'>Đặt lịch hẹn</button>
      </div>

      {/* ----- Listing Related Doctors ----- */}
      <RelatedDoctors docId={docId} speciality={docInfo.specialization_id.name} />
    </div>
  );
};

export default Appointment;


