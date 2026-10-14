import { FlightStatus } from "./flight";
import type { Flight, FlightFilters } from "./flight";

export function filterFlights(
  flights: Flight[],
  filters: FlightFilters,
): Flight[] {
  return flights.filter((flight) => {
    const matchesStatus =
      filters.status === FlightStatus.ALL || flight.status === filters.status;

    const matchesGate =
      filters.gate === undefined || flight.gate === filters.gate;

    return matchesStatus && matchesGate;
  });
}
