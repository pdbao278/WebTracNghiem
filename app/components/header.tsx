import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Aptis Listening
        </Link>

        {/* Menu */}
        <nav className="flex gap-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/english" className="hover:text-blue-600">
            Listening Tests
          </Link>
        </nav>
      </div>
    </header>
  );
}
