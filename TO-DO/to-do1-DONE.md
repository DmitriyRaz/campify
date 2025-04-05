# Next Steps for Campify Development

After completing the initial project setup with our Domain-Scoped Vertical Slice Architecture, the following steps will establish our development workflow and implement our first domain.

## 1. CI/CD Pipeline Implementation (WE DID NOT DO THIS, NOT RELEVENT NOW)

Before diving into domain development, we should establish proper CI/CD to ensure code quality:

### GitHub Actions Setup (WE DID NOT DO THIS, NOT RELEVENT NOW)
- Create `.github/workflows` directory
- Add CI workflow for feature branches:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ 'feature/**', 'bugfix/**' ]
  pull_request:
    branches: [ development, staging, master ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
  
  build:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
```

### ESLint and Prettier Configuration ( we did most of this, no need for husky hooks)
- Configure ESLint rules for consistent code style (we kept defualt from next.js set up)
- Add Prettier for automatic formatting (done)
- Set up husky pre-commit hooks to run linting before commits (not relevent at this point)

### Testing Framework Setup (THIS IS NOT RELEVENT NOW)
- Configure Jest and React Testing Library
- Add basic testing utilities and mocks
- Create test script in package.json




































## 2. Auth Domain Implementation

Our first domain implementation will be authentication, as it's foundational for the application:

File strucutre:

/app
    /auth (routing)
        /login (routing for log in)
        /onboarding (routing for onboaring)
        /register (routing for sign up)

/domains
    /auth (all the good stuff)
        /components (all the front end components)
        /functions (our serverless function, that talk to db)
        /hooks (all hooks)
        /pages (pages inside of domain)
        /services (call funcitons to do things)
        /store (state managment)
        /tests (all our tests)

### Front end Components - this comes from spec sheet
- Create base components in `src/domains/auth/components`:
  - `LoginForm.tsx`: Email/password login form
  - `RegisterForm.tsx`: New user registration
  - `OnboardingFlow.tsx`: Post-registration onboarding
  - `AuthCard.tsx`: Container for auth forms
- Create shared component (so things that will be repeated)
- Rendering strategy will be CSR (this is a dashbaord)

### Set up DB
  - Create all db tables we need for this domain
  - For all services, and include log in attempts and abandoned onboarding

### Set up API's
  - Connecting front end to db

### State Management: Global state, state restoration, state persistance (if needed)
  - Set up state managment and all the things you may need

### Caching Strategies (Cache invalidation, caching strategy)
  - Set up all caching

### Real time updates (if you need them)
  - Set up real time updates, but auth probbaly wont need that

### NFR's (performance, security, compliance)
  - Make sure we optimze the 3 non functional req's

### Unit Testing (at domain level)
  - E2E, etc. Last testing we do
