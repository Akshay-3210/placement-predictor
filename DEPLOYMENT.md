# Deployment Guide - Render

This guide will walk you through deploying your ML Web App on Render.

## Prerequisites

- GitHub account (to push your code)
- Render account (free at https://render.com)

## Step-by-Step Deployment

### 1. Push Your Code to GitHub

If you haven't already:

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Create a Render Account

- Go to https://render.com and sign up (free)
- Authenticate with your GitHub account

### 3. Create a New Web Service

1. Log in to your Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Select your repository (ml-web-app)
4. Configure the following:

   **Basic Settings:**
   - **Name**: `ml-web-app` (or your preferred name)
   - **Environment**: `Python 3`
   - **Region**: Choose your closest region (Oregon recommended for US)
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

5. Click **"Create Web Service"**

### 4. Monitor Deployment

- Render will automatically build and deploy your app
- Watch the live deployment logs in the dashboard
- Once deployment is complete, your app will be live at: `https://<your-service-name>.onrender.com`

## Configuration Files Included

- **Procfile**: Tells Render how to start your app with Gunicorn
- **render.yaml**: Native Render configuration (optional, allows more control)
- **runtime.txt**: Specifies Python version (3.12.0)
- **requirements.txt**: All Python dependencies

## Important Notes

✅ **What's Configured:**
- Flask app properly bound to `0.0.0.0` and dynamic PORT
- Gunicorn as production WSGI server
- Debug mode disabled for security
- model.pkl included in deployment

⚠️ **Potential Issues & Solutions:**

1. **Model File Not Found**
   - Ensure `model.pkl` is committed to Git: `git add model.pkl`
   - Very large model files (>100MB) may cause deployment issues

2. **Slow Initial Load**
   - Free tier services spin down after inactivity
   - First request may take 10-30 seconds to wake up
   - Upgrade to paid plan for production use

3. **Dependencies Installation Fails**
   - Check if all packages in `requirements.txt` are compatible
   - Ensure NumPy/SciPy versions work on Linux (arm64 might have issues)

4. **Memory Issues**
   - ML libraries (NumPy, Pandas, SciKitLearn) are memory-intensive
   - Free tier (0.5GB) should be sufficient for this app
   - Monitor usage in Render dashboard

## Custom Domain (Optional)

To add a custom domain:
1. Go to Service Settings → Custom Domains
2. Add your domain and follow DNS configuration instructions

## Environment Variables (If Needed)

If you need to add environment variables:
1. Go to Service Settings → Environment
2. Add key-value pairs (e.g., SECRET_KEY for sessions)

## Logs and Monitoring

- Access live logs in the Render dashboard
- Monitor build and runtime errors there
- Logs are available for last 24-48 hours

## Auto-Deploy

Render automatically redeploys when you push to your Git repository (if you connected it). This is enabled by default.

## Troubleshooting

If deployment fails:
1. Check the logs in Render dashboard
2. Verify all files are committed to Git
3. Ensure Procfile has no extra whitespace
4. Test locally: `gunicorn app:app`

## Need Help?

- Render Docs: https://docs.render.com/
- Flask Deployment: https://flask.palletsprojects.com/deployment/
- Contact Render support through their website

Good luck with your deployment! 🚀
