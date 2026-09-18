import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/products';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const products = await getProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Admin products fetch error:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!data.name || !data.price || !data.image) {
      return NextResponse.json({ error: 'Name, price, and image are required' }, { status: 400 });
    }

    const slug = (data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));

    const product = await createProduct({
      name: data.name,
      slug,
      price: Number(data.price),
      description: data.description,
      image: data.image,
      has_discount: Boolean(data.has_discount),
      discount_percent: Number(data.discount_percent) || 0,
      category_name: data.category_name,
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Admin product create error:", error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
