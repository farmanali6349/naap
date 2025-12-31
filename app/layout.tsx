import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

// Contexts
import { AuthProvider } from "./_contexts/Auth";
import { ThemeProvider } from "./_contexts/Theme";

// Components
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Tailor Shop",
  description: "Tailor Shop App to store the images of the nap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" />
            <Header />
            {children}
            {/* Footer */}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
