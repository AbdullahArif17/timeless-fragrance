import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_VqyTN60HPmhg@ep-wild-rice-ar3ofl11-pooler.c-4.us-west-2.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(connectionString);

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
