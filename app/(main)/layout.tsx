import { ToastContainer, Bounce } from "react-toastify";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { CartProvider } from "../../context/CartContext";
import Providers from "../../components/providers/providers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <CartProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </CartProvider>
    </Providers>
  );
}
