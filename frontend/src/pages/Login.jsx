// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate(); 
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const url = state === 'Sign Up' ? 'http://localhost:5000/patient/create' : 'http://localhost:5000/login';

    const requestBody = {
      email,
      password,
      ...(state === 'Sign Up' && { name, phone }) 
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); 
        
        switch (data.user.role) {
          case 'user':
            navigate('/'); 
            break;
          case 'doctor':
            navigate('/admindoctor'); 
            break;
          case 'admin':
            navigate('/dashboard'); 
            break;
          default:
            navigate('/'); 
        }
      } else {
        alert(data.message || 'Đăng nhập thất bại!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Tạo tài khoản" : "Đăng nhập"}</p>
        <p>Vui lòng {state === 'Sign Up' ? "đăng ký" : "đăng nhập"} để đặt lịch hẹn</p>

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Tên đầy đủ</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        {
          state === "Sign Up" && <div className='w-full'>
            <p>Số điện thoại</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="tel" onChange={(e) => setPhone(e.target.value)} value={phone} required />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Mật khẩu</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Tạo tài khoản" : "Đăng nhập"}</button>
        {
          state === "Sign Up"
            ? <p>Đã có tài khoản? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Đăng nhập tại đây</span></p>
            : <p>Tạo một tài khoản mới? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>bấm vào đây</span></p>
        }
      </div>
    </form>
  )
}

export default Login; 