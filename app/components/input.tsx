interface InputProps {
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  register: any;
  error: string | undefined;
  emailExists?: boolean;
}

export default function Input({
  label,
  placeholder,
  icon,
  register,
  error,
  emailExists,
}: InputProps) {
  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-lg">{label}</label>

      <div
        className={`flex w-full items-center gap-2.5 rounded-lg bg-black bg-opacity-50 p-2.5 ${error ? "border border-solid border-red-600 border-opacity-50" : ""}`}
      >
        <span className="text-gray-400">{icon}</span>
        <input
          type="text"
          placeholder={placeholder}
          {...register}
          className="w-full overflow-hidden text-ellipsis text-nowrap bg-transparent outline-none"
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
      {emailExists ? (
        <p className="text-xs text-red-600">Este email já está em uso.</p>
      ) : (
        ""
      )}
    </div>
  );
}
