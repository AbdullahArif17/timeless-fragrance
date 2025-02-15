export default function Footer() {
	return (
	  <footer className="bg-gray-800 text-white mt-12 py-8">
		<div className="max-w-6xl mx-auto px-4 text-center">
		  <p className="text-sm">
			© {new Date().getFullYear()} Z&S Perfume Store. All rights reserved.
		  </p>
		</div>
	  </footer>
	);
  }