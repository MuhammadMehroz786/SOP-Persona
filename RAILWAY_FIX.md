# Railway Deployment Fix for Database Error

## Problem
The error "The table `main.SOP` does not exist in the current database" occurs because the database tables aren't being created when the app starts on Railway.

## Root Cause
The SQLite database wasn't being properly initialized before the Next.js app starts, causing Prisma queries to fail.

## Solution Applied

### 1. **Improved Database Initialization Script** (`scripts/init-db.js`)
- Added better directory creation logic for the database file
- Added Prisma client generation step
- Enhanced error logging for debugging
- Better handling of file-based vs in-memory databases

### 2. **Updated Railway Environment Variables** (`.env.railway`)
Changed from:
```bash
DATABASE_URL=file::memory:?cache=shared
```

To:
```bash
DATABASE_URL=file:./prisma/dev.db
```

File-based SQLite is more stable than in-memory on Railway.

### 3. **Deployment Configuration Already Set**
The `railway.json` and `nixpacks.toml` files already have the correct start command:
```bash
npm run db:init && npm start
```

This ensures the database is initialized before the app starts.

## How to Deploy the Fix

### Option 1: Redeploy on Railway
1. Commit and push these changes to your GitHub repository
2. Railway will automatically redeploy
3. The `npm run db:init` script will run first and create all tables
4. Then the app will start

### Option 2: Manual Trigger on Railway
1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click "Deploy" to trigger a fresh deployment

## Environment Variables to Set on Railway

Make sure these are set in your Railway service:

```bash
# Required - Your OpenAI API Key
OPENAI_API_KEY=your-actual-openai-api-key-here

# Database (file-based SQLite)
DATABASE_URL=file:./prisma/dev.db

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.railway.app

# Puppeteer (for PDF export)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
```

## Important Notes

⚠️ **Data Persistence Warning**
- SQLite databases on Railway are **ephemeral** - they will be **lost when the service restarts**
- This is fine for testing/demo purposes
- For production with persistent data, consider:
  - Railway PostgreSQL (add via Railway dashboard)
  - Turso (serverless SQLite)
  - PlanetScale (MySQL)

## Verify the Fix

After deployment, check Railway logs for:
```
🚀 Initializing database...
📁 Creating prisma directory...
📍 Database URL: file:./prisma/dev.db
🔧 Generating Prisma client...
🔄 Pushing database schema (with force reset)...
✅ Database schema created successfully
🎉 Database initialization complete!
```

If you see these logs, the database is properly initialized and the app should work!

## Testing

1. Go to your Railway app URL
2. Try creating a new SOP
3. The "Failed to save SOP" error should be gone
4. SOPs should save and display correctly

## Need Help?

If the error persists:
1. Check Railway logs for the exact error message
2. Verify all environment variables are set correctly
3. Make sure `OPENAI_API_KEY` is valid
4. Try a fresh deployment (not just restart)
