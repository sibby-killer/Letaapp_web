-- Leta App Database Schema

-- Enable PostGIS for geospatial queries (Critical for "Greedy Algorithm")
create extension if not exists postgis;

-- 1. USERS & PROFILES
create type user_role as enum ('student', 'vendor', 'rider', 'admin');

create table profiles (
  id uuid references auth.users not null primary key,
  role user_role default 'student',
  full_name text,
  avatar_url text,
  phone_number text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. WALLETS (Financial Core)
create table wallets (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) not null unique,
  balance numeric(10, 2) default 0.00,
  currency text default 'KES',
  updated_at timestamptz default now()
);

create type transaction_type as enum ('deposit', 'withdrawal', 'payment', 'commission', 'earning');
create type transaction_status as enum ('pending', 'completed', 'failed');

create table transactions (
  id uuid default gen_random_uuid() primary key,
  wallet_id uuid references wallets(id) not null,
  amount numeric(10, 2) not null,
  type transaction_type not null,
  status transaction_status default 'pending',
  reference_id text, -- M-Pesa or Paystack Ref
  description text,
  created_at timestamptz default now()
);

-- 3. STORES (Vendors)
create table stores (
  id uuid default gen_random_uuid() primary key,
  vendor_id uuid references profiles(id) not null,
  name text not null,
  description text,
  image_url text, -- Store cover image
  is_open boolean default false,
  location geography(POINT), -- PostGIS location
  address_text text,
  rating numeric(2, 1) default 5.0,
  created_at timestamptz default now()
);

create table categories (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references stores(id) not null,
  name text not null,
  sort_order int default 0
);

create table products (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references stores(id) not null,
  category_id uuid references categories(id),
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- 4. RIDERS (Logistics)
create table riders (
  id uuid references profiles(id) not null primary key,
  is_online boolean default false,
  current_location geography(POINT), -- Real-time location
  last_location_update timestamptz,
  vehicle_type text default 'bicycle', -- bicycle, motorbike
  
  -- Metrics (Bolt Food Style)
  activity_score int default 100, -- 0-100
  acceptance_rate numeric(3, 2) default 1.00, -- percentage
  total_deliveries int default 0
);

-- 5. ORDERS (The Core Flow)
create type order_status as enum (
  'pending_payment',
  'placed', -- Paid, waiting for vendor
  'preparing', -- Vendor accepted
  'ready_for_pickup', -- Vendor clicked "Food Ready" -> Triggers Dispatch
  'rider_assigned', -- Rider accepted
  'picked_up',
  'delivered',
  'cancelled'
);

create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references profiles(id) not null,
  store_id uuid references stores(id) not null,
  rider_id uuid references riders(id),
  
  status order_status default 'pending_payment',
  
  -- Financials
  total_amount numeric(10, 2) not null,
  delivery_fee numeric(10, 2) not null,
  platform_fee numeric(10, 2) not null, -- 20% of delivery
  tax_fee numeric(10, 2) default 5.00,
  
  -- Locations
  delivery_location geography(POINT),
  delivery_address text,
  
  -- Timestamps
  created_at timestamptz default now(),
  accepted_at timestamptz, -- Vendor accept
  ready_at timestamptz, -- Food Ready
  picked_up_at timestamptz,
  delivered_at timestamptz
);

create table order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) not null,
  product_id uuid references products(id) not null,
  quantity int not null,
  price_at_time numeric(10, 2) not null
);

-- 6. REFERRALS (Growth Engine)
create table referrals (
  id uuid default gen_random_uuid() primary key,
  referrer_id uuid references profiles(id) not null,
  referred_user_id uuid references profiles(id) not null, -- The new user
  
  status text default 'pending', -- pending, completed (first order done/10 deliveries done)
  reward_amount numeric(10, 2) default 0,
  type text not null, -- 'student_invite', 'rider_invite', 'vendor_invite'
  
  created_at timestamptz default now()
);

-- 7. REVIEWS
create table reviews (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) not null unique,
  rating int not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);
