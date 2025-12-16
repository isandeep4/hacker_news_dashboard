## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

- Implementation Details
  - Home Page
    - Displayed Story list in a grid layout
    - Created story card and Story List Components
    - Fetched top 10 stories randomly from hacker-news end point using composable for caching and state handling
    - Retrieved user karma score by calling User endpoint using story by field
    - Aggregated and Formatted repsonse for story card data
    - Implemented sorting functionality on score and datetime column
    - used grid-template-column for responsive grid layout
  - Story Details Page
    - Navigate to story details page on click of each story row
    - Retrieved story details from cached API response and using route params id
    - added back to story button to navigate back to Home page
  - Accessibility:
    - focus headers with Tab and sort with Enter or Space.
    - Screen readers correctly announce the table, headers, and rows.
  - Performance:
    - Uses useAsyncData to fetch data during SSR
    - Nuxt Payload stores server-fetched data, so the client does not refetch unnecessarily
    - images in public/ are optimized
