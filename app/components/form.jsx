"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MailIcon, MapPinnedIcon, MoveRightIcon, UserIcon } from "lucide-react";
import Input from "./input";
import axios from "axios";

const schema = yup.object({
  name: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo requer no mínimo 3 caracteres."),
  lastName: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo requer no mínimo 3 caracteres."),
  email: yup
    .string()
    .required("Este campo é obrigatório.")
    .email("Insira um email válido."),
  location: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo requer no mínimo 3 caracteres."),
});

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      location: data.location,
    };

    await axios
      .post("https://api-user-base.onrender.com/user", formData)
      .then(() => {
        reset();
        alert("Cadastrado com sucesso!");
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <Input
        label="Nome"
        placeholder="Digite seu primeiro nome"
        icon={<UserIcon size={18} />}
        register={{ ...register("name") }}
        error={errors.name?.message}
      />

      <Input
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        icon={<UserIcon size={18} />}
        register={{ ...register("lastName") }}
        error={errors.lastName?.message}
      />

      <Input
        label="Email"
        placeholder="Digite seu endereço de email"
        icon={<MailIcon size={18} />}
        register={{ ...register("email") }}
        error={errors.email?.message}
      />

      <Input
        label="Localização"
        placeholder="Digite o nome da sua cidade"
        icon={<MapPinnedIcon size={18} />}
        register={{ ...register("location") }}
        error={errors.location?.message}
      />

      <button
        type="submit"
        className="flex items-center justify-between rounded-lg bg-secondary px-5 py-2.5 text-lg text-primary active:bg-primary active:text-secondary"
      >
        Enviar
        <MoveRightIcon size={18} />
      </button>
    </form>
  );
};

export default Form;
