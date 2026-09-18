import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  try {
    const products = await getProducts({ search: query });
    const formatted = products.map((p) => ({
      _id: p.id,
      name: p.name,
      slug: { current: p.slug },
      price: Number(p.price),
      description: p.description,
      image: p.image,
      hasDiscount: p.has_discount,
      discountPercent: p.discount_percent,
      category: p.category_name,
    }));

    const results = limit ? formatted.slice(0, limit) : formatted;
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
