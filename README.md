# Northstar Airport Flight Board

A flight board built with React, TypeScript, and Vite. It fetches posts from JSONPlaceholder and maps them to deterministic flight records. Use the status controls to filter the flight list. The grouping helper organizes flights by terminal.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run build
npm run lint
```

## Implementation note

- 100% of the code is AI generated
- I corrected the grouping helper made by AI to accept a key parameter, making it straightforward to group flights by other fields. Before it was ok but you had to change more code in many places.
- I corrected the AI by telling it to pass `FlightFilters` type instead of `FlightStatusFilter` to support more possible filter dimensions instead of just the status.

- With more time, I would have added bounded retry logic for failed initial loads and refreshes. The app would retry a few times (like 3 times) with a short delay (2 seconds) before falling back to the next scheduled refresh, while keeping the last successful data visible and clearly marked as stale.

- With more time, I would use an `AbortController` to cancel an in-flight `getFlights` request when the component unmounts.
- With more time, I would implement real pagination driven by the backend instead of loading all flights at once.
- I would also add virtualization to the flight tables so rendering remains efficient as the number of flights grows.
- I would use React Query. Would make our life easier with the Automatic retries, Easy refresh controls, Caching and what not.
