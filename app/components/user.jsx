import { formatDistanceToNow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPinnedIcon } from "lucide-react";
import { motion } from "framer-motion";

const User = ({ name, lastName, email, location, created_at, index }) => {
  const date = parseISO(created_at);

  const formattedDate = formatDistanceToNow(date, {
    addSuffix: true,
    locale: ptBR,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
      className="flex w-full flex-col gap-1.5 rounded-xl bg-white p-5 text-primary shadow-md"
    >
      <h3 className="text-lg font-medium">
        {name} {lastName}
      </h3>

      <p className="text-sm">{email}</p>

      <div className="flex items-center gap-1.5 text-sm">
        <MapPinnedIcon size={14} />
        <p>{location}</p>
      </div>

      <p className="text-xs">cadastrado {formattedDate}</p>
    </motion.div>
  );
};

export default User;
