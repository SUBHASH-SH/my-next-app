import Header from './components/Header';
import Footer from './components/Footer';
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
