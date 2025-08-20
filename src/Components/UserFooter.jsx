import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PrivacyModal from '../Modals/privacy';
import TermsModal from '../Modals/terms';

const UserFooter = () => {
	const [showPrivacy, setShowPrivacy] = useState(false);
	const [showTerms, setShowTerms] = useState(false);
	return (
		<footer className="bg-gray-200 pt-16 pb-6 px-4 border-t border-gray-400">
			<div className="max-w-6xl mx-auto flex flex-col gap-8">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
					<div className="font-bold text-2xl md:text-3xl text-black mb-4 md:mb-0" style={{maxWidth: 350}}>
						Your trusted partner in trading<br />and asset management.
					</div>
					<div className="flex flex-row gap-16 w-full md:w-auto justify-between">
									<ul className="space-y-2 text-black text-base font-normal">
										<li><Link to="/user/home" className="hover:underline">Home</Link></li>
										<li><Link to="/user/watchlist" className="hover:underline">Watchlist</Link></li>
										<li><Link to="/user/discover" className="hover:underline">Discover</Link></li>
										<li><Link to="/user/wallet" className="hover:underline">Wallet</Link></li>
										<li><Link to="/user/contact" className="hover:underline">Contact Us</Link></li>
									</ul>
						<ul className="space-y-2 text-black text-base font-normal">
							<li>
								<button type="button" className="bg-transparent p-0 text-black underline hover:text-blue-700" onClick={() => setShowTerms(true)}>
									Terms of Service
								</button>
							</li>
							<li>
								<button type="button" className="bg-transparent p-0 text-black underline hover:text-blue-700" onClick={() => setShowPrivacy(true)}>
									Privacy Policy
								</button>
							</li>
						</ul>
					</div>
				</div>
				<hr className="border-gray-400 mb-4" />
				<div className="text-center text-black text-base font-medium">
					© 2025 Investalyst. All rights reserved.
				</div>
			</div>
			{showPrivacy && <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />}
			{showTerms && <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />}
		</footer>
	);
};

export default UserFooter;
