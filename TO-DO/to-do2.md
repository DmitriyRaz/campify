## 1. Auth Domain Implementation

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

### Front end Components - this comes from spec sheet ////////////////////// you are here ///////////////////////
- Create base components in `src/domains/auth/components`:
  - `LoginForm.tsx`: Email/password login form
  - `RegisterForm.tsx`: New user registration
  - `OnboardingFlow.tsx`: Post-registration onboarding
  - `AuthCard.tsx`: Container for auth forms
- Create shared component (so things that will be repeated)
- Rendering strategy will be CSR (this is a dashbaord)
- Outstanding:
    - Fix all layout issues
    - Remain OnboardingView to MobileView
    - Make sure it works on all screens

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
  - Concurrent connections
  - Stress testing
  - Layout 
