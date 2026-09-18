'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  LogOut,
  Sparkles,
  Package,
  Tag,
  Search,
  Check,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  description: string | null;
  image: string;
  has_discount: boolean;
  discount_percent: number | string;
  category_name: string | null;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    description: '',
    image: '',
    has_discount: false,
    discount_percent: '0',
    category_name: 'Men',
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchProducts();
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, [fetchProducts]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        toast.success('Welcome to Timeless Collections Admin');
        fetchProducts();
      } else {
        toast.error(data.message || 'Incorrect password');
      }
    } catch {
      toast.error('Login failed');
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setPassword('');
    toast.info('Logged out successfully');
  }

  function openCreateModal() {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      price: '',
      description: '',
      image: '',
      has_discount: false,
      discount_percent: '0',
      category_name: 'Men',
    });
    setIsModalOpen(true);
  }

  function openEditModal(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      price: String(product.price),
      description: product.description || '',
      image: product.image,
      has_discount: Boolean(product.has_discount),
      discount_percent: String(product.discount_percent || '0'),
      category_name: product.category_name || 'Men',
    });
    setIsModalOpen(true);
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormSubmitting(true);

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      price: Number(formData.price),
      description: formData.description,
      image: formData.image,
      has_discount: formData.has_discount,
      discount_percent: Number(formData.discount_percent) || 0,
      category_name: formData.category_name,
    };

    try {
      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success('Product updated successfully');
          setIsModalOpen(false);
          fetchProducts();
        } else {
          toast.error('Failed to update product');
        }
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          toast.success('Product created successfully');
          setIsModalOpen(false);
          fetchProducts();
        } else {
          toast.error('Failed to create product');
        }
      }
    } catch {
      toast.error('Error saving product');
    } finally {
      setFormSubmitting(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success(`Deleted ${name}`);
        setProducts(products.filter((p) => p.id !== id));
      } else {
        toast.error('Failed to delete product');
      }
    } catch {
      toast.error('Error deleting product');
    }
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.category_name && p.category_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // 1. Loading screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-lg font-heading text-gold-500 animate-pulse">Loading Admin...</p>
      </div>
    );
  }

  // 2. Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border dark:border-gold-500/30 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-500 flex items-center justify-center mx-auto border border-gold-500/30">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Timeless Collections Admin
            </h1>
            <p className="text-xs text-muted-foreground">
              Enter admin master password to access catalog control.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter password (e.g. sufi1234)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-border dark:border-gold-500/30 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              className="w-full py-6 font-bold text-sm bg-gold-500 text-black hover:bg-gold-600 rounded-xl shadow-lg shadow-gold-500/25 transition"
            >
              {loginLoading ? 'Authenticating...' : 'Access Dashboard'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Admin Dashboard
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-7xl space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 mb-2">
              <Sparkles className="h-3 w-3" />
              Neon Postgres Powered
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Catalog Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/products" target="_blank">
              <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-1.5">
                <span>View Store</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl text-destructive hover:bg-destructive/10 flex items-center gap-1.5"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-card border border-border/80 dark:border-gold-500/20 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total Fragrances</p>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/80 dark:border-gold-500/20 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Special Discounts</p>
              <p className="text-2xl font-bold text-foreground">
                {products.filter((p) => p.has_discount).length}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border/80 dark:border-gold-500/20 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Categories</p>
              <p className="text-2xl font-bold text-foreground">
                {new Set(products.map((p) => p.category_name).filter(Boolean)).size || 3}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by perfume or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
          </div>

          <Button
            onClick={openCreateModal}
            className="w-full sm:w-auto px-6 py-5 bg-gold-500 text-black hover:bg-gold-600 font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Fragrance</span>
          </Button>
        </div>

        {/* Products Table */}
        <div className="rounded-2xl border border-border/80 dark:border-gold-500/20 overflow-hidden bg-card shadow-sm">
          {loadingProducts ? (
            <div className="p-12 text-center text-muted-foreground">Loading catalog from Neon...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">No fragrances found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border/80 bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Discount</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredProducts.map((product) => {
                    const price = Number(product.price);
                    const discountedPrice =
                      product.has_discount && product.discount_percent
                        ? (price * (1 - Number(product.discount_percent) / 100)).toFixed(2)
                        : null;

                    return (
                      <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                        <td className="py-4 px-6 flex items-center gap-3">
                          <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/60">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : null}
                          </div>
                          <div>
                            <p className="font-heading font-bold text-foreground text-base">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">/{product.slug}</p>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-muted text-foreground border border-border/60">
                            {product.category_name || 'General'}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          {discountedPrice ? (
                            <div>
                              <p className="font-bold text-green-600 dark:text-green-400">
                                Rs. {discountedPrice}
                              </p>
                              <p className="text-xs line-through text-muted-foreground">
                                Rs. {price.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <p className="font-bold text-foreground">Rs. {price.toFixed(2)}</p>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          {product.has_discount ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400">
                              <Check className="h-3.5 w-3.5" />
                              {product.discount_percent}% OFF
                            </span>
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/products/${product.slug}`} target="_blank">
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Preview in store"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditModal(product)}
                              aria-label="Edit product"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product.id, product.name)}
                              aria-label="Delete product"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Dialog for Add / Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="w-full max-w-xl rounded-2xl bg-card border border-border/80 dark:border-gold-500/30 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {editingProduct ? 'Edit Fragrance' : 'Add New Fragrance'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Perfume Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Oud"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. royal-oud (auto-generated)"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Price (Rs.) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="2500"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category_name}
                      onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-gold-500 focus:outline-none"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Unisex">Unisex</option>
                      <option value="Exclusive">Exclusive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://... or /floramobile.jpeg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Use any high-res image link or local image path from /public (e.g. /lovedrop.jpeg).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Fragrance Notes &amp; Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the fragrance notes, sillage, bottle size (50ml)..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-gold-500 focus:outline-none"
                  />
                </div>

                {/* Discount options */}
                <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                      Enable Promotional Discount
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.has_discount}
                      onChange={(e) => setFormData({ ...formData, has_discount: e.target.checked })}
                      className="h-4 w-4 rounded text-gold-500 focus:ring-gold-500"
                    />
                  </div>

                  {formData.has_discount && (
                    <div>
                      <label className="block text-xs font-bold text-muted-foreground mb-1">
                        Discount Percentage (%)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        placeholder="30"
                        value={formData.discount_percent}
                        onChange={(e) => setFormData({ ...formData, discount_percent: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-6 py-2.5 bg-gold-500 text-black hover:bg-gold-600 font-bold rounded-xl shadow-md"
                  >
                    {formSubmitting ? 'Saving...' : editingProduct ? 'Save Changes' : 'Create Fragrance'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
