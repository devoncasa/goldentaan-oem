import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EFE5D8] text-[#4A4A4A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div className="space-y-4">
              <a href="#overview" className="flex items-center">
                <img className="h-10 w-auto mr-3 bg-white p-1 rounded-md border-2 border-white" src="https://cdn.jsdelivr.net/gh/devoncasa/goldentaan-assets@main/golden-taan-logo-smll.webp" alt="Golden TAAN Logo" />
                <h1 className="text-2xl font-bold text-[#4A4A4A]">Golden TAAN</h1>
            </a>
            <p className="text-sm text-gray-600">
              © 2025 Golden TAAN Co., Ltd. All Rights Reserved.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#overview" className="text-gray-600 hover:text-[#D4A373] transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-[#D4A373] transition-colors">Our Story</a></li>
              <li><a href="#intro" className="text-gray-600 hover:text-[#D4A373] transition-colors">Products</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-[#D4A373] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Office Address */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Office Address</h3>
            <address className="not-italic text-gray-600 space-y-1">
              <p>919/1 JTC Building, Silom Road, Silom, Bangrak</p>
              <p>Bangkok 10500 THAILAND</p>
            </address>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <strong>Phone:</strong> <a href="tel:+66818519922" className="hover:text-[#D4A373] transition-colors">+66(0)81 851 9922</a>
              </li>
              <li>
                <strong>WhatsApp:</strong> +66(0)81 851 9922
              </li>
               <li>
                <strong>WeChat:</strong> +66(0)81 851 9922
              </li>
              <li>
                <strong>Email:</strong> <a href="mailto:info@goldentaan.com" className="hover:text-[#D4A373] transition-colors">info@goldentaan.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;