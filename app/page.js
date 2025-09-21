
import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will live in Topbar (controlled via state) */}
      

      {/* Main Content */}
      <main
        id="main-content"
        className="flex-1 bg-gray-50 p-6 transition-all duration-300 ease-in-out"
      >
        <LandingPage />
      </main>
    </div>
  );
}
