"use client";

import { api } from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type TFormValues = {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TFormValues>({
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: TFormValues) => {
    try {
      await api.post("/user/register", {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
      });
      toast.success("Usuário criado com sucesso!");
      router.push("/sign-in");
      /* eslint-disable  @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message ?? "Algo de errado aconteceu!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center mb-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={160}
              height={40}
              className="mb-4"
            />
          </div>

          {/* Headings */}
          <h2 className="text-4xl font-bold mb-2">Crie Sua Conta!</h2>
          <p className="text-gray-500 mb-6">
            Preencha os dados para criar sua conta
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Nome Completo"
                {...register("name", {
                  required: "Por favor, insira seu nome",
                })}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Por favor, insira seu email",
                })}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* CPF */}
            <div>
              <input
                type="text"
                placeholder="CPF"
                {...register("cpf", {
                  required: "Por favor, insira o CPF",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "CPF deve ter 11 dígitos numéricos",
                  },
                })}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.cpf.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Senha"
                {...register("password", {
                  required: "Por favor, insira a senha",
                  minLength: {
                    value: 6,
                    message: "A senha precisa ter ao menos 6 caracteres",
                  },
                })}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirme a Senha"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === passwordValue || "As senhas não coincidem!",
                })}
                className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md p-3 font-semibold hover:bg-green-700 transition"
            >
              Criar Conta
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            Já tem uma conta?
          </p>
          <Link
            href="/sign-in"
            className="flex items-center justify-center w-full bg-green-100 text-green-700 p-3 rounded-md mt-2 hover:bg-green-200 transition"
          >
            Fazer Login
          </Link>
        </div>
      </div>

      {/* Side Image */}
      <div className="hidden md:block md:w-1/2 relative h-screen">
        <Image src="/signin.png" alt="Natureza" fill className="object-cover" />
      </div>
    </div>
  );
}
