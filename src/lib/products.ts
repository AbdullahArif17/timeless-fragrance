import { sql, DbProduct, DbCategory } from './db';

export async function getProducts(options?: { category?: string; search?: string }): Promise<DbProduct[]> {
  try {
    if (options?.category) {
      const rows = await sql`
        SELECT * FROM products 
        WHERE LOWER(category_name) = LOWER(${options.category}) 
           OR LOWER(category_id) = LOWER(${options.category})
        ORDER BY created_at DESC
      `;
      return rows as DbProduct[];
    }

    if (options?.search) {
      const searchPattern = `%${options.search.trim().toLowerCase()}%`;
      const rows = await sql`
        SELECT * FROM products 
        WHERE LOWER(name) LIKE ${searchPattern} 
           OR LOWER(description) LIKE ${searchPattern}
        ORDER BY created_at DESC
      `;
      return rows as DbProduct[];
    }

    const rows = await sql`
      SELECT * FROM products ORDER BY created_at DESC
    `;
    return rows as DbProduct[];
  } catch (error) {
    console.error("Error in getProducts:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  try {
    const rows = await sql`
      SELECT * FROM products WHERE slug = ${slug} LIMIT 1
    `;
    return (rows[0] as DbProduct) || null;
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
    return null;
  }
}

export async function getCategories(): Promise<DbCategory[]> {
  try {
    const rows = await sql`
      SELECT * FROM categories ORDER BY name ASC
    `;
    return rows as DbCategory[];
  } catch (error) {
    console.error("Error in getCategories:", error);
    return [];
  }
}

export async function createProduct(data: {
  name: string;
  slug: string;
  price: number;
  description?: string;
  image: string;
  has_discount?: boolean;
  discount_percent?: number;
  category_name?: string;
}): Promise<DbProduct | null> {
  try {
    const id = `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const categoryId = data.category_name ? `cat-${data.category_name.toLowerCase()}` : null;

    if (data.category_name) {
      await sql`
        INSERT INTO categories (id, name, slug)
        VALUES (${categoryId}, ${data.category_name}, ${data.category_name.toLowerCase()})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    const rows = await sql`
      INSERT INTO products (
        id, name, slug, price, description, image, has_discount, discount_percent, category_id, category_name
      ) VALUES (
        ${id},
        ${data.name},
        ${data.slug},
        ${data.price},
        ${data.description || null},
        ${data.image},
        ${Boolean(data.has_discount)},
        ${Number(data.discount_percent) || 0},
        ${categoryId},
        ${data.category_name || null}
      )
      RETURNING *
    `;
    return (rows[0] as DbProduct) || null;
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    price: number;
    description: string;
    image: string;
    has_discount: boolean;
    discount_percent: number;
    category_name: string;
  }>
): Promise<DbProduct | null> {
  try {
    const categoryId = data.category_name ? `cat-${data.category_name.toLowerCase()}` : null;

    if (data.category_name) {
      await sql`
        INSERT INTO categories (id, name, slug)
        VALUES (${categoryId}, ${data.category_name}, ${data.category_name.toLowerCase()})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    const rows = await sql`
      UPDATE products
      SET
        name = COALESCE(${data.name}, name),
        slug = COALESCE(${data.slug}, slug),
        price = COALESCE(${data.price}, price),
        description = COALESCE(${data.description}, description),
        image = COALESCE(${data.image}, image),
        has_discount = COALESCE(${data.has_discount}, has_discount),
        discount_percent = COALESCE(${data.discount_percent}, discount_percent),
        category_name = COALESCE(${data.category_name}, category_name),
        category_id = COALESCE(${categoryId}, category_id),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    return (rows[0] as DbProduct) || null;
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return false;
  }
}
