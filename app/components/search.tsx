import { SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

interface SearchProps {
  setSearchQuery: (query: string) => void;
}

export default function Search({ setSearchQuery }: SearchProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex items-center gap-2.5 rounded-xl bg-gray-200 px-2.5 py-1.5"
    >
      <button type="button" className="text-gray-400">
        <SearchIcon size={16} />
      </button>

      <input
        type="text"
        placeholder="Pesquisar"
        onChange={handleInputChange}
        className="bg-transparent text-black outline-none"
      />
    </form>
  );
}
