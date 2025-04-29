"use client";

import React, { useRef, useState } from "react";

type Errors = {
	number?: string;
	name?: string;
	month?: string;
	year?: string;
	cvv?: string;
};

type FormData = {
	number?: string;
	name?: string;
	month?: number;
	year?: number;
	cvv?: number;
};

const CreditCard2 = () => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [formData, setFormData] = useState({
		number: "",
		name: "",
		month: undefined,
		year: undefined,
		cvv: undefined,
	});

	const [errors, setErrors] = useState<Errors>({});

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleOnSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const errorsResult = validation(formData);
		setErrors(errorsResult);

		setTimeout(() => {
			setErrors({});
		}, 3000);
	};

	const validation = (formData: FormData) => {
		const errors: Errors = {};
		if (
			!formData.hasOwnProperty("number") ||
			formData.number!.length < 12 ||
			formData.number!.length > 12 ||
			typeof parseInt(formData.number!) === "number"
		) {
			errors.number = "Invalid number";
		}
		if (formData.hasOwnProperty("name") || /[A-Z][a-z]/.test(formData.name!)) {
			errors.name = "Invalid name";
		}
		if (
			formData.hasOwnProperty("month") ||
			formData.month!.toString().length !== 2 ||
			formData.month! < 1 ||
			formData.month! > 12
		) {
			errors.month = "Invalid month";
		}

		const currentYear = new Date().getFullYear();
		if (
			formData.hasOwnProperty("year") ||
			formData.year! < currentYear ||
			formData.year! >= currentYear + 4
		) {
			errors.year = "Invalid year";
		}

		if (
			formData.hasOwnProperty("cvv") ||
			formData.cvv!.toString().length !== 3
		) {
			errors.cvv = "Invalid cvv";
		}
		return errors;
	};

	return (
		<form onSubmit={handleOnSubmit} className="flex flex-col gap-3 p-3">
			<div className="flex justify-end">
				<button
					suppressHydrationWarning
					type="button"
					onClick={() => dialogRef.current?.showModal()}
					className="hover:bg-gray-300 rounded-lg italic bg-gray-200 text-gray-400 text-xs px-1 py-1"
				>
					Info
				</button>
				<dialog
					className=" top-30 left-150 text-xs text-slate-500 italic bg-slate-100 rounded-lg p-2 border-none"
					ref={dialogRef}
				>
					<div>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={() => dialogRef.current?.close()}
								className="text-xs hover:bg-gray-300 rounded-lg italic bg-gray-200 text-gray-400 px-1 py-1"
							>
								Close
							</button>
						</div>
						<ul>
							<li>All fields are obligatory</li>
							<li>Number: 12 digits long and numbers only</li>
							<li>Name: Letters from the English alphabet only</li>
							<li>Month: Digits between 1 and 12 only</li>
							<li>
								Year: the current year and not more than three years greater
								than current year
							</li>
							<li>cvv: three digits only </li>
						</ul>
					</div>
				</dialog>
			</div>

			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<label htmlFor="number">
						<span className="">Card number</span>
					</label>
					<input
						type="text"
						className="border border-slate-300 rounded-md w-1/2"
						name="number"
						onChange={handleOnChange}
						suppressHydrationWarning
					/>
				</div>
				{errors?.number && (
					<p className="text-red-500 font-sm italic text-right">
						Invalid Number
					</p>
				)}
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<label htmlFor="name">Name on card</label>
					<input
						type="text"
						className="border border-slate-300 rounded-md w-1/2"
						name="name"
						onChange={handleOnChange}
						suppressHydrationWarning
					/>
				</div>
				{errors?.name && (
					<p className="text-red-500 font-sm italic text-right">Invalid Name</p>
				)}
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<label htmlFor="month">Expiry month </label>
					<input
						type="number"
						className="border border-slate-300 rounded-md w-1/2"
						name="month"
						onChange={handleOnChange}
						suppressHydrationWarning
					/>
				</div>
				{errors?.month && (
					<p className="text-red-500 font-sm italic text-right">
						Invalid Month
					</p>
				)}
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<label htmlFor="year">Expiry year</label>
					<input
						type="number"
						className="border border-slate-300 rounded-md w-1/2"
						name="year"
						onChange={handleOnChange}
						suppressHydrationWarning
					/>
				</div>
				{errors?.year && (
					<p className="text-red-500 font-sm italic text-right">Invalid Year</p>
				)}
			</div>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between">
					<label htmlFor="cvv">cvv</label>
					<input
						type="number"
						className="border border-slate-300 rounded-md w-1/2"
						name="cvv"
						onChange={handleOnChange}
						suppressHydrationWarning
					/>
				</div>
				{errors?.cvv && (
					<p className="text-red-500 font-sm italic text-right">Invalid cvv</p>
				)}
			</div>
			{Object.keys(errors).length === 0 ? (
				<button
					suppressHydrationWarning
					className="cursor-pointer rounded-lg px-2 py-1 bg-blue-500 text-white w-25"
				>
					Submit
				</button>
			) : (
				<button
					suppressHydrationWarning
					className="rounded-lg px-2 py-1 bg-gray-300 text-white w-25"
				>
					Submit
				</button>
			)}
			<p className="text-sm italic text-gray-400">
				Form resets after 3 seconds
			</p>
		</form>
	);
};

export default CreditCard2;
