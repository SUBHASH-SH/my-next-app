import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
  <div className="container mx-auto">
    {/* Grid for Footer Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Social Media Section */}
      <div>
        <h1 className="text-lg font-bold mb-4">Social Media</h1>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            WhatsApp
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            Telegram
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>

      {/* Quick Links Section */}
      <div>
        <h1 className="text-lg font-bold mb-4">Quick Links</h1>
        <ul className="space-y-2">
          <li>
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/about-us" className="hover:text-blue-400 transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact-us" className="hover:text-blue-400 transition-colors">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Government Jobs Section */}
      <div>
        <h1 className="text-lg font-bold mb-4">Government Jobs</h1>
        <ul className="space-y-2">
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              Central Government Jobs
            </Link>
          </li>
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              State Government Jobs
            </Link>
          </li>
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              Bank Jobs
            </Link>
          </li>
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              Railway Jobs
            </Link>
          </li>
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              Teaching Jobs
            </Link>
          </li>
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              Police Jobs
            </Link>
          </li>
          <li>
            <Link href="/all-jobs" className="hover:text-blue-400 transition-colors">
              Defense Jobs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;