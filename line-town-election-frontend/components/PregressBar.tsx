const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`${
          percentage > 15 ? "text-white" : "text-gray-600"
        } bg-primary text-xs font-medium  text-center p-0.5 leading-none rounded-l-full`}
        style={{ width: `${percentage}%` }}
      >
        {percentage.toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressBar;
