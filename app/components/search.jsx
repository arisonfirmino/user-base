import { SearchIcon } from "lucide-react";

const Search = () => {
  return (
    <form>
      <div className="border-primary flex items-center gap-2.5 rounded-lg border border-solid px-2.5 py-1.5">
        <SearchIcon size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full overflow-hidden text-ellipsis text-nowrap bg-transparent outline-none"
        />
      </div>
    </form>
  );
};

export default Search;
