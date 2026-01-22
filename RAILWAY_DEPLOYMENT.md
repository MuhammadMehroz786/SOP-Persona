# Railway Deployment Guide

This guide will help you deploy the SOP Generator application to Railway.

## Prerequisites

- A Railway account (https://railway.app)
- Your OpenAI API key (https://platform.openai.com/api-keys)

## Deployment Steps

### 1. Connect Repository to Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose this repository: `MuhammadMehroz786/SOP-Persona`
5. Railway will automatically detect the Next.js application

### 2. Configure Environment Variables

In your Railway project settings, add the following environment variables:

```bash
# Required - OpenAI API Key
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Database Configuration (Non-persistent SQLite)
DATABASE_URL=file:./prisma/dev.db

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-app.railway.app

# Puppeteer Configuration (for PDF export)
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
```

**Important:** Replace `your-app.railway.app` with your actual Railway app URL after deployment.

### 3. Deploy

1. Railway will automatically build and deploy your application
2. The build process includes:
   - Installing dependencies
   - Generating Prisma client
   - Building Next.js application
   - Initializing the database
3. Wait for the deployment to complete (usually 2-5 minutes)

### 4. Access Your Application

Once deployed, Railway will provide you with a public URL. Click on it to access your SOP Generator application.

## Database Information

### Non-Persistent Database

This deployment uses a **non-persistent SQLite database**, which means:

- ✅ Fast and simple setup
- ✅ No additional database service required
- ⚠️ **Data will be lost when the service restarts**
- ⚠️ **Not suitable for production use with important data**

### Upgrading to Persistent Database (Future)

If you need persistent storage, consider upgrading to PostgreSQL:

1. In Railway, add a PostgreSQL database to your project
2. Railway will automatically provide a `DATABASE_URL` environment variable
3. Update your Prisma schema to use PostgreSQL instead of SQLite
4. Run migrations to set up the database

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure `OPENAI_API_KEY` is valid

### PDF Export Not Working

- Verify Puppeteer environment variables are set
- Check Railway logs for Chromium-related errors

### Database Errors

- Run the database initialization manually: `npm run db:init`
- Check Prisma schema compatibility with SQLite

## Monitoring and Logs

- View application logs in Railway dashboard
- Monitor resource usage and performance
- Set up health checks if needed

## Cost Considerations

Railway offers:
- Free tier with $5 monthly credit
- Pay-as-you-go pricing after free tier
- Monitor usage in Railway dashboard to avoid unexpected charges

## Support

For issues with:
- **Railway deployment**: Check [Railway documentation](https://docs.railway.app)
- **Application bugs**: Create an issue on the GitHub repository
- **OpenAI API**: Check [OpenAI documentation](https://platform.openai.com/docs)

---

**Note:** Remember to replace placeholder values (like `your-app.railway.app` and API keys) with your actual values during deployment.
