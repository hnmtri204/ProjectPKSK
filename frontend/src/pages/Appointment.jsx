import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, user } = useContext(AppContext);
  if (!user) {
    return <div className="text-center text-2xl mt-10 text-gray-500">Bạn phải đăng nhập</div>;
  }

  const [docInfo, setDocInfo] = useState(null);
  const [slotTime, setSlotTime] = useState("");
  const [doctorSchedule, setDoctorSchedule] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const fetchDoctorSchedule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get-schedule-doctor/${docId}`
      );
      const groupedSchedule = response.data.reduce((acc, schedule) => {
        const dateStr = new Date(schedule.work_date)
          .toISOString()
          .split("T")[0];
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(schedule);
        return acc;
      }, {});
      setDoctorSchedule(groupedSchedule);
    } catch (error) {
      console.error("Error fetching doctor schedule:", error);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      fetchDoctorSchedule();
    }
  }, [docInfo]);

  // Reset slotTime khi selectedDate thay đổi
  useEffect(() => {
    setSlotTime("");
  }, [selectedDate]);

  const handleBooking = async () => {
    if (slotTime) {
      const confirmation = window.confirm(
        "Bạn có chắc chắn muốn đặt lịch hẹn không?"
      );
      if (confirmation) {
        try {
          const patientId = user.id;
          const token = user?.token || "";
          // Tìm lịch làm việc phù hợp để lấy work_date
          const selectedSchedule = doctorSchedule[selectedDate].find(
            (schedule) =>
              (schedule.work_shift === "morning" && slotTime === "Buổi sáng") ||
              (schedule.work_shift === "afternoon" && slotTime === "Buổi chiều")
          );

          if (selectedSchedule && patientId) {
            const appointmentData = {
              patient_id: patientId,
              doctor_id: docId,
              work_shift: selectedSchedule.work_shift,
              work_date: selectedSchedule.work_date,
            };

            // Gửi yêu cầu tạo lịch hẹn đến API với headers
            const response = await axios.post(
              "http://localhost:5000/create-appointment",
              appointmentData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            alert("Đặt lịch hẹn thành công!");
          } else {
            alert("Không tìm thấy lịch hẹn hoặc thông tin bệnh nhân.");
          }
        } catch (error) {
          console.error("Error creating appointment:", error);
          alert("Có lỗi xảy ra khi đặt lịch hẹn. Vui lòng thử lại.");
        }
      }
    } else {
      alert("Vui lòng chọn ca làm việc trước khi đặt lịch hẹn.");
    }
  };

  return (
    docInfo && (
      <div>
        {/* ----- Doctor Details ----- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.user_id.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              Name : {docInfo.user_id.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>Chuyên Khoa : {docInfo.specialization_id.name}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                Giới thiệu <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.description}
              </p>
            </div>
          </div>
        </div>

        {/* ----- Booking slots ----- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Lịch làm việc của bác sĩ:</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {Object.keys(doctorSchedule).map((dateStr) => {
              const date = new Date(dateStr);
              const dayOfWeek = date.toLocaleDateString("vi-VN", {
                weekday: "long",
              });
              return (
                <div
                  key={dateStr}
                  className={`text-center py-6 min-w-16 rounded-full border cursor-pointer ${
                    selectedDate === dateStr
                      ? "bg-[#00759c] text-white"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <p
                    className={`text-gray-600 ${
                      selectedDate === dateStr ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {dayOfWeek}
                  </p>
                  <p
                    className={`text-gray-600 ${
                      selectedDate === dateStr ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {`${date.getDate()}/${date.getMonth() + 1}`}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Hiển thị các buổi sáng và chiều theo ngày */}
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {selectedDate &&
              doctorSchedule[selectedDate].map((schedule) => (
                <p
                  key={schedule._id}
                  onClick={() =>
                    setSlotTime(
                      schedule.work_shift === "morning"
                        ? "Buổi sáng"
                        : "Buổi chiều"
                    )
                  }
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    slotTime ===
                    (schedule.work_shift === "morning"
                      ? "Buổi sáng"
                      : "Buổi chiều")
                      ? "bg-[#00759c] text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                >
                  {schedule.work_shift === "morning"
                    ? "Buổi sáng"
                    : "Buổi chiều"}
                </p>
              ))}
          </div>

          <button
            onClick={handleBooking}
            className="bg-[#00759c] text-white text-sm font-light px-14 py-3 rounded-full my-6"
          >
            Đặt lịch hẹn
          </button>
        </div>

        {/* ----- Listing Related Doctors ----- */}
        <RelatedDoctors
          docId={docId}
          speciality={docInfo.specialization_id.name}
        />
      </div>
    )
  );
};

export default Appointment;
