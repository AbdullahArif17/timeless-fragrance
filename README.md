# Timeless Fragrance

Timeless Fragrance is a modern, full-stack e-commerce web application designed for selling exquisite perfumes. It features a clean, elegant, and responsive user interface, providing a seamless shopping experience for customers. The backend and product catalog are powered by the Sanity.io headless CMS, allowing for easy content management.

## Features

-   **Dynamic Product Catalog:** Products are fetched dynamically from the Sanity CMS.
-   **Comprehensive Product Details:** Each product has a dedicated page with detailed descriptions, images, and pricing.
-   **Shopping Cart:** Users can add, remove, and manage items in their shopping cart.
-   **User Authentication:** Built-in support for user accounts using NextAuth.js.
-   **Responsive Design:** The application is fully responsive and optimized for desktop, tablet, and mobile devices.
-   **Embedded CMS Studio:** Manage products and content directly through an integrated Sanity Studio at the `/studio` route.
-   **Search Functionality:** Users can easily search for products within the store.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Frontend:** [React](https://reactjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Headless CMS:** [Sanity.io](https://www.sanity.io/)
-   **Authentication:** [NextAuth.js](https://next-auth.js.org/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (version 18.x or higher recommended)
-   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AbdullahArif17/timeless-fragrance.git
    cd timeless-fragrance
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. You can get these values from your Sanity project settings.

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="your_sanity_dataset"
NEXT_PUBLIC_SANITY_API_VERSION="2024-02-10"
```

### Running the Application

1.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `https://timeless-fragrance.vercel.app/`.

2.  **Access Sanity Studio:**
    Navigate to `https://timeless-fragrance.vercel.app/studio` to access the integrated Sanity Studio and manage your project's content.

## Available Scripts

-   `npm run dev`: Starts the development server with Turbopack.
-   `npm run build`: Creates a production-ready build of the application.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## Deployment

The easiest way to deploy this Next.js application is by using the [Vercel Platform](https://vercel.com/new).

-   Set up a new project on Vercel and connect your Git repository.
-   Add your Sanity environment variables to the Vercel project settings.
-   Vercel will automatically build and deploy your application upon every push to the main branch.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more information.