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
    console.log('📁 Creating prisma directory...');
    fs.mkdirSync(prismaDir, { recursive: true });
  }

  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not set, using default file-based database');
    process.env.DATABASE_URL = 'file:./prisma/dev.db';
  }

  console.log('📍 Database URL:', process.env.DATABASE_URL);

  // Extract database file path from DATABASE_URL for file-based SQLite
  if (process.env.DATABASE_URL.startsWith('file:')) {
    const dbPath = process.env.DATABASE_URL.replace('file:', '');

    // Skip directory creation for special databases like :memory:
    if (!dbPath.includes(':memory:')) {
      const dbDir = path.dirname(path.join(__dirname, '..', dbPath));
      if (!fs.existsSync(dbDir)) {
        console.log('📁 Creating database directory:', dbDir);
        fs.mkdirSync(dbDir, { recursive: true });
      }
    }
  }

  console.log('📦 Setting up database schema...');

  // Generate Prisma client first
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', {
    stdio: 'inherit',
    env: process.env
  });

  // For SQLite, use db push which is more reliable than migrations
  // This will create all tables based on the schema
  try {
    console.log('🔄 Pushing database schema (with force reset)...');
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
      console.error('Error details:', fallbackError.message);
      throw fallbackError;
    }
  }

  console.log('🎉 Database initialization complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ Database initialization failed:', error.message);
  console.error('Stack trace:', error.stack);
  process.exit(1);
}
