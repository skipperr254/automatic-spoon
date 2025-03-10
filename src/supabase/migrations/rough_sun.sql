/*
    # Add admin role and policies for product management

    1. New Roles
        - Create admin role for managing products
    
    2. Security
        - Add policies for admin product management
        - Only admins can create/update/delete products
*/

-- Create admin role
CREATE ROLE admin;

-- Add policies for product management
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage products"
ON products
FOR ALL
TO admin
USING (true)
WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Amyone can view products"
ON products
FOR SELECT
TO PUBLIC
USING (true);

-- Add policies for product images
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage product images"
ON product_images
FOR ALL
TO admin
USING (true)
WITH CHECK (true);

CREATE POLICY "Anyone can view product images"
ON product_images
FOR SELECT
TO PUBLIC
USING (true);