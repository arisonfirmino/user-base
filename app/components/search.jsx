import { SearchIcon } from "lucide-react";

const Search = ({ handleSearch }) => {
  return (
    <form>
      <div className="flex items-center gap-2.5 rounded-lg border border-solid border-primary px-2.5 py-1.5">
        <SearchIcon size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={handleSearch}
          className="w-full overflow-hidden text-ellipsis text-nowrap bg-transparent outline-none"
        />
      </div>
    </form>
  );
};

export default Search;
