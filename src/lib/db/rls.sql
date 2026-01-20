-- Enable RLS on all tables
alter table profiles enable row level security;
alter table wallets enable row level security;
alter table transactions enable row level security;
alter table stores enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table riders enable row level security;
alter table referrals enable row level security;

-- 1. PROFILES
-- Anyone can read profiles (needed for showing vendor/rider names)
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- 2. WALLETS (Strict Security)
-- Users can only view their own wallet
create policy "Users can view own wallet"
  on wallets for select
  using ( auth.uid() = profile_id );

-- 3. STORES
-- Anyone can view open stores
create policy "Stores are viewable by everyone"
  on stores for select
  using ( true );

-- Vendors can update their own store
create policy "Vendors can update own store"
  on stores for update
  using ( auth.uid() = vendor_id );

-- Vendors can insert their own store
create policy "Vendors can create store"
  on stores for insert
  with check ( auth.uid() = vendor_id );

-- 4. PRODUCTS
-- Public view
create policy "Products are viewable by everyone"
  on products for select
  using ( true );

-- Vendor manage
create policy "Vendors manage their products"
  on products for all
  using ( 
    exists (
      select 1 from stores
      where stores.id = products.store_id
      and stores.vendor_id = auth.uid()
    )
  );

-- 5. ORDERS
-- Users can see their own orders (Customer, Vendor, Rider)
create policy "Users can view own orders"
  on orders for select
  using (
    auth.uid() = customer_id or 
    exists (select 1 from stores where stores.id = orders.store_id and stores.vendor_id = auth.uid()) or
    auth.uid() = rider_id
  );

-- Customers can create orders
create policy "Customers can create orders"
  on orders for insert
  with check ( auth.uid() = customer_id );

-- 6. RIDERS
-- Public view (for tracking) - In production, might want to limit this to active orders
create policy "Riders are viewable by everyone"
  on riders for select
  using ( true );

-- Riders update their own status/location
create policy "Riders update own location"
  on riders for update
  using ( auth.uid() = id );

