import { NextRequest, NextResponse } from 'next/server';
import { updateProduct, deleteProduct } from '@/lib/products';

function checkAuth(request: NextRequest): boolean {
  const session = request.cookies.get('admin_session')?.value;
  return session === 'authenticated_sufi1234';
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();

    const product = await updateProduct(id, {
      name: data.name,
      slug: data.slug,
      price: data.price !== undefined ? Number(data.price) : undefined,
      description: data.description,
      image: data.image,
      has_discount: data.has_discount !== undefined ? Boolean(data.has_discount) : undefined,
      discount_percent: data.discount_percent !== undefined ? Number(data.discount_percent) : undefined,
      category_name: data.category_name,
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Admin product update error:", error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteProduct(id);
    return NextResponse.json({ success });
  } catch (error) {
    console.error("Admin product delete error:", error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
