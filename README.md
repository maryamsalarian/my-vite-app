# **My Vite App**

A modern front-end application built with Vite, exploring routing, pagination, search and sort functionality, and performance optimisations (throttling/debouncing) to deliver a responsive user experience.

## **Architecture & Tools**

### **Build tool**

* Vite (leveraging ES modules, faster hot-reload, optimized build pipeline)

### **Language/Framework**

* TypeScript
* JavaScript / HTML / SCSS

### **Routing**

* A client-side router manages page navigation and deep linking
*  Implements client-side routing to support multiple views (e.g., list view, detail view)
* Uses dynamic route parameters and query strings (for page number, sort order, search term) to reflect state in URLs
* Enables browser history integration (back/forward, bookmarking)

### **Server-side Search & Sorting**

* Backend endpoints provide paginated data, search filtering and sorted results
* Search input triggers a backend query that returns filtered results matching the search term
* Sorting is handled on the server side: the client passes `sortKey` and `sortDirection` and displays sorted data
* Ensures scalability by offloading heavy filtering/sorting logic to the server rather than doing it client-side

### **Pagination & Server-Side Data Retrieval**

* List views are implemented with pagination controls (page number, items per page)
* Client sends page index/size to the backend to fetch only the relevant slice of data
* Minimizes client memory usage and optimises network transfer by retrieving only needed records

### **Throttling vs Debouncing**

* **Debouncing:**
  The search input handler uses debouncing (e.g., wait 300ms after last keystroke) to prevent sending too many HTTP requests while the user is still typing.
* **Throttling:**
  For scenarios like infinite scroll or window-resize event listeners, throttling ensures callback execution at a fixed rate (e.g., once every 200ms) rather than every event firing.

### **Styling, Linting, Formatting**

* SCSS modules or global SCSS for component styling
* ESLint + Prettier for consistent code style and quality

## **Enhancements**

* Infinite scroll with throttled API requests (as an alternative to discrete pagination)
* Backend caching for frequently used search or sort queries
* Accessibility improvements (ARIA roles, keyboard navigation, improved focus states)
* Exploration of client-side data prefetching and caching strategies
* Implementing proper authentication checks to restrict access where needed


