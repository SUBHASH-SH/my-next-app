import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
  <div className="container mx-auto">
    {/* Title */}
    <h1 className="text-2xl font-bold text-center md:text-left">sarkarinaukri-india.in</h1>

    {/* Navigation Menu */}
    <nav className="mt-4 md:mt-0">
      <ul className="flex flex-wrap justify-center gap-4">
        <li>
          <Link href="/" className="hover:text-blue-200 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/all-jobs" className="hover:text-blue-200 transition-colors">
            All Jobs
          </Link>
        </li>
        <li>
          <Link href="/admit-card" className="hover:text-blue-200 transition-colors">
            Admin Card
          </Link>
        </li>
        <li>
          <Link href="/result" className="hover:text-blue-200 transition-colors">
            Result
          </Link>
        </li>
        <li>
          <Link href="/news" className="hover:text-blue-200 transition-colors">
            News
          </Link>
        </li>
        <li>
          <Link href="/answer-key" className="hover:text-blue-200 transition-colors">
            Answer Key
          </Link>
        </li>
        <li>
          <Link href="/syllabus" className="hover:text-blue-200 transition-colors">
            Syllabus
          </Link>
        </li>
        <li>
          <Link href="/date-sheet" className="hover:text-blue-200 transition-colors">
            Date Sheet
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</header>
  );
};

export default Header;