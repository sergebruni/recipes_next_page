import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<main className="container mx-auto px-4">
				{children}
			</main>
			<Footer />
		</>
	);
}

export default Layout;