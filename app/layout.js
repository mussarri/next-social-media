import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Next Social Media",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-200">
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
