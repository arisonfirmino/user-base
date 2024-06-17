import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <form className="flex items-center gap-2.5 rounded-xl bg-gray-200 px-2.5 py-1.5">
      <button type="button" className="text-gray-400">
        <SearchIcon size={16} />
      </button>

      <input
        type="text"
        className="bg-transparent text-black outline-none"
        placeholder="Pesquisar"
      />
    </form>
  );
}
