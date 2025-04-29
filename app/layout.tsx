import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Credit Card Form",
	description: "Form with basic validation",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
			// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
