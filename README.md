# 以下为核心 6 张表，可直接粘贴进 Supabase SQL 编辑器执行

-- 1️⃣ 材料分类表
create table material_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- 如：玻璃纤维 / 碳纤维 / 树脂
  description text,
  created_at timestamp default now()
);

-- 2️⃣ 材料信息表
create table materials (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- 材料名称
  category_id uuid references material_categories(id) on delete set null,
  brand text,
  model text,
  description text,
  properties jsonb, -- 存储性能参数，如 {"拉伸强度": "3500MPa", "密度": "2.5g/cm³"}
  image_url text,
  region text, -- 产地，如中国 / 日本
  created_at timestamp default now()
);

-- 3️⃣ 供应商表
create table suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- 公司名
  brand text,
  region text,
  contact_email text,
  contact_phone text,
  website text,
  description text,
  created_at timestamp default now()
);

-- 4️⃣ 材料-供应商关联表
create table material_suppliers (
  id uuid primary key default gen_random_uuid(),
  material_id uuid references materials(id) on delete cascade,
  supplier_id uuid references suppliers(id) on delete cascade,
  price numeric, -- 当前参考价格
  currency text default 'CNY',
  stock integer,
  delivery_time text, -- 交货周期
  updated_at timestamp default now()
);

-- 5️⃣ 价格走势表
create table material_prices (
  id uuid primary key default gen_random_uuid(),
  material_id uuid references materials(id) on delete cascade,
  date date not null,
  price numeric,
  currency text default 'CNY'
);

-- 6️⃣ 用户询盘表
create table material_inquiries (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  company text,
  material_id uuid references materials(id) on delete set null,
  quantity integer,
  budget numeric,
  message text,
  status text default 'pending', -- pending / contacted / closed
  created_at timestamp default now()
);

-- ===========================================
-- 7 品牌表：brands
-- ===========================================
CREATE TABLE material_brands (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT,
  website TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO material_brands (name, country, website) VALUES
  ('Taishan Fiberglass', '中国', 'https://www.taishanfiberglass.com'),
  ('Toray', '日本', 'https://www.toray.com'),
  ('Huntsman', '美国', 'https://www.huntsman.com'),
  ('Jushi Group', '中国', 'https://www.jushi.com');