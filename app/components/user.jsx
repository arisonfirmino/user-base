import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPinnedIcon } from "lucide-react";

const User = ({ name, lastName, email, location, created_at }) => {
  const date = parseISO(created_at);

  const formattedDate = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="flex w-full flex-col gap-1.5 rounded-xl bg-white p-5 text-primary shadow-md">
      <h3 className="text-lg font-medium">
        {name} {lastName}
      </h3>

      <p className="text-sm">{email}</p>

      <div className="flex items-center gap-1.5 text-sm">
        <MapPinnedIcon size={14} />
        <p>{location}</p>
      </div>

      <p className="text-xs">cadastrado {formattedDate}</p>
    </div>
  );
};

export default User;
