import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaMoneyCheckAlt, FaExchangeAlt, FaKey } from "react-icons/fa";
import { MdApproval } from "react-icons/md";

const links = [
	{ name: "Home", to: "/admin/home", icon: <FaHome /> },
	{ name: "Deposit/Withdrawal", to: "/admin/funds", icon: <FaMoneyCheckAlt /> },
	{ name: "Trade", to: "/admin/trade", icon: <FaExchangeAlt /> },
	{ name: "Sign Up approval awaiting", to: "/admin/approval", icon: <MdApproval /> },
	{ name: "Password Change Request", to: "/admin/pass", icon: <FaKey /> },
];

export default function AdminSidebar() {
	const location = useLocation();
	return (
		<nav className="bg-gray-100 h-full w-16 py-8 px-4 flex flex-col gap-4 border-r border-gray-300 md:w-64">
			<ul className="flex flex-col gap-4">
				{links.map(link => {
					const isActive = location.pathname === link.to;
					return (
						<li key={link.to}>
							<Link
								to={link.to}
								className={`flex items-center justify-center md:justify-start gap-2 rounded-full px-2 md:px-6 py-2 font-medium text-sm md:text-base transition-all ${isActive ? "bg-red-600 text-white" : "text-black hover:bg-gray-200"}`}
								style={isActive ? { fontWeight: 600 } : {}}
							>
								<span className="text-lg">{link.icon}</span>
								<span className="hidden md:inline">{link.name}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
