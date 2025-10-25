// src/components/layout/Footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Grille pour organiser les sections du footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section "À propos" */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              À propos
            </h3>
            <p className="text-gray-600 mb-4">
              Nous sommes une boutique en ligne dédiée à offrir des produits de
              qualité pour répondre à tous vos besoins.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Section "Liens utiles" */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Liens utiles
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Catégories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Section "Service client" */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Service client
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Livraison
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Retours et échanges
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          {/* Section "Newsletter" */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Newsletter
            </h3>
            <p className="text-gray-600 mb-4">
              Abonnez-vous pour recevoir nos offres spéciales et actualités.
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Séparateur et copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} MonShop. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
