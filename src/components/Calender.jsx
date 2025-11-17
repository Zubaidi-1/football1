// components/Calender.jsx
export default function DateRangePicker({ onChange }) {
  return (
    <div className="flex gap-4 items-center mb-6">
      <div className="flex flex-col text-white">
        <label className="text-sm">From</label>
        <input
          type="date"
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onChange={(e) => onChange("from", e.target.value)}
        />
      </div>

      <div className="flex flex-col text-white">
        <label className="text-sm">To</label>
        <input
          type="date"
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onChange={(e) => onChange("to", e.target.value)}
        />
      </div>
    </div>
  );
}
