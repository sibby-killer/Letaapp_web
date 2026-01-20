# Leta Super-App 🚀
> **Hyper-Local Logistics Ecosystem for MMUST University**

Leta App is a unified digital platform designed to organize and automate the fragmented campus economy. By connecting Students, Vendors, and Logistics Agents (Riders) into a single "Super App," we replace manual phone calls and disorganized arrangements with a seamless, algorithm-driven "Order-to-Door" experience.

---

## 🧐 The Core Problem

**1. The Student Gap**  
Students in hostels often skip meals due to short breaks, bad weather, or laziness because walking to the gate takes too long.

**2. The Vendor Ceiling**  
Campus eateries are geographically limited to customers who walk in. They lose significant revenue during rain or exam periods.

**3. The Trust Deficit**  
Vendors don't trust riders with cash; Riders don't trust students to pay upon arrival. This friction slows down every transaction.

---

## 💡 The Leta Solution

*   **One App, Three Modes**: A single application that adapts its interface based on the logged-in user (Student, Vendor, or Rider).
*   **Automated Dispatch**: No human dispatcher needed. Our "Greedy Algorithm" automatically assigns orders to the nearest available rider within seconds.
*   **Trust-less Payments**: Money is split digitally at the moment of purchase via **Paystack**. Vendors get 100% of the food price, Riders get 80% of the delivery fee, and the Platform takes 20% instantly.
*   **Zero-Cost Mapping**: Built on **OpenStreetMap (OSM)** to eliminate exorbitant Google Maps API fees, keeping delivery costs student-friendly.

---

## 🛠️ Technology Stack

This project is built with a modern, high-performance stack designed for scale and real-time interaction.

*   **Frontend**: [Next.js 14+](https://nextjs.org/) (App Router, Server Components)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Emerald Green Theme, Glassmorphism)
*   **Animation**: [Framer Motion](https://www.framer.com/motion/) (Spring physics, smooth transitions)
*   **Authentication**: [Clerk](https://clerk.com/) (Multi-role support, Webhooks)
*   **Database & Realtime**: [Supabase](https://supabase.com/) (PostgreSQL, PostGIS, Realtime Subscriptions)
*   **Mapping**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/) (OpenStreetMap)
*   **Payments**: [Paystack](https://paystack.com/) (Split Payment API, M-Pesa integration)
*   **AI**: [Groq](https://groq.com/) (High-speed inference for smart search and recommendations)

---

## 🚀 Getting Started

To run this project locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sibby-killer/Letaapp_web.git
    cd Letaapp_web
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Copy `.env.local.example` to `.env.local` and properly configure your keys for Clerk, Supabase, Paystack, and Groq.
    *(See `SETUP_GUIDE.md` for detailed instructions)*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Open the App**:
    Visit [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment

The application is optimized for deployment on **Vercel**.

[**View Live Demo**]([https://leta-app-demo.vercel.app](https://letaapp-webv2.vercel.app/)) 

---

*Built with ❤️ for the MMUST Community.*
