export default function PopupModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md animate-fadeIn">
        
        {children}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
}
