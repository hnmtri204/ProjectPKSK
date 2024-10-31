// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'; 

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);

    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

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
                // Lưu người dùng vào context thay vì sessionStorage
                setUser(data.user);
                
                // Bạn vẫn có thể lưu vào sessionStorage nếu muốn
                sessionStorage.setItem('user', JSON.stringify(data.user));

                // Điều hướng dựa trên vai trò của người dùng
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
                const errorMessage = data.message || 'Đăng nhập thất bại!';
                alert(errorMessage);
            }
        } catch (error) {
            console.error('Error:', error);
            alert(`Đã xảy ra lỗi: ${error.message || 'Vui lòng thử lại sau.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Tạo tài khoản" : "Đăng nhập"}</p>
                <p>Vui lòng {state === 'Sign Up' ? "đăng ký" : "đăng nhập"} để đặt lịch hẹn</p>

                {state === "Sign Up" && (
                    <>
                        <div className='w-full'>
                            <p>Tên đầy đủ</p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
                        </div>
                        <div className='w-full'>
                            <p>Số điện thoại</p>
                            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="tel" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                        </div>
                    </>
                )}

                <div className='w-full'>
                    <p>Email</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                <div className='w-full relative'>
                    <p>Mật khẩu</p>
                    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} value={password} required />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm'
                    >
                        {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                </div>

                <button
                    className={`bg-primary text-white w-full py-2 rounded-md text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? "Đang xử lý..." : (state === 'Sign Up' ? "Tạo tài khoản" : "Đăng nhập")}
                </button>

                {state === "Sign Up"
                    ? <p>Đã có tài khoản? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Đăng nhập tại đây</span></p>
                    : <p>Tạo một tài khoản mới? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>bấm vào đây</span></p>
                }
            </div>
        </form>
    );
}

export default Login;