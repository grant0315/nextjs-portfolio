import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Grant Hopkins",
  description: "Blog posts and articles by Grant Hopkins on software engineering, AI/ML, real estate tech, and data-driven products.",
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

