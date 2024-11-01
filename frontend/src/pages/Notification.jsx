// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Assuming you have an assets folder with images

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('http://localhost:5000/notification/find-all');
                if (!response.ok) {
                    throw new Error('Failed to fetch notifications');
                }
                const data = await response.json();
                setNotifications(data); // Giả sử data là một mảng các thông báo
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-2xl font-semibold mb-4'>Thông báo của bạn</h1>
            {notifications.length === 0 ? (
                <p className='text-gray-500'>Không có thông báo nào.</p>
            ) : (
                notifications.map((notification) => (
                    <div key={notification._id} className='flex items-start border-b border-gray-300 py-2'>
                        <img src={assets.notification_icon} alt="Notification" className='w-6 h-6 mr-3' />
                        <div className='flex-1'>
                            <p className='font-medium'>{notification.content}</p>
                            <p className='text-xs text-gray-400'>{new Date(notification.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default NotificationPage;
