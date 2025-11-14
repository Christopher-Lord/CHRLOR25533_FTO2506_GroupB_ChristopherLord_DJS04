# DSJ04 React Podcast App: Search, Sort, Filter, and Pagination

## Project Overview

This project is an advanced podcast browsing experience that allows users to dynamically **search**, **sort**, **filter**, and **paginate** a list of podcast shows. It has an intuitive interface that responds to user input in real time and maintains a consistent, seamless experience throughout navigation.

## Setup Instructions

- Make sure you have `Node.js` and `npm` installed
- Open VSCode and clone this repo (`https://github.com/Christopher-Lord/CHRLOR25533_FTO2506_GroupB_ChristopherLord_DJS04.git`)
- After cloning, change your current directory to the newly cloned project folder (`cd repository-name`)
- The `package.json` file in this project contains all required dependencies: Install them using `npm install`
- Once dependencies are installed, start the dev server using `npm run dev`
- Navigate to the given `http://localhost` domain in your browser
- Browse the web page!

## Features

- Fetched podcast data from a given API using `useEffect()`
- Renders podcast cards dynamically
- Uses **React components** to display elements for the podcast cards, podcast grid, filters and search bar
- Allows the user to type in a search bar to find a specific podcast by title
- Allows for filtering the list of podcasts by genre
- Also allows for sorting the list of podcasts by most recent, A-Z or Z-A
- Includes pagination with a **Load More** button, allowing the list of podcasts to be displayed in chunks

## Key Takeaways

### 1. **Modular Design**

- Code is split into small, focused modules.
- Each file has a **single responsibility**, making it easier to understand and maintain.

### 2. **Factory Functions**

- `lookup` Module returns objects that encapsulate logic.
- This promotes **encapsulation** and **reuse**.

  Example:

  ```js
  const genreLookup = createGenreLookup(genresArray);
  genreLookup.getGenreTitlesByIds(genreIds);
  ```

### 3. Abstraction

- Internals (like how date formatting works) are hidden behind clear interfaces.

- Consumers don’t need to know how something works, only what it does.

### 4. SRP (Single Responsibility Principle)

- Each module does one thing:
  - `useFetch.jsx` - creates a custom React hook to fetch data from a given API
  - `PodcastCard.jsx` – creates a React component for a single podcast card
  - `PodcastGrid.jsx` – creates a grid layout to display all podcast cards in an aesthetic way
  - `GenreFilter.jsx` - creates a React component for the genre filter elements
  - `SortFilter.jsx` - creates a React component for the sorting elements
  - `SearchBar.jsx` - creates a React component for the a functioning search bar
  - `PodcastContext.jsx` - Holds all data relating to states, and creates a React context so those states can be used elsewhere 
  - `usePagination.jsx` - creates a custom React hook to enable pagination through a load more button 
  - `lookup.js` – manages data lookups
  - `App.jsx` - creates the main App component to bring all the other components together

### 5. Clear Entry Point

- `main.jsx` acts as the orchestrator, setting up the app and wiring components together.
- This keeps global logic and setup in one place.

---

## Core Objectives

### Search Functionality

- Implement a flexible search that matches any part of the podcast title.
- Results should update dynamically as the user types or upon submission.
- Ensure that search results integrate with current filters, sorts, and pagination without resetting them.

### Sorting Options

- Allow sorting podcasts by:
  - Newest first (based on last updated date).
  - Title A–Z and Z–A.
- Sorting must work in tandem with any search or filter criteria.

### Filtering

- Enable genre-based filtering using a dropdown or multi-select input.
- Ensure filters work alongside current search, sort, and pagination state.
- Maintain selected filters when navigating between pages or updating the list.

### Pagination

- Display podcasts in manageable chunks using pagination, load-more, or infinite scroll.
- Ensure that pagination respects the currently active search, filter, and sort state.
- Keep all UI selections intact while navigating pages.

### State Synchronisation

- Maintain a centralised and cleanly organised state using React state, context, or a state management library.
- Ensure that all controls (search, sort, filter, pagination) reflect changes immediately and stay in sync.

### Code Quality & Maintainability

- Use JSDoc to document all major functions and modules.
- Apply consistent formatting and naming conventions.
- Keep logic modular and components reusable.

### API Endpoints

Data can be called via a `fetch` request to the following endpoint.

| URL                               |                             |
| --------------------------------- | --------------------------- |
| `https://podcast-api.netlify.app` | Returns an array of PREVIEW |

### Genre Titles

Since the podcast preview information fetched from the API only exposes genres by their IDs, the actual genre details (such as titles) are not included in the API response. These details are instead provided in the data.js file found in this repository. Therefore, it is recommended that you include the mapping between genre ID values and their corresponding titles in your code using this file.

## Project Deliverables

- A fully functional React app that:
  - Fetches and displays podcast data.
  - Allows live searching, sorting, filtering, and pagination.
  - Maintains consistent state across all UI interactions.

- **Clean Codebase** with:
  - Reusable, modular components.
  - Clear and consistent formatting across all files.
  - JSDoc comments for functions/modules.

- **README.md** with:
  - Project overview and purpose.
  - Setup and usage instructions.
  - Descriptions of key features (search, filter, sort, pagination).

- **Version Control (GitHub)**:
  - Clear, meaningful commit messages.
  - Incremental commits reflecting development progress.

## Success Criteria

- No console errors or broken UI on load.
- All features work correctly and together without losing state.
- Clean, maintainable codebase with documentation.
- A polished user experience with responsive layout and real-time updates.

---
