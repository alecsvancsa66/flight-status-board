import { FlightStatus } from "./flight";
import type { Flight, FlightStatusFilter } from "./flight";

export function filterFlights(
  flights: Flight[],
  status: FlightStatusFilter,
): Flight[] {
  if (status === FlightStatus.ALL) {
    return flights;
  }

  return flights.filter((flight) => flight.status === status);
}
