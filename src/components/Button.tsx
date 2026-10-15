type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "ghost";
};

export function Button({ children, variant = "primary" }: ButtonProps) {
  return <button className={`button button-${variant}`}>{children}</button>;
}
