import "./globals.css";
import "@radix-ui/themes/styles.css";

// import "@thouse/ui/src/styles.css";
// eslint-disable-next-line import/no-relative-packages
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { AccountFormProvider } from "./context/AccountFormContext";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <AccountFormProvider>
            <Theme>{children}</Theme>
          </AccountFormProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
