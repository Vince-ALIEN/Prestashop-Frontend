// src/components/layout/Header.tsx
import Link from "next/link";
import { ShoppingBag, User, Search, Globe } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-extrabold text-gray-800">
            Mon<span className="text-blue-600 font-light">Shop</span>
          </Link>
        </div>

        {/* Menu de navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/products"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Produits
          </Link>
          <Link
            href="/categories"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Catégories
          </Link>
          <Link
            href="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            À propos
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Barre de recherche et icônes */}
        <div className="flex items-center space-x-4">
          {/* Barre de recherche (icône + input caché sur mobile) */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Icônes utilisateur */}
          <div className="flex space-x-1">
            {/* Compte utilisateur */}
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-6 w-6" />
            </button>

            {/* Sélection de langue */}
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Globe className="h-6 w-6" />
            </button>

            {/* Panier */}
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative">
              <ShoppingBag className="h-6 w-6" />
              {/* Badge pour le nombre d'articles (exemple statique) */}
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
