import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let sqlClient: NeonQueryFunction<false, false> | null = null;

function getClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return null;
  }
  if (!sqlClient) {
    sqlClient = neon(url);
  }
  return sqlClient;
}

export const sql = ((strings: TemplateStringsArray, ...values: unknown[]) => {
  const client = getClient();
  if (!client) {
    console.warn('DATABASE_URL is not configured.');
    return Promise.resolve([]);
  }
  return client(strings, ...values);
}) as unknown as NeonQueryFunction<false, false>;

export interface DbProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  image: string;
  has_discount: boolean;
  discount_percent: number;
  category_id: string | null;
  category_name: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}
