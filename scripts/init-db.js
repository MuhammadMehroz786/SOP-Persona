#!/usr/bin/env node

/**
 * Database initialization script for Railway deployment
 * This script runs Prisma migrations and handles database setup
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Initializing database...');

try {
  // Ensure prisma directory exists
  const prismaDir = path.join(__dirname, '..', 'prisma');
  if (!fs.existsSync(prismaDir)) {
    console.log('Creating prisma directory...');
    fs.mkdirSync(prismaDir, { recursive: true });
  }

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not set, using default in-memory database');
    process.env.DATABASE_URL = 'file:./prisma/dev.db';
  }

  console.log('📦 Setting up database schema...');

  // For SQLite, use db push which is more reliable than migrations
  // This will create all tables based on the schema
  try {
    console.log('Using prisma db push for SQLite database...');
    execSync('npx prisma db push --force-reset --skip-generate --accept-data-loss', {
      stdio: 'inherit',
      env: process.env
    });
    console.log('✅ Database schema created successfully');
  } catch (pushError) {
    console.warn('⚠️  Force reset failed, trying without reset...');
    try {
      execSync('npx prisma db push --skip-generate', {
        stdio: 'inherit',
        env: process.env
      });
      console.log('✅ Schema pushed successfully');
    } catch (fallbackError) {
      console.error('❌ Failed to create database schema');
      throw fallbackError;
    }
  }

  console.log('🎉 Database initialization complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ Database initialization failed:', error.message);
  process.exit(1);
}
