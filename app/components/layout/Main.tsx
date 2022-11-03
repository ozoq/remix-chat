export interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <div className="max-w-7xl px-8 py-8 flex flex-col gap-4 mx-auto">
      {children}
    </div>
  );
}
