
# Deployment Guide for Bus Tracking Project

## Prerequisites
- Node.js and npm installed
- AWS account with an EC2 instance
- MongoDB Atlas cluster
- Google Maps API key

## Backend Setup
1. SSH into your EC2 instance.
2. Install Node.js and Git:
   ```bash
   sudo yum update -y
   sudo yum install git -y
   curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
   sudo yum install -y nodejs
   ```
3. Clone the repository and navigate to the backend directory:
   ```bash
   git clone YOUR_REPO_URL
   cd backend
   ```
4. Install dependencies and start the server:
   ```bash
   npm install
   node server.js
   ```

## Frontend Setup
1. Build the React app:
   ```bash
   npm run build
   ```
2. Upload the `build/` directory to an S3 bucket.
3. Enable static website hosting in S3 and note the website URL.

## Connecting Frontend and Backend
- Update the frontend `App.js` file with your backend's public IP.
- Deploy the updated frontend.

## CI/CD Pipeline
- Use GitHub Actions for automated deployment.
