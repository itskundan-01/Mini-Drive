#!/bin/bash

# Pre-Deployment Checklist Script
# This script helps verify that your project is ready for deployment

echo "🚀 Mini Drive - Pre-Deployment Checklist"
echo "=========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check function
check() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
    fi
}

# Backend Checks
echo "Backend Checks:"
echo "---------------"

# Check if backend/.env exists
if [ -f "backend/.env" ]; then
    check 0 "backend/.env file exists"
    
    # Check for required env variables
    grep -q "MONGO_URI=" backend/.env
    check $? "MONGO_URI is set in backend/.env"
    
    grep -q "JWT_SECRET=" backend/.env
    check $? "JWT_SECRET is set in backend/.env"
    
    grep -q "CLOUDINARY_CLOUD_NAME=" backend/.env
    check $? "CLOUDINARY_CLOUD_NAME is set in backend/.env"
    
    grep -q "CLOUDINARY_API_KEY=" backend/.env
    check $? "CLOUDINARY_API_KEY is set in backend/.env"
    
    grep -q "CLOUDINARY_API_SECRET=" backend/.env
    check $? "CLOUDINARY_API_SECRET is set in backend/.env"
else
    check 1 "backend/.env file exists (Create it from .env.example)"
fi

# Check if node_modules exists
if [ -d "backend/node_modules" ]; then
    check 0 "backend/node_modules exists"
else
    check 1 "backend/node_modules exists (Run: cd backend && npm install)"
fi

echo ""

# Frontend Checks
echo "Frontend Checks:"
echo "----------------"

# Check if frontend/.env exists
if [ -f "frontend/.env" ]; then
    check 0 "frontend/.env file exists"
    
    grep -q "VITE_API_URL=" frontend/.env
    check $? "VITE_API_URL is set in frontend/.env"
else
    check 1 "frontend/.env file exists (Create it with VITE_API_URL)"
fi

# Check if node_modules exists
if [ -d "frontend/node_modules" ]; then
    check 0 "frontend/node_modules exists"
else
    check 1 "frontend/node_modules exists (Run: cd frontend && npm install)"
fi

echo ""

# Git Checks
echo "Git Checks:"
echo "-----------"

# Check if .git exists
if [ -d ".git" ]; then
    check 0 "Git repository initialized"
    
    # Check if there are uncommitted changes
    if [ -z "$(git status --porcelain)" ]; then
        check 0 "No uncommitted changes"
    else
        check 1 "No uncommitted changes (Commit your changes before deploying)"
    fi
    
    # Check if remote exists
    if git remote -v | grep -q "origin"; then
        check 0 "Git remote 'origin' configured"
    else
        check 1 "Git remote 'origin' configured (Add your GitHub repo)"
    fi
else
    check 1 "Git repository initialized (Run: git init)"
fi

echo ""

# Deployment Files Check
echo "Deployment Files:"
echo "-----------------"

[ -f "backend/render.yaml" ] && check 0 "backend/render.yaml exists" || check 1 "backend/render.yaml exists"
[ -f "frontend/vercel.json" ] && check 0 "frontend/vercel.json exists" || check 1 "frontend/vercel.json exists"
[ -f "DEPLOYMENT.md" ] && check 0 "DEPLOYMENT.md exists" || check 1 "DEPLOYMENT.md exists"
[ -f "backend/.env.example" ] && check 0 "backend/.env.example exists" || check 1 "backend/.env.example exists"

echo ""

# Summary
echo "=========================================="
echo "📋 Next Steps:"
echo "=========================================="
echo ""
echo "1. ${YELLOW}Review DEPLOYMENT.md${NC} for detailed instructions"
echo "2. ${YELLOW}Use DEPLOYMENT_CHECKLIST.md${NC} to track your progress"
echo "3. ${YELLOW}Push your code${NC} to GitHub: git push origin main"
echo "4. ${YELLOW}Deploy backend${NC} on Render (https://render.com)"
echo "5. ${YELLOW}Deploy frontend${NC} on Vercel (https://vercel.com)"
echo "6. ${YELLOW}Update CORS_ORIGIN${NC} in Render with your Vercel URL"
echo "7. ${YELLOW}Test your application${NC}"
echo ""
echo "Good luck! 🚀"
echo ""
