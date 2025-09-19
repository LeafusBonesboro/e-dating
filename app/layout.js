import "./globals.css";
import Topbar from "@/components/Topbar";

export const metadata = {
  title: "E-Dating",
  description: "Modern e-dating platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50 text-gray-900">
        <Topbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
