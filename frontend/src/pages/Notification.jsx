import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  const token = user?.token;

  if (!token) {
    navigate("/login");
    return;
  }

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:5000/notification", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data); // Giả sử data là một mảng các thông báo
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Thông báo của bạn</h1>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Không có thông báo nào.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            className="flex items-start border-b border-gray-300 py-2"
          >
            <img
              src={assets.notification_icon}
              alt="Notification"
              className="w-6 h-6 mr-3"
            />
            <div className="flex-1">
              <p className="font-medium">{notification.content}</p>
              <p className="text-xs text-gray-400">
                Ca khám: {notification.new_work_shift === "morning" ? "buổi sáng" : "buổi chiều"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationPage;
