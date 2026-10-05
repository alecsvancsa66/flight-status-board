# Northstar Airport Flight Board

A responsive departures board built with React, TypeScript, and Vite. It loads public post data from JSONPlaceholder and maps each record into a deterministic flight record. Use the status controls to filter flights, and “Test failed refresh” to exercise stale-data handling.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm test
npm run build
npm run lint
```

## Implementation note

- I used AI assistance to draft the UI, data helpers, refresh flow, tests, and this README; I reviewed and integrated the code in the repository.
- I corrected the initial refresh approach to abort superseded requests and guard state updates with a request sequence, so slower requests cannot overwrite newer data.
- With more time, I would add browser-level tests for the initial-load, refresh, and stale-data states and verify behavior against a dedicated flight API.

## Original Interview Challenge

# Technical Interview Challenge Frontend Engineer

Build a React application (TypeScript preferred) that displays a flight status board for an airport. Each flight should show:

- flight number
- destination
- status (On Time / Delayed / Cancelled)
- gate
- terminal
- departure time

The app should allow a user to:

- Filter flights by status. Filtering should be efficient: avoid recomputing the filtered list on every render unless the data or filter has actually changed.
- Group flights by terminal. Flights need to be grouped by terminal today, but this requirement may change. The grouping logic should be structured so supporting grouping by airline or gate later would be straightforward.
- Trigger a manual refresh in addition to the automatic refresh.
- Auto-refresh the flight list every 30 seconds. The refresh should not produce incorrect results if the previous request has not completed yet.
- Keep showing the last successful data while a background refresh is in progress.
- Keep showing the last successful data if a refresh fails, while clearly communicating that the data may be stale.
- Show when the data was last successfully updated.

Handle state explicitly. The board should communicate clearly to the user when:

- data is being loaded for the first time
- a background refresh is in progress
- something has gone wrong before any data has loaded
- something has gone wrong after data has already loaded
- the user is seeing stale data from the last successful refresh

Be explicit about the difference between these states. In other words:

- initial loading should not behave the same way as background refreshing
- background refreshing should not hide already-loaded data
- refresh failed after data existed should not behave the same way as first load failed
- stale data should be visible as stale, not presented as fresh

Use native fetch and React hooks for all data fetching: no data fetching libraries. Use https://jsonplaceholder.typicode.com/posts (or something similar) as your data source. It requires no auth and returns 100 records. Each post has an id, a userId, and a title. Map these to flight fields:

- id → flight number (e.g. FL-{id})
- userId (values 1–10) → terminal number
- title → destination

For fields the API does not provide, derive them deterministically from the data so the board looks realistic and consistent across refreshes:

- status (On Time / Delayed / Cancelled)
- gate
- departure time

Keep the transformation from raw API data to the app's flight model isolated from the UI. We want to see that you can separate data-mapping concerns from rendering concerns.

Design the implementation so the following future changes would be straightforward:

- grouping by gate
- grouping by airline
- adding one more simple filter dimension

We are not asking you to build all of those today. We do want to see that the current structure makes those changes reasonably cheap.

For error states: simulate failures yourself. A wrapper function that occasionally throws, a toggle in the UI, or any other approach is fine. We want to see that your error handling is actually exercised, not just written.

Add 1–2 focused automated tests. We are not looking for full coverage. We do want to see that you can identify and test the risky parts of the implementation.

## Deliverables

- Working React app (Vite or any standard setup)
- Link to finished codebase 48h before presentation deadline
- A short written note (bullet points is fine) in the repo README.md describing:
  - which parts you wrote yourself vs. generated with AI
  - what you had to correct in AI output
  - one decision you would make differently with more time

_AirportLabs Limited · Page 2 · Confidential · © AirportLabs 2026_

_AirportLabs Limited · Page 3 · Confidential · © AirportLabs 2026_
