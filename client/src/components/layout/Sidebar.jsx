// components/layout/Sidebar.jsx
export default function Sidebar() {
  return (
    <div className="w-56 border-r border-gray-800 bg-[#020617] p-6 flex flex-col">

      <h2 className="text-lg font-semibold mb-8 tracking-tight">
        SkillAI
      </h2>

      <nav className="space-y-4 text-sm text-gray-400">
        <p className="hover:text-white cursor-pointer">Dashboard</p>
        <p className="hover:text-white cursor-pointer">Analyze</p>
        <p className="hover:text-white cursor-pointer">History</p>
      </nav>

    </div>
  );
}