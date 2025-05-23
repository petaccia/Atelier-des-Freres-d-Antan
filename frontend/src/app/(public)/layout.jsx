import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
