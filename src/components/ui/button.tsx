import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outline" | "default";
  fontSize?: string; // Permite personalizar o tamanho da fonte via classes do Tailwind
};

export function Button({
  children,
  className,
  variant = "default",
  fontSize,
  ...props
}: ButtonProps) {
  // Tamanho default da fonte responsivo
  const defaultFontSize = "text-sm md:text-base lg:text-lg";
  
  // Estilos base com responsividade para padding e fonte
  const baseStyle = `flex justify-center items-center rounded-lg font-semibold px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3 ${fontSize || defaultFontSize}`;
  
  const variants = {
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
    default: "bg-[#1b8852] text-white hover:bg-green-600",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
