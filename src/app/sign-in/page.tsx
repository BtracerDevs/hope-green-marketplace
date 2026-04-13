"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

export default function SignInPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    // mostra um toast de loading e guarda o ID para atualizar depois
    const toastId = toast.loading("Validando credenciais...");
    const res = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });

    if (res?.ok) {
      toast.success("Login bem-sucedido!", { id: toastId });
      router.push("/dashboard");
    } else {
      toast.error("Email ou senha incorretos", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* FORM */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 bg-white">
        <div className="max-w-md w-full">
          {/* LOGO */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Logo" width={160} height={40} />
            <Image src="/osten.png" alt="Logo" width={50} height={50} />
          </div>

          {/* TITLE */}
          <h2 className="text-4xl font-bold mb-2 text-center">
            Faça Seu Login!
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Entre com seu email e senha para continuar
          </p>

          {/* FORM ELEMENTS */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Por favor, insira seu email",
                })}
                className="border border-gray-300 rounded-md p-3 w-full
                           focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Senha"
                {...register("password", {
                  required: "Por favor, insira sua senha",
                })}
                className="border border-gray-300 rounded-md p-3 w-full
                           focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#1b8852] text-white rounded-md p-3 font-semibold
                         hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Entrando..." : "Faça Login"}
            </button>
          </form>

          {/* SIGN UP LINK */}
          <p className="text-center text-gray-500 mt-6 text-sm">
            Ainda não tem conta?
          </p>
          <Link
            href="/sign-up"
            className="flex items-center justify-center w-full bg-green-100 text-green-700 p-3 rounded-md mt-2 hover:bg-green-200 transition"
          >
            Criar Minha Conta
          </Link>
        </div>
      </div>

      {/* SIDE IMAGE */}
      <div className="hidden md:block md:w-1/2 relative h-screen">
        <Image src="/signin.png" alt="Natureza" fill className="object-cover" />
      </div>
    </div>
  );
}
