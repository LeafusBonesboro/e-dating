import "./globals.css";
import { Providers } from "./providers";
import Topbar from "@/components/Topbar";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Delta Treats",
  description: "Delicious handcrafted desserts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Providers>
          <Topbar />
          {children}
        </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
