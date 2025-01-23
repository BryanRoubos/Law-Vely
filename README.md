# Law-vely Backend

**Law-vely** is an innovative app that fetches legislation data from Legislation API, processes it, and uses OpenAI to summarise and categorise legal texts, making law fun and accessible. Users can track legislations, add notes, and organise legislation summaries by category. This repository contains the backend code for the application.

## Features

- Fetches legislation data from [Legislation API](https://www.legislation.gov.uk/).
- Summarises legal texts using OpenAI's GPT-3.5 model.
- Categorizes the legislation into predefined topics (e.g., Housing, Finance, Environment, etc.).
- Users can search for legislations by keywords.
- Allows users to track and save legislations.
- Users can add notes and filter legislation summaries.
- Firebase database integration to store user preferences and legislation data.
- Users can report issues via a contact for

## Installation

### Prerequisites

- **Node.js**: Version 16.x or later is required.
- **npm**: Node package manager (comes with Node.js).
- **Firebase**: Set up Firebase for the app. You need to have a Firebase project.

### Clone the Repository

- git clone https://github.com/ilyasbaggelaar/Law-Vely.git
- cd lawvely-backend

### Install Dependencies

Once you’ve cloned the repository, install all necessary dependencies with the following command:

- npm install

## Setup

1. **Firebase Setup**:
    - Create a Firebase project and set up Firebase Realtime Database.
    - Add Firebase credentials to your environment file (`.env`) under the `FIREBASE_CONFIG` key.
    - Set up Firebase Admin SDK in the `firebase.ts` file.

2. **Environment Variables**:
Create a `.env` file in the root directory of the project and add the following:

```

OPENAI_API_KEY=your-openai-api-key
FIREBASE_CONFIG=your-firebase-config

```

## Running the Application

To run the app locally in development mode, use the following command:

- npm run dev


This will start the server with `nodemon` for hot-reloading. The backend will be available at `http://localhost:3001`.

To run the app in production mode, use the following command:

- npm start


### Database Seeding

You can seed the database with initial data by running:

- npm run seed

This will run the `seedDynamic.ts` script to populate the database with legislation data.

## Deployment

The backend is deployed on **Render**. After deploying the backend, make sure to configure the necessary environment variables for production (including the OpenAI API key and Firebase credentials).

## API Endpoints

Here’s a quick overview of the API endpoints:

### 1. **GET /api/legislationSummaries**

Fetch all legislation summaries from the database.

**Response Example:**

```json

{
  "tenant-fees-act-2019": {
    "title": "Tenant Fees Act 2019",
    "summary1": "This law is about...",
    "summary2": "It regulates...",
    "timestamp": 1736524657763
  }
}

```

### 2. **GET /api/legislationSummaries/:id**

Fetch a specific legislation summary by its ID.

**Response Example:**

```json

{
  "title": "Tenant Fees Act 2019",
  "summary1": "This law is about...",
  "summary2": "It regulates...",
  "timestamp": 1736524657763
}

```

### 3. **GET /api/legislationSummaries/search?query=QUERY**

Search for legislation based on a query string.

### 4. **GET /api/legislationSummaries?category=CategoryName**

Filter legislation summaries by category (e.g., `Environment`, `Housing`).

## Testing

To run the tests, we use **Jest**. The tests are located in the `tests` directory. To run the tests, use:

- npm test

Tests are written to mock the Firebase database to ensure that API endpoints work as expected without needing to connect to the real database.