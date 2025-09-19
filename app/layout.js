import "./globals.css";
import Topbar from "@/components/Topbar";
import Providers from "./providers";

export const metadata = {
  title: "E-Dating",
  description: "Modern e-dating platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <Topbar />
          <main className="pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
