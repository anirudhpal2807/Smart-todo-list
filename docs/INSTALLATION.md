# Installation Guide

This document provides detailed instructions for setting up the TodoList Analyzer application on your local machine.

## Prerequisites

Before installing the TodoList Analyzer, ensure you have the following:

- **Node.js**: Version 14.0.0 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation with `node -v`

- **npm** or **yarn**:
  - npm comes with Node.js installation (verify with `npm -v`)
  - Or install yarn: `npm install -g yarn` (verify with `yarn -v`)

- **Git**:
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation with `git --version`

- **Angular CLI** (optional but recommended):
  - Install with `npm install -g @angular/cli`
  - Verify installation with `ng version`

## Basic Installation

Follow these steps for a standard installation:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/todolist-analyzer.git
   cd todolist-analyzer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or if using yarn
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or if using yarn
   yarn start
   # or with Angular CLI
   ng serve
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:4200`

## Environment Configuration

For custom configurations, you may need to set up environment variables:

1. Create a `.env` file in the project root (based on `.env.example` if provided)
2. Configure the following variables as needed:
   ```
   API_URL=http://your-api-server.com
   DEBUG_MODE=false
   ANALYTICS_KEY=your-analytics-key
   ```

3. For Angular environment files, modify:
   - `src/environments/environment.ts` (development)
   - `src/environments/environment.prod.ts` (production)

## Production Deployment

To create a production build:

1. **Build the application**:
   ```bash
   npm run build
   # or with yarn
   yarn build
   # or with Angular CLI
   ng build --configuration production
   ```

2. **Serve the built files** (for testing the production build locally):
   ```bash
   npm install -g http-server
   http-server dist/todolist-analyzer
   ```

## Database Setup

The TodoList Analyzer can work with various database backends:

### Local Storage (Default)

By default, the application uses browser local storage and no additional setup is required.

### Firebase Setup

To use Firebase as your backend:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
2. Enable Firestore Database in your project
3. Get your Firebase configuration from Project Settings
4. Update the Firebase configuration in `src/environments/environment.ts`
   ```typescript
   export const environment = {
     production: false,
     firebase: {
       apiKey: "your-api-key",
       authDomain: "your-project-id.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project-id.appspot.com",
       messagingSenderId: "your-messaging-sender-id",
       appId: "your-app-id"
     }
   };
   ```

## Custom Backend Setup

To use a custom backend:

1. Modify the API service in `src/app/services/api.service.ts` to point to your backend
2. Ensure your backend implements the required endpoints (see API documentation)
3. Update environment configuration with your backend URL

## Troubleshooting

### Common Issues

- **Node version incompatibility**:
  - Error: "Node.js version x.x.x is not supported"
  - Solution: Install the required Node.js version using nvm or similar tool

- **Port already in use**:
  - Error: "Port 4200 is already in use"
  - Solution: Kill the process using that port or change the port with `ng serve --port 4201`

- **Dependency conflicts**:
  - Error: "Conflicting peer dependency"
  - Solution: Try `npm install --legacy-peer-deps` or check for outdated packages

### Getting Help

If you encounter issues not covered in this guide:

1. Check the [GitHub Issues](https://github.com/yourusername/todolist-analyzer/issues) for similar problems
2. Search the project documentation
3. Create a new issue with detailed information about your problem

## Next Steps

After successful installation:

- Follow the [User Guide](./USER_GUIDE.md) to learn how to use the application
- Check out [ANALYSIS_FEATURES.md](./ANALYSIS_FEATURES.md) to explore analysis capabilities
- See [CONTRIBUTING.md](../CONTRIBUTING.md) if you're interested in contributing to the project 