// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const MyProfile = () => {
    const { user, setUser } = useContext(AppContext);
    const [userData, setUserData] = useState({
        name: "",
        image: assets.profile_pic,
        email: "",
        phone: "",
        gender: "Male",
        dob: "",
        password: "" // Thêm trường password
    });
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Cập nhật userData khi user thay đổi
    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name,
                image: assets.profile_pic,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                dob: user.dob,
                password: "" // Đặt password mặc định là rỗng khi hiển thị
            });
        }
    }, [user]);

    // Hàm lưu thông tin người dùng
    const handleSave = async () => {
        if (!user) {
            setErrorMessage('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
            return; // Ngừng thực hiện nếu người dùng chưa xác thực
        }
    
        try {
            console.log('User Data to Update:', userData); // Ghi lại dữ liệu để kiểm tra
            const response = await fetch('http://localhost:5000/updateProfilePatient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}` // Thêm token vào header
                },
                body: JSON.stringify(userData), // Chuyển đổi userData thành JSON
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Response:', errorData); // Ghi lại phản hồi từ server
                setErrorMessage(errorData.message || 'Failed to update profile');
                return; // Ngừng thực hiện nếu có lỗi
            }
    
            const updatedUser = await response.json();
            setUser(updatedUser);
            sessionStorage.setItem('userData', JSON.stringify(updatedUser));
            setIsEdit(false);
            setErrorMessage("");
        } catch (error) {
            console.error('Error updating user profile:', error);
            setErrorMessage('Có lỗi xảy ra: ' + error.message); // Hiển thị thông báo lỗi cụ thể
        }
    };

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (!user) {
        return <p className='text-red-500'>Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.</p>;
    }

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <p className='text-lg'>Welcome, {user.name}!</p>
            <img className='w-36 rounded' src={userData.image || assets.profile_pic} alt="Profile" />
            {isEdit ? (
                <input
                    className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} // Cập nhật tên
                />
            ) : (
                <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            )}
            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div>
                <p className='text-neutral-500 underline mt-3'>THÔNG TIN LIÊN HỆ</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    {isEdit ? (
                        <input
                            className='bg-gray-100 max-w-52'
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} // Cập nhật email
                        />
                    ) : (
                        <p>{userData.email}</p>
                    )}
                    <p className='font-medium'>Số điện thoại:</p>
                    {isEdit ? (
                        <input
                            className='bg-gray-100 max-w-52'
                            type="tel"
                            value={userData.phone}
                            onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} // Cập nhật số điện thoại
                        />
                    ) : (
                        <p>{userData.phone}</p>
                    )}
                </div>
                {isEdit && errorMessage && <p className='text-red-500'>{errorMessage}</p>} {/* Hiển thị thông báo lỗi */}
            </div>
            <button
                onClick={() => {
                    if (isEdit) handleSave(); // Gọi hàm lưu nếu đang ở chế độ chỉnh sửa
                    setIsEdit(!isEdit); // Đổi trạng thái chỉnh sửa
                }}
                className='bg-blue-500 text-white rounded-md py-2 mt-4'
            >
                {isEdit ? 'Lưu' : 'Chỉnh sửa'}
            </button>
        </div>
    );
};

export default MyProfile;
