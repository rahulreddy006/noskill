// components/ui/Badge.jsx
export default function Badge({ type, children }) {
  return (
    <span
      className={`text-xs px-2 py-1 ${
        type === "success"
          ? "bg-gray-200 text-black"
          : "bg-gray-800 text-gray-300"
      }`}
    >
      {children}
    </span>
  );
}