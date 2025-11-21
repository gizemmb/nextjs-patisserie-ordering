import { React, useEffect } from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  useEffect(() => {
    // Modal açılınca scroll’u kapat
    document.body.style.overflow = "hidden";
    return () => {
      // Modal kapanınca scroll’u aç
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay: arkayı karart, tıklamayı engelle */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal kutusu */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-80 z-10">
        <p className="text-gray-800 mb-5">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded text-gray-800 bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
