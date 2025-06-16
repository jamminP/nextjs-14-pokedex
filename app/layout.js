// app/layout.js
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from './pokemonLogo.png';
import { ReduxProvider } from '../lib/provider';

export const metadata = {
  title: 'Pokedex',
  description: 'Next.js Pokedex',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <nav className="fixed top-0 left-0 w-full flex justify-center items-center bg-white shadow-md py-3.5">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-40 h-auto" />
            </Link>
          </nav>
          <div className="pt-20">{children}</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
