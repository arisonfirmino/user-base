const Input = ({ label, placeholder, icon, register, error }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-lg text-primary">{label}</label>
      <div
        className={`flex items-center gap-2.5 rounded-lg border border-solid p-2.5 ${error ? "border-red-600" : "border-primary"}`}
      >
        <span className="text-gray-400">{icon}</span>
        <input
          type="text"
          placeholder={placeholder}
          {...register}
          className="w-full overflow-hidden text-ellipsis text-nowrap bg-transparent outline-none"
        />
      </div>

      {error && <p className="ml-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
