import React, { useState, useEffect } from "react";
import ShadowBox from "../../../components/ShadowBox";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const timeOptions = Array.from({ length: 21 }, (_, i) => {
  const hour = 9 + Math.floor(i / 2); // 09:00 ~ 21:00
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour}:${minutes}`;
});

const convertTimeToMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

const DirectAddModal = ({ isOpen, onClose, onAddSubject }) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("월");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");

  // 모달이 열릴 때 상태를 초기화
  useEffect(() => {
    if (isOpen) {
      setName("");
      setDay("월");
      setStartTime("09:00");
      setEndTime("11:00");
    }
  }, [isOpen]);


  const generateRandomColor = () => {
    const colors = [
      "bg-red-200",
      "bg-green-200",
      "bg-blue-200",
      "bg-yellow-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-indigo-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleSubmit = () => {
    const dayIndex = (days.indexOf(day) + 1) % days.length; // 요일을 하루 뒤로 이동
    const adjustedDay = days[dayIndex];

    const newSubject = {
      name,
      day: adjustedDay,
      startTime: convertTimeToMinutes(startTime),
      endTime: convertTimeToMinutes(endTime),
      color: generateRandomColor(), // 랜덤 색상 추가
    };

    onAddSubject(newSubject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <ShadowBox width="w-[400px]" padding="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-lg font-bold text-black">과목 추가</h2>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="과목 이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white w-full p-2 border border-gray-300 rounded text-black"
            />
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="bg-white w-full p-2 border border-gray-300 rounded text-black"
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <div className="flex space-x-4">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="bg-white w-1/2 p-2 border border-gray-300 rounded text-black"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="bg-white w-1/2 p-2 border border-gray-300 rounded text-black"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <ShadowBox width="w-auto" padding="">
              <button
                onClick={onClose}
                className="px-4 py-2 text-black font-semibold rounded-lg active:translate-y-1 active:shadow-none"
              >
                취소
              </button>
            </ShadowBox>
            <ShadowBox width="w-auto" padding="">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-seagull-400 text-white font-semibold rounded-lg active:translate-y-1 active:shadow-none"
              >
                추가
              </button>
            </ShadowBox>
          </div>
        </div>
      </ShadowBox>
    </div>
  );
};

export default DirectAddModal;
