// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { phone, amount } = await req.json();

//     // Simulated Easypaisa API Request (Replace with actual API)
//     console.log(`Processing Easypaisa Payment - Phone: ${phone}, Amount: ${amount}`);

//     // Here, you would send a request to Easypaisa API to process the payment
//     const paymentSuccess = true; // Simulated success

//     if (paymentSuccess) {
//       return NextResponse.json({ success: true, message: "Payment successful!" });
//     } else {
//       return NextResponse.json({ success: false, message: "Payment failed!" });
//     }
//   } catch (error) {
//     return NextResponse.json({ success: false, message: "Server error processing payment." });
//   }
// }
