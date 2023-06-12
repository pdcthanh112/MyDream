SELECT product.id, product.name, category.name as category, subcategory.name as subcategor,
price, quantity, description,
image, sold, production, rating.vote as ratingVote, rating.value as ratingValue
FROM product JOIN category on product.category = category.id
			JOIN subcategory on product.subcategory = subcategory.id
			JOIN rating on product.rating = rating.id
WHERE CONCAT(product.name, category.name, subcategory.name) ILIKE '%book%'			
			
			
WHERE product.name ILIKE '%conan%'
   OR category.name ILIKE '%conan%'
   OR subcategory.name ILIKE '%conan%'
   OR CAST(price AS TEXT) ILIKE '%conan%';

