# Popup Generator

## Overview

The Popup Generator is a project that allows you to dynamically create and test custom popups for websites. It uses a modern stack including Next.js, TypeScript, Jest, React Testing Library, Tailwind CSS, GraphQL, MongoDB, and AWS S3. With the project's main page, you can configure the popup's form labels, placeholders, and error messages via a side panel settings. Once you're ready, you can generate the popup's embedded JavaScript code, which is stored in AWS S3. You can then navigate to a separate page to either copy the script or test the popup directly.

## Features

- Dynamic Popup Configuration
- Side Settings Panel
- AWS S3 Storage for Popups
- Embedded JS Generation
- Testing Interface

## Getting Started

### Prerequisites

- Node.js v14.0 or higher
- MongoDB instance (local or cloud-based)
- AWS S3 Bucket

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/bahadirsofuoglu/popup-generator.git
    ```
  
2. Navigate to the project directory
    ```bash
    cd popup-generator
    ```

3. Install dependencies
    ```bash
    npm install
    ```

4. Create a `.env` file and add your MongoDB and AWS credentials. For example,
    ```env
    MONGODB_URI=mongodb://your-mongo-db-uri
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    AWS_REGION=your-region
    ```

### Development

Start the development server:

```bash
npm run dev
```

### Testing

Run the test suite using Jest:

```bash
npm run test
```

For test coverage, run::

```bash
npm run test:coverage
```

### Usage

1. Open the main page.
  
2. Configure your popup settings using the side settings panel.

3. Click the "Generate Popup" button to create the popup.

4. Navigate to the generate-popup page to see the AWS S3 URL or copy the script.

5. Optionally, click the "Go to Test" button to test your popup at /test.html.

## Technologies Used

- Next.js
- TypeScript
- Jest
- React Testing Library
- Tailwind CSS
- GraphQL
- MongoDB
- AWS S3



