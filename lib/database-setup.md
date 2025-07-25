# Database Setup Instructions

## Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Navigate to your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the table creation script**
   - Copy the entire content from `scripts/01-create-tables.sql`
   - Paste it into the SQL editor
   - Click "Run" button

4. **Run the seed data script**
   - Create another new query
   - Copy the entire content from `scripts/02-seed-products.sql`
   - Paste it into the SQL editor
   - Click "Run" button

## Option 2: Using Supabase CLI

1. **Install Supabase CLI**
   \`\`\`bash
   npm install -g supabase
   \`\`\`

2. **Login to Supabase**
   \`\`\`bash
   supabase login
   \`\`\`

3. **Link your project**
   \`\`\`bash
   supabase link --project-ref YOUR_PROJECT_REF
   \`\`\`

4. **Run migrations**
   \`\`\`bash
   supabase db push
   \`\`\`

## Option 3: Using psql (Advanced)

1. **Get your database URL from Supabase dashboard**
   - Go to Settings > Database
   - Copy the connection string

2. **Connect using psql**
   \`\`\`bash
   psql "your-connection-string"
   \`\`\`

3. **Run the SQL files**
   \`\`\`sql
   \i scripts/01-create-tables.sql
   \i scripts/02-seed-products.sql
   \`\`\`

## Verification

After running the scripts, verify everything worked:

1. **Check tables were created**
   \`\`\`sql
   \dt
   \`\`\`

2. **Check products were inserted**
   \`\`\`sql
   SELECT COUNT(*) FROM products;
   SELECT * FROM products LIMIT 5;
   \`\`\`

3. **Check in Supabase Dashboard**
   - Go to "Table Editor"
   - You should see: users, products, cart_items, orders, order_items
   - Click on "products" table to see your data

## Environment Variables

Make sure your `.env.local` file has:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
