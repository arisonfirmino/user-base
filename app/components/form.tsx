"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ArrowRightIcon,
  MailIcon,
  MapPinnedIcon,
  UserIcon,
} from "lucide-react";
import Input from "./input";
import axios from "axios";
import { Users } from "../(home)/page";

const schema = yup.object({
  firstName: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "O nome deve ter no mínimo 3 letras"),
  lastName: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "O sobrenome deve ter no mínimo 3 letras"),
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um email válido."),
  emailConfirmation: yup
    .string()
    .required("Este campo é obrigatório.")
    .oneOf([yup.ref("email")], "Os emails devem coincidir."),
  location: yup.string().required("Este campo é obrigatório."),
});

interface FormProps {
  setShowSooner: (show: boolean) => void;
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
}

export default function Form({ setUsers, setShowSooner }: FormProps) {
  const [emailExists, setEmailExists] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const checkEmailExists = async (email: string) => {
    try {
      const response = await axios.get(
        `https://api-user-base.onrender.com/check-email`,
        {
          params: { email },
        },
      );
      return response.data.exists;
    } catch (error) {
      console.error("Erro ao verificar o email!", error);
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    const emailExists = await checkEmailExists(data.email);

    if (emailExists) {
      setEmailExists(true);
      return;
    }

    setEmailExists(false);

    const formData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      location: data.location,
    };

    try {
      await axios
        .post("https://api-user-base.onrender.com/user", formData)
        .then((response) => {
          const newUser = response.data;
          setUsers((prevUsers) => [...prevUsers, newUser]);
        });
      setShowSooner(true);
      reset();
    } catch (error) {
      console.log("Erro ao cadastrar!");
    }
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <h3 className="text-2xl font-medium">Informaçoes Pessoais</h3>

      <p className="text-base">
        Insira suas informações pessoais para se cadastrar
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <section className="flex flex-col gap-5 md:flex-row md:gap-10">
          <Input
            label="Nome"
            placeholder="Digite seu primeiro nome"
            register={{ ...register("firstName") }}
            error={errors.firstName?.message}
            icon={<UserIcon size={18} />}
          />

          <Input
            label="Sobrenome"
            placeholder="Digite seu sobrenome"
            register={{ ...register("lastName") }}
            error={errors.lastName?.message}
            icon={<UserIcon size={18} />}
          />
        </section>

        <Input
          label="Localização"
          placeholder="Digite sua cidade"
          register={{ ...register("location") }}
          error={errors.location?.message}
          icon={<MapPinnedIcon size={18} />}
        />

        <section className="flex flex-col gap-5 md:flex-row md:gap-10">
          <Input
            label="Email"
            placeholder="Digite seu endereço de email"
            register={{ ...register("email") }}
            error={errors.email?.message}
            emailExists={emailExists}
            icon={<MailIcon size={18} />}
          />

          <Input
            label="Confirmação de Email"
            placeholder="Confirme seu endereço de email"
            register={{ ...register("emailConfirmation") }}
            error={errors.emailConfirmation?.message}
            icon={<MailIcon size={18} />}
          />
        </section>

        <button
          type="submit"
          className="bottom-0 right-0 flex items-center justify-center gap-2.5 rounded-full bg-white px-10 py-1.5 text-black active:bg-black active:bg-opacity-50 active:text-white"
        >
          Cadastrar
          <ArrowRightIcon size={16} />
        </button>
      </form>
    </div>
  );
}
