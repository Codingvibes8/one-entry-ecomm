-- Insert sample products
INSERT INTO products (name, description, price, category, subcategory, images, sizes, colors, stock, featured) VALUES
-- Shoes
('Nike Air Max 270', 'Comfortable running shoes with Air Max technology for all-day comfort and style.', 129.99, 'shoes', 'sneakers', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Black', 'White', 'Blue'], 100, true),

('Adidas Ultraboost 22', 'Premium running shoes with Boost midsole technology for energy return.', 189.99, 'shoes', 'running', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Black', 'White', 'Gray'], 75, true),

('Converse Chuck Taylor All Star', 'Classic canvas sneakers that never go out of style.', 59.99, 'shoes', 'casual', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Black', 'White', 'Red'], 150, false),

('Timberland 6-Inch Premium Boot', 'Waterproof leather boots perfect for outdoor adventures.', 199.99, 'shoes', 'boots', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['7', '8', '9', '10', '11', '12'], 
 ARRAY['Wheat', 'Black', 'Brown'], 50, true),

-- Clothing
('Levi''s 501 Original Jeans', 'The original straight fit jeans that started it all.', 89.99, 'clothing', 'jeans', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['30', '32', '34', '36', '38', '40'], 
 ARRAY['Blue', 'Black', 'Gray'], 200, true),

('Nike Dri-FIT T-Shirt', 'Moisture-wicking t-shirt perfect for workouts and casual wear.', 24.99, 'clothing', 't-shirts', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Black', 'White', 'Navy', 'Gray'], 300, false),

('Patagonia Better Sweater Fleece', 'Cozy fleece jacket made from recycled polyester.', 119.99, 'clothing', 'jackets', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Navy', 'Black', 'Gray', 'Green'], 80, true),

('Ralph Lauren Polo Shirt', 'Classic polo shirt with iconic polo player logo.', 79.99, 'clothing', 'polo', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['White', 'Navy', 'Red', 'Green'], 120, false),

('Champion Reverse Weave Hoodie', 'Premium heavyweight hoodie with reverse weave construction.', 69.99, 'clothing', 'hoodies', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['S', 'M', 'L', 'XL', 'XXL'], 
 ARRAY['Black', 'Gray', 'Navy', 'Maroon'], 90, true),

('Dockers Alpha Khaki Chinos', 'Slim tapered chinos perfect for casual and business casual wear.', 59.99, 'clothing', 'pants', 
 ARRAY['/placeholder.svg?height=400&width=400'], 
 ARRAY['30', '32', '34', '36', '38', '40'], 
 ARRAY['Khaki', 'Navy', 'Black', 'Olive'], 150, false);
