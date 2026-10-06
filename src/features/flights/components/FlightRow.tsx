import type { Flight } from "../model/flight";

const cellStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left" as const,
};

export function FlightRow({ flight }: { flight: Flight }) {
  return (
    <tr>
      <td style={cellStyle}>{flight.flightNumber}</td>
      <td style={cellStyle}>{flight.destination}</td>
      <td style={cellStyle}>{flight.status}</td>
      <td style={cellStyle}>{flight.gate}</td>
      <td style={cellStyle}>{flight.terminal}</td>
      <td style={cellStyle}>{flight.departureTime}</td>
    </tr>
  );
}
