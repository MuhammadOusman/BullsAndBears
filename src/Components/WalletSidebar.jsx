"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function WalletSidebar() {
  const location = useLocation();
  const links = [
    { name: "OverView", to: "/user/wallet/overview" },
    { name: "Transactions", to: "/user/wallet/transaction" },
    { name: "Transaction History", to: "/user/wallet/history" },
    
  ];
  return (
    <nav className="bg-gray-100 h-full w-full py-8 px-4 flex flex-col gap-4 md:w-64 border-r border-gray-300">
      <ul className="flex flex-col gap-4">
        {links.map(link => {
          const isActive = location.pathname === link.to || (link.to === "/user/wallet/overview" && location.pathname === "/user/wallet");
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block rounded-full px-6 py-2 font-medium text-sm md:text-base transition-all ${isActive ? "bg-red-600 text-white" : "text-black hover:bg-gray-200"}`}
                style={isActive ? { fontWeight: 600 } : {}}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
