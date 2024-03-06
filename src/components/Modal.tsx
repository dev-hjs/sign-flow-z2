import React from "react";

interface ModalProps {
  isOpen: boolean;
  data: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, data, onClose }) => {
  if (!isOpen) return null;

  // 데이터 항목을 안전하게 문자열로 변환하는 함수
  const renderDataItem = (value: unknown) => {
    if (typeof value === "string" || typeof value === "number") {
      return value.toString();
    }
    return JSON.stringify(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold">회원가입 정보</h2>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              {key}: {renderDataItem(value)}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
