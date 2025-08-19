export const Counter = ({ label, count }) => {
  return (
    <div className="mt-2 flex w-fit items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-sm">
      <span className="text-white">{label} =</span>
      <span className="font-bold text-green">{count}</span>
    </div>
  )
}