import type { Flight } from "./flight";

export function groupFlightsByKey<Key extends keyof Flight>(
  flights: Flight[],
  key: Key,
): Array<{ value: Flight[Key]; flights: Flight[] }> {
  return Array.from(
    flights.reduce<Map<Flight[Key], Flight[]>>((groups, flight) => {
      const groupKey = flight[key];
      const groupFlights = groups.get(groupKey) ?? [];
      groupFlights.push(flight);
      groups.set(groupKey, groupFlights);

      return groups;
    }, new Map()),
  ).map(([value, groupedFlights]) => {
    return {
      value,
      flights: groupedFlights,
    };
  });
}
