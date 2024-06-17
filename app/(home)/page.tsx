"use client";

import { useEffect, useState } from "react";
import Form from "../components/form";
import Search from "../components/search";
import axios from "axios";
import User from "../components/user";
import Sooner from "../components/sooner";

export interface Users {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  created_at: string;
}

export default function Home() {
  const [users, setUsers] = useState<Users[]>([]);
  const [showSooner, setShowSooner] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<Users[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const findUsers = async () => {
      await axios
        .get("https://api-user-base.onrender.com/users")
        .then((response) => {
          setUsers(response.data);
          setFilteredUsers(response.data);
        });
    };

    findUsers();
  }, []);

  useEffect(() => {
    if (showSooner) {
      const timer = setTimeout(() => {
        setShowSooner(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSooner]);

  useEffect(() => {
    const results = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
    setFilteredUsers(results);
  }, [searchQuery, users]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-[#333333] p-5 text-white md:p-20 lg:flex-row">
      <section className="relative flex w-full flex-col items-center justify-center xl:w-fit">
        <Form setUsers={setUsers} setShowSooner={setShowSooner} />
      </section>

      <section className="flex w-full flex-col gap-2.5 lg:max-w-80">
        <Search setSearchQuery={setSearchQuery} />

        <div className="flex w-full flex-col gap-2.5 overflow-auto lg:h-[444px] [&::-webkit-scrollbar]:hidden">
          <h3 className="text-lg">
            Usuários{" "}
            <span className="opacity-50">({filteredUsers.length})</span>
          </h3>

          {filteredUsers
            .slice()
            .reverse()
            .map((user) => (
              <User
                key={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                location={user.location}
                created_at={user.created_at}
              />
            ))}
        </div>
      </section>

      {showSooner && <Sooner />}
    </main>
  );
}
