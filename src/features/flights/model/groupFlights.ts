import type { Flight } from "./flight";

// Requirement: Flights need to be grouped by terminal today, but this requirement may change.
// The grouping logic should be structured so supporting grouping by airline or gate later would be straightforward.

// Just change the code to use flight.gate for example instead of flight.terminal and the grouping will be by gate instead of terminal.
export function groupFlightsByTerminal(flights: Flight[]) {
  return Array.from(
    flights.reduce<Map<string, Flight[]>>((groups, flight) => {
      const terminalFlights = groups.get(flight.terminal) ?? [];
      terminalFlights.push(flight);
      groups.set(flight.terminal, terminalFlights);

      return groups;
    }, new Map()),
  ).map((entry: [string, Flight[]]) => {
    const terminal = entry[0];
    const groupedFlights = entry[1];

    return {
      terminal,
      flights: groupedFlights,
    };
  });
}
