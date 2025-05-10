
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
// import { CurrencyProvider } from '@/contexts/CurrencyContext'; // Removed

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <CurrencyProvider> // Removed
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    // </CurrencyProvider> // Removed
  );
}
