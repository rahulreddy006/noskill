// components/ui/Button.jsx
export default function Button({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm bg-gray-200 text-black hover:bg-white transition"
    >
      {loading ? "Processing..." : children}
    </button>
  );
}