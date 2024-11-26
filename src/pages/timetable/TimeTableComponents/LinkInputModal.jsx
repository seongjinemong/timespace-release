import React from "react";
import ShadowBox from "../../../components/ShadowBox";

const LinkInputModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
      style={{ zIndex: 50 }} // 모달을 항상 최상단에 두기 위한 z-index 설정
    >
      <ShadowBox width="w-800">
        <div className="relative bg-white w-[400px] p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-black">
              에타에서 가져오기
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 font-bold hover:text-gray-700"
            >
              X
            </button>
          </div>
          <div className="space-y-4 text-center">
            <input
              type="text"
              placeholder="공유 링크"
              className="text-black bg-white w-full p-2 border border-gray-300 rounded"
            />

            <div className="flex justify-center">
              <ShadowBox width="w-[200px]" padding="">
                <button className="font-semibold w-full py-2 bg-white text-gray-700 rounded-lg active:translate-y-1 active:shadow-none">
                  시간표에 추가
                </button>
              </ShadowBox>
            </div>
          </div>
        </div>
      </ShadowBox>
    </div>
  );
};

export default LinkInputModal;
