import React, { useState } from "react";

const countries = ["South Korea", "United States", "India", "United Kingdom", "Canada"];
const genders = ["Male", "Female", "Other"];

const ProfileModal = ({ open, onClose }) => {
	const [form, setForm] = useState({
		firstName: "John",
		middleName: "",
		lastName: "Smith",
		email: "tonynguyen@Demo.Com",
		countryCode: "+1",
		phone: "",
		country: "South Korea",
		gender: "Male",
		dob: "",
		picture: null,
	});

	if (!open) return null;

		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
				<div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-2xl relative">
					<button
						className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
						onClick={onClose}
						aria-label="Close"
					>
						&times;
					</button>
					<h2 className="text-2xl font-bold mb-2">User Profile</h2>
					<p className="text-lg font-semibold mb-6">Information</p>
					<form className="space-y-4">
					<div className="flex gap-4">
						<input type="text" placeholder="First Name" value={form.firstName} className="w-1/3 px-3 py-2 border rounded-lg" readOnly />
						<input type="text" placeholder="Middle Name" value={form.middleName} className="w-1/3 px-3 py-2 border rounded-lg" readOnly />
						<input type="text" placeholder="Last Name" value={form.lastName} className="w-1/3 px-3 py-2 border rounded-lg" readOnly />
					</div>
					<div className="flex gap-4">
						<input type="email" placeholder="Email" value={form.email} className="w-1/2 px-3 py-2 border rounded-lg" readOnly />
						<div className="flex w-1/2 gap-2">
							<select value={form.countryCode} className="px-2 py-2 border rounded-lg">
								<option value="+1">+1</option>
								<option value="+82">+82</option>
								<option value="+91">+91</option>
							</select>
							<input type="text" placeholder="Your Phone Number" value={form.phone} className="flex-1 px-3 py-2 border rounded-lg" />
						</div>
					</div>
					<div className="flex gap-4">
						<select value={form.country} className="w-1/2 px-3 py-2 border rounded-lg">
							{countries.map(c => <option key={c} value={c}>{c}</option>)}
						</select>
						<select value={form.gender} className="w-1/4 px-3 py-2 border rounded-lg">
							{genders.map(g => <option key={g} value={g}>{g}</option>)}
						</select>
						<input type="date" value={form.dob} className="w-1/4 px-3 py-2 border rounded-lg" />
					</div>
					<div className="flex gap-4 items-center">
						<input type="file" accept="image/*" className="w-1/2 px-3 py-2 border rounded-lg" />
						<span className="text-gray-500">Add Picture</span>
					</div>
					<div className="flex justify-start mt-6">
						<button type="submit" className="bg-red-600 text-white rounded-full px-8 py-2 text-lg font-semibold hover:bg-red-700">
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileModal;
