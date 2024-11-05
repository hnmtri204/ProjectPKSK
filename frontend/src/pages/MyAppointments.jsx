// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { user } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = user?.token;

      if (!token) {
        setError("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/user-appointment", {
          headers: {
            Authorization: `Bearer ${token}`,
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
          console.log(data); 
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("An error occurred while fetching appointments.");
      }
    };

    fetchAppointments();
  }, [navigate, user?.token]);

  const handleCancelAppointment = async (appointmentId) => {
    const token = user?.token;

    if (!token) {
      setError("User not authenticated. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/cancel-appointment/${appointmentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to cancel appointment");
      }

      setAppointments((prev) => prev.filter((appointment) => appointment._id !== appointmentId));
    } catch (error) {
      console.error("Error canceling appointment:", error);
      setError("Bạn chỉ huỷ cuộc hẹn trước 24h.");
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        Lịch hẹn của tôi:
      </p>
      <div>
        {appointments.map((appointment) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={appointment._id}
          >
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                Bệnh nhân: {appointment.patient_id.user_id.name}
              </p>
              <p className="text-neutral-800 font-semibold">
                Bác sĩ: {appointment.doctor_id.user_id.name}
              </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Ngày khám:
                </span>{" "}
                {new Date(appointment.work_date).toLocaleDateString("vi-VN")}
              </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Ca khám:
                </span>{" "}
                {appointment.work_shift === "morning"
                  ? "Buổi sáng"
                  : "Buổi chiều"}
              </p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Trạng thái:
                </span>{" "}
                {appointment.status === "pending" ? "Đang chờ" : "Đã xác nhận"}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Thanh toán trực tuyến
              </button>
              <button
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                onClick={() => handleCancelAppointment(appointment._id)}
              >
                Hủy cuộc hẹn
              </button>
            </div>
          </div>
        ))}
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;