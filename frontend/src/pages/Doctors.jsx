// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]); 
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/doctor/find-all');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/specialization/find-all');
      setSpecializations(response.data);
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.specialization_id.name === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    fetchDoctors(); 
    fetchSpecializations();
  }, []);

  useEffect(() => {
    applyFilter(); 
  }, [doctors, speciality]);

  return (
    <div>
      <p className='text-gray-600'>Duyệt qua các bác sĩ chuyên khoa.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {specializations.map(spec => (
            <p
              key={spec._id}
              onClick={() => speciality === spec.name ? navigate('/doctors') : navigate(`/doctors/${spec.name}`)}
              className={`w-[94vw] sm:w-40 pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec.name ? "bg-indigo-100 text-black" : ""}`}>
              {spec.name}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.user_id.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-[#00759c]'>
                    <p className='w-2 h-2 bg-[#00759c] rounded-full'></p><p>Đặt lịch</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.user_id.name}</p>
                  <p className='text-gray-600 text-sm'>{item.specialization_id ? item.specialization_id.name : 'Chưa có chuyên khoa'}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Doctors;
