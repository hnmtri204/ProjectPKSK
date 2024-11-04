// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
    const [userData, setUserData] = useState({
        name: "",
        image: assets.profile_pic,
        email: "",
        phone: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/profilePatient', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    setErrorMessage('Có lỗi xảy ra: ' + errorText);
                    return;
                }

                const data = await response.json();
                setUserData({
                    name: data.user.name,
                    image: data.user.image || assets.profile_pic,
                    email: data.user.email,
                    phone: data.user.phone,
                });
            } catch (error) {
                setErrorMessage('Có lỗi xảy ra: ' + error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/updateProfilePatient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: userData.name,
                    phone: userData.phone,
                    email: userData.email,
                    oldPassword,   // gửi mật khẩu cũ
                    newPassword,   // gửi mật khẩu mới nếu có
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                setErrorMessage('Có lỗi xảy ra: ' + errorText);
                return;
            }

            setSuccessMessage('Thông tin đã được cập nhật thành công!');
            setErrorMessage('');
            setIsEdit(false);
            setOldPassword(""); // Reset mật khẩu cũ
            setNewPassword(""); // Reset mật khẩu mới
        } catch (error) {
            setErrorMessage('Có lỗi xảy ra: ' + error.message);
        }
    };

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            <p className='text-lg'>Chào mừng, {userData.name}!</p>
            <img className='w-36 rounded' src={userData.image} alt="Profile" />
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
                <p className='text-neutral-500 underline mt-3'>THÔNG TIN CHI TIẾT:</p>
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
                    
                    {isEdit && (
                        <>
                            {newPassword && (
                                <>
                                    <p className='font-medium'>Mật khẩu cũ:</p>
                                    <input
                                        className='bg-gray-100 max-w-52 border'
                                        type="password"
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)}
                                        placeholder="Nhập mật khẩu cũ"
                                    />
                                </>
                            )}
                            <p className='font-medium'>Mật khẩu mới:</p>
                            <input
                                className='bg-gray-100 max-w-52 border'
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                placeholder="Nhập mật khẩu mới"
                            />
                            <small className="text-neutral-500 italic">
                                Nhập mật khẩu cũ chỉ khi muốn đổi mật khẩu.
                            </small>
                        </>
                    )}
                </div>
                {isEdit && errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                {successMessage && <p className='text-green-500'>{successMessage}</p>}
            </div>
            <button
                onClick={() => {
                    if (isEdit) handleSave();
                    else setSuccessMessage('');
                    setIsEdit(!isEdit);
                }}
                className='bg-blue-500 text-white py-2 px-4 rounded'
            >
                {isEdit ? 'Lưu' : 'Chỉnh sửa'}
            </button>
        </div>
    );
};

export default MyProfile;
