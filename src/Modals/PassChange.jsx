import React, { useState } from "react";

const PassChangeModal = ({ open, onClose }) => {
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showOld, setShowOld] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [errors, setErrors] = useState({});

	if (!open) return null;

	const validate = () => {
		const err = {};
		if (!oldPassword) err.oldPassword = "Old password is required.";
		if (!newPassword) err.newPassword = "New password is required.";
		else if (newPassword.length < 8) err.newPassword = "Password must be at least 8 characters.";
		if (!confirmPassword) err.confirmPassword = "Please confirm your password.";
		else if (newPassword !== confirmPassword) err.confirmPassword = "Passwords do not match.";
		setErrors(err);
		return Object.keys(err).length === 0;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (validate()) {
			// Submit logic here
		}
	};

		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
				<div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-md relative">
					<button
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
						onClick={onClose}
						aria-label="Close"
					>
						&times;
					</button>
					<h2 className="text-2xl font-bold mb-2">Change Password</h2>
					<p className="text-lg font-semibold mb-6">New Password</p>
					<form className="space-y-4" onSubmit={handleSubmit} noValidate>
					<div>
						<div className="relative">
							<input
								type={showOld ? "text" : "password"}
								placeholder="Old Password*"
								value={oldPassword}
								onChange={e => setOldPassword(e.target.value)}
								className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-10 ${errors.oldPassword ? 'border-red-500' : ''}`}
							/>
							<button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowOld(v => !v)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.556 3.694 8.25 8.25 8.25s8.25-3.694 8.25-8.25S15.056 3.75 10.5 3.75 2.25 7.444 2.25 12z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
								</svg>
							</button>
						</div>
						{errors.oldPassword && <p className="text-xs text-red-500 mt-1">{errors.oldPassword}</p>}
					</div>
					<div>
						<div className="relative">
							<input
								type={showNew ? "text" : "password"}
								placeholder="New Password*"
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
								className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
							/>
							<button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowNew(v => !v)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.556 3.694 8.25 8.25 8.25s8.25-3.694 8.25-8.25S15.056 3.75 10.5 3.75 2.25 7.444 2.25 12z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
								</svg>
							</button>
						</div>
						{errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword}</p>}
					</div>
					<div>
						<div className="relative">
							<input
								type={showConfirm ? "text" : "password"}
								placeholder="Confirm Password*"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
								className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
							/>
							<button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={() => setShowConfirm(v => !v)}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 4.556 3.694 8.25 8.25 8.25s8.25-3.694 8.25-8.25S15.056 3.75 10.5 3.75 2.25 7.444 2.25 12z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
								</svg>
							</button>
						</div>
						{errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
					</div>
					<button type="submit" className="w-full bg-red-600 text-white rounded-full py-2 text-lg font-semibold hover:bg-red-700 mt-6">
						Request Admin
					</button>
				</form>
			</div>
		</div>
	);
};

export default PassChangeModal;
