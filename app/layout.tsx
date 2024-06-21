import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import SessionContext from "@/providers/SessionContext";
import { cn } from "@/lib/utils";
import { Bounce, ToastContainer } from "react-toastify";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ОАТИ",
  description: "Дипломный проект",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <SessionContext>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          {children}
        </SessionContext>
      </body>
    </html>
  );
}
