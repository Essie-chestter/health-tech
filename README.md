# Health-Tech Application

## Description

 The application leverages React for the frontend, Vite for fast development, and Supabase (PostgreSQL)for backend services including authentication and database management. It is designed to provide a robust and scalable foundation for health-related applications.

## Features

- **User Authentication**: Secure user login and registration powered by Supabase Auth.
- **Protected Routes**: Ensures that only authenticated users can access certain parts of the application.
- **Theming**: Customizable UI themes using `ThemeProvider`.
- **Interactive UI Components**: Built with `shadcn-ui` and `Radix UI` for a rich user experience.
- **Data Management**: Utilizes `@tanstack/react-query` for efficient data fetching, caching, and state management.
- **Routing**: Client-side routing handled by `react-router-dom`.

## Technologies Used

- **Frontend**: React.js, TypeScript, Vite
- **UI Library**: shadcn-ui, Radix UI
- **Styling**: Tailwind CSS, PostCSS
- **Backend/Database**: Supabase [PostgreSQL](Authentication, Database)
- **State Management/Data Fetching**: @tanstack/react-query, React Hook Form
- **Routing**: React Router DOM
- **Utility Libraries**: clsx, lucide-react, tailwind-merge, zod

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn (npm is used in the examples)
- Git

### Setup

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/Essie-chestter/health-tech.git
    ```

2.  **Navigate to the project directory**:

    ```bash
    cd health-tech
    ```

3.  **Install dependencies**:

    ```bash
    npm install
    # or yarn install
    ```

4.  **Set up Supabase**: 
    - Create a new project on [Supabase](https://supabase.com/).
    - Obtain your Supabase URL and `anon` public key from your project settings (Settings -> API).
    - Create a `.env` file in the root of your project and add the following:

    ```
    VITE_SUPABASE_URL=YOUR_SUPABASE_URL
    VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

5.  **Run the development server**:

    ```bash
    npm run dev
    # or yarn dev
    ```

    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once the application is running, you can:

- Register a new user or log in with existing credentials via the `/auth` route.
- Access protected content after successful authentication.
- Explore the various UI components and features implemented.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Essie-chestter - [GitHub Profile](https://github.com/Essie-chestter)

Project Link: [https://github.com/Essie-chestter/health-tech](https://github.com/Essie-chestter/health-tech)

