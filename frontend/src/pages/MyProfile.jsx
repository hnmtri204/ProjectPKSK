// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "",
        image: assets.profile_pic,
        email: "",
        phone: "",
        password: ""
    });
    const [isEdit, setIsEdit] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage] = useState("");

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setUserData({
                name: user.name,
                image: assets.profile_pic,
                email: user.email,
                phone: user.phone,
                password: ""
            });
        } else {
            setErrorMessage('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
        }
    }, []);

    const handleSave = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (!user) {
            setErrorMessage('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
            return;
        }

        try {
            console.log('Sending request to update profile...'); // Log thông báo
            const response = await fetch(`http://localhost:5000/updateProfilePatient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    id: user.id,
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                }),
            });

            console.log('Response status:', response.status); // Log trạng thái phản hồi

            if (!response.ok) {
                const errorText = await response.text();
                setErrorMessage('Có lỗi xảy ra: ' + errorText);
                return;
            }

            const updatedUserData = await response.json();
            sessionStorage.setItem('user', JSON.stringify(updatedUserData));
            setIsEdit(false);
            setErrorMessage("Cập nhật thành công!");
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra: ' + error.message);
            console.error('Error during fetch:', error);
        }
    };


    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <p className='text-lg'>Chào mừng, {userData.name}!</p>
            <img className='w-36 rounded' src={userData.image || assets.profile_pic} alt="Profile" />
            {isEdit ? (
                <input
                    className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
            ) : (
                <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
            )}
            <hr className='bg-zinc-400 h-[1px] border-none' />
            <div>
                <p className='text-neutral-500 underline mt-3'>THÔNG TIN LIÊN HỆ</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email:</p>
                    {isEdit ? (
                        <input
                            className='bg-gray-100 max-w-52'
                            type="email"
                            value={userData.email}
                            onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
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
                            onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                    ) : (
                        <p>{userData.phone}</p>
                    )}
                </div>
                {isEdit && errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                {successMessage && <p className='text-green-500'>{successMessage}</p>}
            </div>
            <button
                onClick={() => {
                    if (isEdit) handleSave();
                    setIsEdit(!isEdit);
                }}
                className='bg-blue-500 text-white rounded-md py-2 mt-4'
            >
                {isEdit ? 'Lưu' : 'Chỉnh sửa'}
            </button>
        </div>
    );
};

export default MyProfile;
