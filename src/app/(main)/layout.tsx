import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Contact from "@/components/home/Contact";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Contact />
      <Footer />
    </div>
  );
}
