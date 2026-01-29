import type { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "schm",
  description: "theme based image generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased max-w-[700px] mx-auto flex flex-col gap-4">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
