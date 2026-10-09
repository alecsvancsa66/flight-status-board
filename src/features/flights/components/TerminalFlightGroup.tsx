import type { Flight } from "../model/flight";

type TerminalFlightGroupProps = {
  terminal: string;
  flights: Flight[];
};

const cellStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left" as const,
};

export function TerminalFlightGroup({
  terminal,
  flights,
}: TerminalFlightGroupProps) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h2 style={{ margin: "0 0 12px" }}>{terminal}</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={cellStyle}>Flight</th>
            <th style={cellStyle}>Destination</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Gate</th>
            <th style={cellStyle}>Terminal</th>
            <th style={cellStyle}>Departure</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flightNumber}>
              <td style={cellStyle}>{flight.flightNumber}</td>
              <td style={cellStyle}>{flight.destination}</td>
              <td style={cellStyle}>{flight.status}</td>
              <td style={cellStyle}>{flight.gate}</td>
              <td style={cellStyle}>{flight.terminal}</td>
              <td style={cellStyle}>{flight.departureTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}