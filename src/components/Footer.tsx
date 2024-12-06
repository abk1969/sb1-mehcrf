import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Globacom3000Reply</h3>
            <p className="text-sm text-gray-600">
              Générez des réponses professionnelles et percutantes en un clic.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Produit</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/generator" className="text-sm text-gray-600 hover:text-[#1C3F7C]">
                  Générateur
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-gray-600 hover:text-[#1C3F7C]">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-[#1C3F7C]">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-[#1C3F7C]">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-[#1C3F7C]">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-[#1C3F7C]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Globacom3000Reply. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}