// "use client";

// import { useState } from "react";
// import { useCart } from "@/app/cart/CartContext";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

 export default function CheckoutPage() {
//   const { cart, calculateTotal, clearCart } = useCart();
//   const [phone, setPhone] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handlePayment = async () => {
//     if (!phone.match(/^03\d{9}$/)) {
//       alert("Please enter a valid Easypaisa number (03XXXXXXXXX).");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       const response = await fetch("/api/easypaisa-payment", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phone, amount: calculateTotal() }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         alert("Payment successful! Your order is confirmed.");
//         clearCart();
//       } else {
//         alert("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       alert("Error processing payment. Try again later.");
//     }

//     setIsProcessing(false);
//   };

//   return (
//     <div className="container mx-auto py-12 px-6 max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-lg">
//       <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
//         Checkout
//       </h1>

//       {cart.length === 0 ? (
//         <p className="text-center text-xl text-gray-700 dark:text-gray-300">
//           Your cart is empty.
//         </p>
//       ) : (
//         <div className="space-y-6">
//           {/* Order Summary */}
//           <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
//             Order Summary
//           </h2>
//           <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
//             {cart.map((item) => (
//               <div key={item.id} className="flex items-center space-x-4 mb-4">
//                 <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{item.name}</h3>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Rs. {item.price} x {item.quantity}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             <p className="text-lg font-bold mt-4 text-gray-900 dark:text-gray-100">
//               Total: Rs. {calculateTotal().toFixed(2)}
//             </p>
//           </div>

//           {/* Payment Section */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//               Payment
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400">Enter your Easypaisa account number:</p>
//             <input
//               type="text"
//               placeholder="03XXXXXXXXX"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full p-3 border rounded-md mt-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//             />
//             <Button
//               onClick={handlePayment}
//               className="w-full mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3"
//               disabled={isProcessing}
//             >
//               <Image src={"/easypaisa-logo.png"} alt="Easypaisa" width={30} height={30} className="rounded-md" />
//               {isProcessing ? "Processing..." : "Pay with Easypaisa"}
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Back to Cart */}
//       <div className="text-center mt-6">
//         <Link href="/cart">
//           <Button variant="outline">Go Back to Cart</Button>
//         </Link>
//       </div>
//     </div>
//   );
}
