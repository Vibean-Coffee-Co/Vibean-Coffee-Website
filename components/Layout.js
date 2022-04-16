import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import Logo from '../public/logo.png';

export default function Layout({ title, description, children }) {
  return (
    <>
        <Head>
            <title>{title ? `${title} - Vibean Coffee` : 'Vibean Coffee | Chikmagaluru'}</title>
            {description && <meta name="description" content={description}></meta>}
            <link rel="icon" href="/logo.png" />
        </Head>
        {/* Navbar */}
        <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image
                src={Logo}
                alt="Logo"
                width={50}
                height={50}
            />
            <span className="ml-3 text-xl">Vibean Coffee</span>
            </a>
            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/">
            <a className="mr-5 hover:text-gray-900">Shop</a>
            </Link>
            </nav>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button</button>
        </div>
        <hr />
        </header>

        {children}

        {/* Footer */}
        <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Image
                src={Logo}
                alt="Logo"
                width={50}
                height={50}
            />
            <span className="ml-3 text-xl">Vibean Coffee</span>
            </a>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">All Rights Reserved © Vibean Foods & Beverages Pvt. Ltd. 2022-Present
            </p>
        </div>
        </footer>
    </>
  );
}