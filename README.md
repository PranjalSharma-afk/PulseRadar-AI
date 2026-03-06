## PulseRadar AI – Wellness Trend Intelligence for India

PulseRadar AI is a production-ready SaaS-style demo that surfaces emerging wellness product opportunities in India using live-style multi-signal data (search, social, reviews, and content).  
The frontend is a Next.js app optimised for Vercel, and the backend is a FastAPI service exposing trend, scoring, and opportunity brief endpoints.

### Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Python FastAPI
- **Database**: Designed for PostgreSQL/Supabase integration (mock in-memory data in this demo)
- **Deployment**: Next.js to Vercel, FastAPI to any Python-friendly host (Railway, Fly.io, Render, etc.)

---

### 1. Local Development

#### 1.1. Frontend (Next.js)

```bash
cd pulseradar-ai

# Install Node dependencies
npm install

# Run the Next.js dev server
npm run dev

# App will be available at http://localhost:3000
```

#### 1.2. Backend (FastAPI)

```bash
cd pulseradar-ai/backend

# (Recommended) Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# API will be available at http://localhost:8000
```

The frontend is configured to talk to `http://localhost:8000/api` by default via:

- `lib/api.ts` (base URL: `NEXT_PUBLIC_API_BASE_URL` or `http://localhost:8000/api`)

So once both servers are running, the UI will call the FastAPI endpoints. If the API is down, the UI falls back to local mock data.

---

### 2. Available API Endpoints (FastAPI)

Base path: `http://localhost:8000/api`

- **GET `/health`** – Simple health check.
- **GET `/trend-signals`** – Returns an array of trend signals (name, score, growth metrics, competition, etc.).
- **GET `/trend-signals/{trend_id}/series`** – Time-series data for a trend (search interest, social volume, content creation).
- **GET `/opportunity-briefs/{trend_id}`** – Full opportunity brief for a given trend.
- **GET `/trend-scoring`** – Returns the four scoring categories and their weights.
- **GET `/trend-scoring/pain-points`** – Returns consumer quotes + AI-generated insight summaries.

All data is currently served from in-memory mock structures but the models and handlers are structured so you can swap in PostgreSQL/Supabase reads later.

---

### 3. Production Build

```bash
cd pulseradar-ai
npm run build
npm start  # Runs the built Next.js app
```

For the backend:

```bash
cd pulseradar-ai/backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

### 4. Deploying to Vercel (Frontend)

1. Push the `pulseradar-ai` folder to a Git repository (GitHub, GitLab, etc.).
2. In Vercel, **Import Project** and select this repository.
3. Set the **Project Root** to the `pulseradar-ai` directory if needed.
4. In **Environment Variables** on Vercel, configure:

   - `NEXT_PUBLIC_API_BASE_URL=https://your-fastapi-hostname.com/api`

5. Deploy – Vercel will build and host the Next.js app with optimal edge caching.

> Note: Vercel does not currently run FastAPI directly; you typically deploy FastAPI separately (Railway, Fly.io, Render, etc.) and point `NEXT_PUBLIC_API_BASE_URL` to that URL.

---

### 5. Deploying the FastAPI Backend

FastAPI can be deployed to any standard Python host. A minimal `uvicorn` command looks like:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

On most platforms you will:

1. Create an app/service using Python 3.11+.
2. Install dependencies with `pip install -r backend/requirements.txt`.
3. Set a start command similar to the one above.
4. Optionally configure `DATABASE_URL` (PostgreSQL/Supabase) for future data persistence.

---

### 6. Where to Plug in PostgreSQL / Supabase

The current demo uses in-memory mock structures, but the intended integration points are:

- In `backend/main.py`, calls that read from `TREND_SIGNALS`, `TREND_SERIES`, `OPPORTUNITY_BRIEFS`, and `PAIN_POINT_INSIGHTS` can be replaced with queries to PostgreSQL/Supabase tables.
- A typical pattern is to add a `database.py` with async connection helpers and replace the in-memory lists with DB queries inside each endpoint.

This keeps the API contract stable while letting you evolve the data layer without touching the frontend.

