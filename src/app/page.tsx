import Footer from "@/components/Footer";
import MidSection from "@/components/MidSection";
import Header from "@/components/Navbar/Navbar";

export default async function Home() {
  return (
    <div className="h-screen bg-hero-gradient bg-[#121212]">
      <Header />
      <MidSection />
      <Footer />
    </div>
  );
}
