# Leta Super-App Complete Setup Guide

This guide provides detailed, step-by-step instructions to configure the Leta Super-App environment.

## Phase 1: Authentication (Clerk)

### 1. Create a Clerk Application
1.  Go to [dashboard.clerk.com](https://dashboard.clerk.com) and sign in.
2.  Click **"Create Application"**.
3.  Name it "Leta App".
4.  Select **"Email"** and **"Google"** as authentication methods (or any others you prefer).
5.  Click **"Create Application"**.

### 2. Get API Keys
1.  On the sidebar, go to **"API Keys"**.
2.  Copy the `Publishable key` and paste it into your `.env.local` file as `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`.
3.  Copy the `Secret key` and paste it into `.env.local` as `CLERK_SECRET_KEY`.

### 3. Setup Webhooks (CRITICAL STEP)
You need a webhook to tell Supabase when a new user registers.
1.  On the Clerk Sidebar, click **"Webhooks"**.
2.  Click **"Add Endpoint"**.
3.  **Endpoint URL**:
    *   **Development**: If you are running locally, you need a tunnel (like ngrok).
        *   Run `npx ngrok http 3000` in your terminal.
        *   Copy the forwarding URL (e.g., `https://random-id.ngrok-free.app`).
        *   Add `/api/webhooks/clerk` to the end.
        *   Final URL: `https://random-id.ngrok-free.app/api/webhooks/clerk`
    *   **Production (Vercel)**: `https://your-project-name.vercel.app/api/webhooks/clerk`
4.  **Message Filtering**:
    *   Scroll down to "Subscribe to events".
    *   Select **`user.created`** and **`user.updated`**.
5.  Click **"Create"**.

### 4. Get the Webhook Secret
1.  Once created, you will see the webhook details page.
2.  Look for **"Signing Secret"** on the right side.
3.  Click the **Eye Icon** to reveal it.
4.  Copy this value (starts with `whsec_...`).
5.  Paste it into `.env.local` as `WEBHOOK_SECRET`.

---

## Phase 2: Database (Supabase)

### 1. Create Project
1.  Go to [supabase.com](https://supabase.com) and create a new project.
2.  Region: Choose the one closest to you (e.g., Cape Town or London).
3.  Database Password: **Save this securely!**

### 2. Get API Keys
1.  Go to **Project Settings** (gear icon) -> **API**.
2.  Copy the `Project URL` -> `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`.
3.  Copy the `anon public` key -> `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Run Database Migrations
1.  In Supabase, go to the **SQL Editor** (sidebar).
2.  Click **"New Query"**.
3.  Copy the contents of the file `src/lib/db/schema.sql` from this project.
4.  Paste it into the editor and click **"Run"**.
    *   *Success*: You should see "Success, no rows returned".
5.  Click **"New Query"** again.
6.  Copy the contents of `src/lib/db/rls.sql`.
7.  Paste and click **"Run"**.

---

## Phase 3: Payments (Paystack)

### 1. Create Account
1.  Go to [paystack.com](https://paystack.com) and sign up.
2.  Make sure you are in **Test Mode** (toggle at the top right of the dashboard).

### 2. Get API Keys
1.  Go to **Settings** -> **API Keys & Webhooks**.
2.  Copy `Public Key` -> `.env.local` as `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`.
3.  Copy `Secret Key` -> `.env.local` as `PAYSTACK_SECRET_KEY`.

---

## Phase 4: AI (Groq)

1.  Go to [console.groq.com](https://console.groq.com).
2.  Create an API Key.
3.  Copy it -> `.env.local` as `GROQ_API_KEY`.

---

## Final Checklist
Your `.env.local` file should look like this (but with real values):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...

NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...

GROQ_API_KEY=gsk_...
```

Run the app:
```bash
npm run dev
```
