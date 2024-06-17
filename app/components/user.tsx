import { MapPinnedIcon } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  created_at: string;
}

export default function User({
  firstName,
  lastName,
  email,
  location,
  created_at,
}: UserProps) {
  const formattedCreatedAt = formatDistanceToNow(parseISO(created_at), {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-black bg-opacity-50 p-5">
      <h2 className="text-lg font-medium">
        {firstName} {lastName}
      </h2>

      <p className="text-sm opacity-50">{email}</p>

      <p className="flex items-center gap-1.5 text-sm">
        <MapPinnedIcon size={14} />
        {location}
      </p>

      <p className="text-xs opacity-50">{`cadastrado ${formattedCreatedAt}`}</p>
    </div>
  );
}
