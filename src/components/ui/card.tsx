import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-gray-100 shadow rounded-lg p-2 ${className}`}>
      {children}
    </div>
  );
}

type CardContentProps = {
  children: ReactNode;
  className?: string;

};

export function CardContent({ children, className }: CardContentProps) {
  return <div className={`p-3 ${className}`}>{children}</div>;
}
