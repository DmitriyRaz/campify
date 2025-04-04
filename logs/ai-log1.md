# Campify

A business application built with Domain-Scoped Vertical Slice Architecture.

## Project Architecture Overview

This project implements a Domain-Scoped Vertical Slice Architecture (DSVSA), combining the benefits of Vertical Slice Architecture (VSA) and Domain-Driven Design (DDD) within a Modular Monolith.

## Project Setup Guide

### 1. Project Initialization
- Create a new project folder named "campify"
- Initialize a new Next.js application with TypeScript support
- Select app router architecture during setup

### 2. Version Control Configuration
- Set up Git repository
- Create three branches with specific purposes:
  - `master`: Production-ready code
  - `staging`: Testing/QA environment
  - `development`: Active development branch

### 3. Domain-Scoped Folder Structure Implementation
- Create domain-based folder structure in `src/domains/`:
  - `auth`: Authentication domain
  - `dashboard`: Dashboard domain
  - `leads`: Lead management domain
  - `products`: Product catalog domain
  - `transactions`: Transaction processing domain
  - `campaigns`: Marketing campaign domain
  - `settings`: User preferences domain
  - `ai-agent`: Conversational interface domain
- Establish consistent internal structure within each domain:
  - `components/`: Domain-specific UI components
  - `hooks/`: React hooks for domain logic
  - `services/`: Domain services and API interactions
  - `store/`: State management for domain data
  - `pages/`: Page components (vertical slices)
  - `functions/`: Utility functions for domain operations
  - `tests/`: Domain-specific tests

### 4. Shared Code Organization
- Create `src/shared/` directory for cross-domain code:
  - `components/`: Reusable UI components
  - `hooks/`: Shared React hooks
  - `services/`: Shared API services
  - `utils/`: Utility functions
  - `types/`: TypeScript type definitions

### 5. Next.js App Router Configuration
- Organize app directory with route groups:
  - `(auth)/`: Authentication routes (login, register, onboarding)
  - `(dashboard)/`: Main application routes (dashboard, leads, products, etc.)
  - Keep root layout and page for landing page
- Move styles to dedicated `styles/` directory

### 6. Dependency Installation
- Install core dependencies:
  - `zustand`: Lightweight state management
  - `@tanstack/react-query`: Data fetching and caching
  - `react-hook-form`: Form handling
  - `zod`: Schema validation
  - `axios`: HTTP client
  - `class-variance-authority`, `clsx`, `tailwind-merge`: UI utility libraries

### 7. Supabase Integration
- Install Supabase client library: `@supabase/supabase-js`
- Create Supabase project via Supabase dashboard
- Set up environment variables in `.env.local`
- Create Supabase client utility in `src/shared/utils/supabase.ts`

### 8. Vercel Deployment Configuration
- Connect GitHub repository to Vercel
- Configure branch deployments:
  - `master` branch → Production environment
  - `development` branch → Preview environment
  - `staging` branch → Preview environment
- Add environment variables to Vercel project settings
- Set up automatic deployments for all branches

## Key Architecture Decisions

1. **Domain-Scoped Vertical Slice Approach**: Organized code by business capability rather than technical layer
2. **Three-Tier State Management**: 
   - Local component state for UI concerns
   - Domain state for business data
   - Global state for application-wide concerns
3. **Thin App Router Pattern**: App directory handles routing while domain directories contain implementation
4. **Shared Code Isolation**: Cross-domain components and utilities isolated in dedicated directories
5. **Continuous Deployment Strategy**: Automatic deployments for development branch to enable rapid feedback

## Technical Implementation 

- Next.js 14+ with app directory for improved server/client rendering control
- TypeScript for type safety throughout the application
- Tailwind CSS for utility-based styling
- Supabase for authentication and database functionality
- Vercel for deployment and hosting

## Development

### Prerequisites
- Node.js 18.x+
- npm or pnpm
- Supabase account
- Vercel account (for deployment)

### Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run development server: `npm run dev`

### Branch Strategy
- `master`: Production-ready code
- `staging`: Testing/QA environment
- `development`: Active development branch
- Feature branches: `feature/domain-name/feature-description`