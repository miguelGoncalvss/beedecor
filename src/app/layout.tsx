import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bee Decoração e Arte | Amigurumi Handmade",
  description: "Arte feita à mão que aquece o coração. Amigurumis exclusivos e colecionáveis.",
};

import { Atmosphere } from "@/components/atmosphere";
import { CartDrawer } from "@/components/cart-drawer";
import { PageTransition } from "@/components/page-transition";
import { BeeAssistant } from "@/components/bee-assistant";
import QueryProvider from "@/providers/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <QueryProvider>
          <Atmosphere />
          <BeeAssistant />
          <CartDrawer />
          <PageTransition>
            {children}
          </PageTransition>
        </QueryProvider>
      </body>
    </html>
  );
}
