-- Clear existing products first (optional)
-- DELETE FROM products;

-- Insert sample products with real image paths
INSERT INTO products (name, description, price, category, subcategory, images, sizes, colors, stock, featured) VALUES
-- Shoes
('Nike Air Max 270', 'Comfortable running shoes with Air Max technology featuring visible air cushioning for all-day comfort and style.', 159.99, 'shoes', 'sneakers', 
 ARRAY['/images/products/nike-air-max.jpg'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['White', 'Red', 'Black'], 85, true),

('Adidas Ultraboost 22', 'Premium running shoes with Boost midsole technology for superior energy return and comfort during your runs.', 189.99, 'shoes', 'running', 
 ARRAY['/images/products/adidas-ultraboost.jpg'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Black', 'Gray', 'White'], 62, true),

('Converse Chuck Taylor All Star', 'Classic canvas sneakers that never go out of style. The iconic design that has been a favorite for decades.', 65.99, 'shoes', 'casual', 
 ARRAY['/images/products/converse-black.jpg'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Black', 'White', 'Red'], 120, false),

('Premium White Sneakers', 'Minimalist white leather sneakers with clean lines that complement any casual outfit perfectly.', 129.99, 'shoes', 'casual', 
 ARRAY['/images/products/white-sneakers.jpg'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['White', 'Off-White', 'Cream'], 75, true),

('Converse Chuck Taylor Classic', 'The timeless Chuck Taylor All Star in classic black. An essential sneaker for every wardrobe.', 59.99, 'shoes', 'casual', 
 ARRAY['/images/products/converse-classic.jpg'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Black', 'White', 'Navy'], 140, false),

-- Clothing
('Levi''s 501 Original Jeans', 'The original straight fit jeans that started it all. Authentic selvedge denim with classic leather patch.', 98.99, 'clothing', 'jeans', 
 ARRAY['/images/products/levis-jeans.jpg'], 
 ARRAY['30', '32', '34', '36', '38', '40'], 
 ARRAY['Indigo', 'Dark Blue', 'Black'], 150, true),

('Premium Selvedge Jeans', 'High-quality selvedge denim jeans with authentic leather patch and modern slim fit for contemporary style.', 189.99, 'clothing', 'jeans', 
 ARRAY['/images/products/premium-jeans.jpg'], 
 ARRAY['30', '32', '34', '36', '38', '40'], 
 ARRAY['Indigo', 'Dark Blue', 'Black'], 95, true),

('Nike Dri-FIT Performance T-Shirt', 'Moisture-wicking performance t-shirt perfect for workouts and active lifestyle. Breathable fabric technology.', 34.99, 'clothing', 't-shirts', 
 ARRAY['/images/products/nike-tshirt.jpg'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Black', 'White', 'Navy', 'Gray'], 200, false),

('Tailored Navy Blazer', 'Sophisticated navy blazer crafted from premium wool blend fabric, perfect for business and formal occasions.', 449.99, 'clothing', 'blazers', 
 ARRAY['/images/products/navy-blazer.jpg'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Navy', 'Charcoal', 'Black'], 28, true),

('Patagonia Better Sweater Fleece', 'Cozy fleece pullover made from recycled polyester. Perfect for outdoor adventures and casual wear.', 119.99, 'clothing', 'fleece', 
 ARRAY['/images/products/patagonia-fleece.jpg'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Beige', 'Navy', 'Black', 'Gray'], 65, true);

-- Verify the data was inserted
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category;
