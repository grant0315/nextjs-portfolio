import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Grant Hopkins",
  description: "Blog posts and articles by Grant Hopkins",
};

export default function BlogLayout({
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

