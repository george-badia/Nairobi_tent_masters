
import React from 'react';
import { LogoIcon } from './icons';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
             <div className="flex items-center gap-3">
                <LogoIcon className="h-10 w-auto text-brand-light" />
                <span className="text-lg font-semibold text-white">Nairobi Tent Masters</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">Crafting quality shelters for every occasion since 2005.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-accent">Home</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-accent">Shop</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-accent">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brand-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Industrial Area, Nairobi</li>
              <li>Phone: +254 712 345 678</li>
              <li>Email: sales@nairobitents.co.ke</li>
            </ul>
          </div>
           <div>
            <h4 className="text-md font-semibold text-white">Follow Us</h4>
             <div className="flex mt-4 space-x-6">
                <a href="#" className="text-gray-400 hover:text-brand-accent">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-brand-accent">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clipRule="evenodd" /></svg>
                </a>
             </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nairobi Tent Masters. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};