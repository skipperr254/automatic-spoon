import supabase from "./supabase";
import type { Tables } from "../types/supabase";

export type Product = Tables<"products"> & {
  category: Tables<"categories"> | null;
  brand: Tables<"brands"> | null;
  images: Tables<"product_images">[];
  reviews?: Tables<"reviews">[];
};

export type Category = Tables<"categories">;
export type Brand = Tables<"brands">;
export type CartItem = Tables<"cart_items"> & {
  product: Product;
};
export type Order = Tables<"orders"> & {
  items: (Tables<"order_items"> & {
    product: Product;
  })[];
};
export type Review = Tables<"reviews"> & {
  user: Tables<"profiles">;
};

export const api = {
  products: {
    async list({
      category,
      brand,
      featured,
      limit = 12,
      offset = 0,
      search,
    }: {
      category?: string;
      brand?: string;
      featured?: boolean;
      limit?: number;
      offset?: number;
      search?: string;
    } = {}) {
      let query = supabase
        .from("products")
        .select(
          `
          *,
          category:categories(*),
          brand:brands(*),
          images:product_images(*)
        `
        )
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

      if (category) {
        query = query.eq("category.slug", category);
      }

      if (brand) {
        query = query.eq("brand.slug", brand);
      }

      if (featured !== undefined) {
        query = query.eq("featured", featured);
      }

      if (search) {
        query = query.ilike("name", `%${search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Product[];
    },

    async getBySlug(slug: string) {
      const { data, error } = await supabase
        .from("products")
        .select(
          `
          *,
          category:categories(*),
          brand:brands(*),
          images:product_images(*),
          reviews:reviews(
            *,
            user:profiles(*)
          )
        `
        )
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Product & { reviews: Review[] };
    },

    async create(product: {
      name: string;
      slug: string;
      description?: string;
      price: number;
      compare_at_price?: number;
      category_id?: string;
      brand_id?: string;
      stock: number;
      featured?: boolean;
      images: { url: string; alt?: string }[];
    }) {
      const { data: productData, error: productError } = await supabase
        .from("products")
        .insert([
          {
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price,
            compare_at_price: product.compare_at_price,
            category_id: product.category_id,
            brand_id: product.brand_id,
            stock: product.stock,
            featured: product.featured,
          },
        ])
        .select()
        .single();

      if (productError) throw productError;

      const images = product.images.map((image, index) => ({
        product_id: productData.id,
        url: image.url,
        alt: image.alt,
        position: index,
      }));

      const { error: imagesError } = await supabase
        .from("product_images")
        .insert(images);

      if (imagesError) throw imagesError;

      return productData;
    },

    async update(
      id: string,
      product: {
        name?: string;
        slug?: string;
        description?: string;
        price?: number;
        compare_at_price?: number;
        category_id?: string;
        brand_id?: string;
        stock?: number;
        featured?: boolean;
        images?: { url: string; alt?: string }[];
      }
    ) {
      const { data: productData, error: productError } = await supabase
        .from("products")
        .update({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          compare_at_price: product.compare_at_price,
          category_id: product.category_id,
          brand_id: product.brand_id,
          stock: product.stock,
          featured: product.featured,
        })
        .eq("id", id)
        .select()
        .single();

      if (productError) throw productError;

      if (product.images) {
        // Delete existing images
        const { error: deleteError } = await supabase
          .from("product_images")
          .delete()
          .eq("product_id", id);

        if (deleteError) throw deleteError;

        // Insert new images
        const images = product.images.map((image, index) => ({
          product_id: id,
          url: image.url,
          alt: image.alt,
          position: index,
        }));

        const { error: imagesError } = await supabase
          .from("product_images")
          .insert(images);

        if (imagesError) throw imagesError;
      }

      return productData;
    },

    async delete(id: string) {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
    },
  },

  categories: {
    async list() {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Category[];
    },
  },

  brands: {
    async list() {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Brand[];
    },
  },

  cart: {
    async getItems() {
      const { data, error } = await supabase
        .from("cart_items")
        .select(
          `
          *,
          product:products(
            *,
            category:categories(*),
            brand:brands(*),
            images:product_images(*)
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CartItem[];
    },

    async addItem(productId: string, quantity: number) {
      const { data, error } = await supabase
        .from("cart_items")
        .upsert({
          product_id: productId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          quantity,
        })
        .select();

      if (error) throw error;
      return data;
    },

    async updateQuantity(itemId: string, quantity: number) {
      const { data, error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", itemId)
        .select();

      if (error) throw error;
      return data;
    },

    async removeItem(itemId: string) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
    },

    async clear() {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;
    },
  },

  orders: {
    async list() {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          items:order_items(
            *,
            product:products(
              *,
              category:categories(*),
              brand:brands(*),
              images:product_images(*)
            )
          )
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          items:order_items(
            *,
            product:products(
              *,
              category:categories(*),
              brand:brands(*),
              images:product_images(*)
            )
          )
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Order;
    },

    async create(order: {
      total: number;
      shipping_address: any;
      billing_address: any;
      items: { product_id: string; quantity: number; price: number }[];
    }) {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: (await supabase.auth.getUser()).data.user?.id,
            status: "pending",
            total: order.total,
            shipping_address: order.shipping_address,
            billing_address: order.billing_address,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = order.items.map((item) => ({
        order_id: orderData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return orderData;
    },
  },

  reviews: {
    async create(review: {
      product_id: string;
      rating: number;
      comment?: string;
    }) {
      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            product_id: review.product_id,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            rating: review.rating,
            comment: review.comment,
          },
        ])
        .select();

      if (error) throw error;
      return data;
    },

    async update(
      id: string,
      review: {
        rating: number;
        comment?: string;
      }
    ) {
      const { data, error } = await supabase
        .from("reviews")
        .update({
          rating: review.rating,
          comment: review.comment,
        })
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase.from("reviews").delete().eq("id", id);

      if (error) throw error;
    },
  },
};
