import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { user } = useContext(AppContext); // Removed `doctors` since it's not needed here
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = user?.token; // Lấy token từ appcontext

      if (!token) {
        setError("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user-appointment", {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào headers
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("User not authenticated. Please log in.");
            navigate("/login");
          } else {
            throw new Error("Failed to fetch appointments");
          }
        } else {
          const data = await response.json();
          setAppointments(data); // Giả sử dữ liệu là mảng các lịch hẹn
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("An error occurred while fetching appointments.");
      }
    };

    fetchAppointments();
  }, [navigate, user?.token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        Lịch hẹn của tôi
      </p>
      <div>
        {/* Hiển thị danh sách các lịch hẹn */}
        {appointments.map((appointment, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                Bệnh nhân ID: {appointment.patient_id}
              </p>
              <p>Bác sĩ ID: {appointment.doctor_id}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Ngày:
                </span>{" "}
                {new Date(appointment.work_date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Ca làm việc:
                </span>{" "}
                {appointment.work_shift === "morning" ? "Buổi sáng" : "Buổi chiều"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Thanh toán trực tuyến
              </button>
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                Hủy cuộc hẹn
              </button>
            </div>
          </div>
        ))}
        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default MyAppointments;
