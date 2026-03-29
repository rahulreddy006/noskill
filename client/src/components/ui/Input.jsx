// components/ui/Input.jsx
export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm bg-[#020617] border border-gray-700 focus:outline-none"
    />
  );
}