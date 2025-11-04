import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demos | Grant Hopkins",
  description: "Interactive demos and prototypes by Grant Hopkins",
};

export default function DemosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}

