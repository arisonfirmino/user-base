"use client";

import { useEffect, useState } from "react";
import Form from "./components/form";
import Search from "./components/search";
import User from "./components/user";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    findAllUsers();
  }, []);

  const findAllUsers = async () => {
    await axios
      .get("https://api-user-base.onrender.com/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-container xl:flex-row xl:items-start xl:justify-end xl:px-56 xl:py-20 2xl:px-80">
      <section className="left-0 top-1/2 flex w-full flex-col items-center gap-10 p-5 md:max-w-[600px] xl:fixed xl:ml-56 xl:max-w-96 xl:-translate-y-1/2 xl:transform 2xl:ml-80">
        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-2xl font-medium capitalize text-primary">
            Informações Pessoais
          </h3>
          <p className="text-sm lowercase text-gray-400">
            insira suas informações pessoais para se cadastrar
          </p>
        </div>

        <Form />
      </section>

      <section className="flex w-full flex-col gap-5 p-5 md:max-w-[600px] xl:max-w-96">
        <Search />

        <p className="text-xl text-primary">
          Usuários <span className="text-gray-400">({users.length})</span>
        </p>

        {users.map((user, index) => (
          <User
            key={user.id}
            name={user.name}
            lastName={user.lastName}
            email={user.email}
            location={user.location}
            created_at={user.created_at}
          />
        ))}
      </section>
    </main>
  );
};

export default Home;
