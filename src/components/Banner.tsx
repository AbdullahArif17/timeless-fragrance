const today = new Date();
const showBanner = today < new Date('2025-08-15');

export default function Banner() {
  if (!showBanner) return null;

  return (
    <div className="bg-green-600 text-white text-center py-2 px-4 text-sm font-medium animate-pulse">
      🎉 Independence Day Sale – Get up to 30% OFF! Offer valid until 14th August 🇵🇰
    </div>
  );
}