# Two Perfect Events Website

This repository contains the source code for the [Two Perfect Events website](https://twoperfectevents.com).

Two Perfect Events is a premier wedding and event planning company specializing in creating chic and multicultural experiences for creative souls. This website showcases their portfolio, details their services, hosts a blog, and provides ways for potential clients to get in touch.

## Live Site

Visit the live website at [https://twoperfectevents.com](https://twoperfectevents.com).

## Tech Stack

The website is built with a modern tech stack including:

*   **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
*   **CMS:** [Prismic](https://prismic.io/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Email:** [Resend](https://resend.com/) for contact forms and communication.
*   **Deployment:** [Vercel](https://vercel.com/)

## Key Features

*   **Event Portfolio:** Displays a gallery of past events and weddings.
*   **Blog:** Features articles, tips, and inspiration related to event planning.
*   **Services Listing:** Details the event planning and design services offered.
*   **Contact Forms:** Allows potential clients to inquire about services.
*   **Newsletter Subscription:** Enables users to sign up for updates and tips.

## Getting Started (Development)

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   pnpm (or npm/yarn if you prefer, but commands below use pnpm)

### Installation

1.  **Clone the repo:**
    ```sh
    # If you haven't cloned the repository yet:
    # git clone <repository-url>
    # cd <repository-name>

    # If you have already cloned, navigate to the project directory.
    ```
2.  **Install PNPM packages:**
    ```sh
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project. You will need to add a Prismic API endpoint and any other necessary credentials for services like Resend or your database. Refer to `.env.example` if available (if not, you'll need to consult the Prismic and other service documentation for required variables).
    A typical Prismic setup might look like:
    ```env
    PRISMIC_ENDPOINT=YOUR_PRISMIC_API_ENDPOINT
    # Add other variables like RESEND_API_KEY, DATABASE_URL etc.
    ```
4.  **Run the development server:**
    ```sh
    pnpm dev
    ```
    This will start the Next.js development server, typically on `http://localhost:3000`, and the Slice Machine development server, typically on `http://localhost:9999`.

## Prismic Integration

Content for this website is managed through [Prismic](https://prismic.io/). To edit content:

1.  Go to [prismic.io/dashboard](https://prismic.io/dashboard).
2.  Select the repository for this website.
3.  Navigate to the documents or Slices you wish to edit.

For more details on how Prismic is integrated, refer to the following files:
*   `prismicio.ts`: Configuration for the Prismic client.
*   `app/layout.tsx`: Includes Prismic provider setup.
*   `slices/`: Contains the Slice components.

## Deployment

This Next.js application is typically deployed on [Vercel](https://vercel.com/). For more information on deploying Next.js applications, see the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Contributing

Contributions are welcome! Please follow the conventional commit guidelines when submitting pull requests.

### Use Conventional Commits

More info about [Conventional Commits](https://www.conventionalcommits.org)
Conventional commit types are used to categorize changes to source code. They help make it easier to understand the history of changes and avoid miscommunication.

#### Prefix your commit subjects with one of the following prefixes:

- feat: Adds a new feature
- fix: Fixes a bug
- docs: Adds or updates documentation
- style: Improves code structure or format without changing code logic
- refactor: Modifies code without adding new features or fixing bugs
- test: Adds or modifies tests
- chore: Updates build tasks, CI configurations, and other non-production code changes
- perf: Improves performance
- build: Changes that affect the build system or external dependencies
- ci: Changes to CI configuration files and scripts
- ops: Affects operational components like infrastructure, deployment, backup, and recovery

#### How to use conventional commits

- Prefix each commit with a type, such as "feat" or "fix", followed by a colon and a space
- Include a short description of the code changes after the type
- Optionally include a longer commit body after the short description
- Optionally include a footer that contains additional issue references

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
