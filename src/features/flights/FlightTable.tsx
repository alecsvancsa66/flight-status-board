import { useState } from "react";

const flights = [
  {
    flightNumber: "FL-101",
    destination: "London",
    status: "On Time",
    gate: "A-12",
    terminal: "Terminal 1",
    departureTime: "08:45",
  },
  {
    flightNumber: "FL-204",
    destination: "Paris",
    status: "Delayed",
    gate: "B-08",
    terminal: "Terminal 1",
    departureTime: "09:10",
  },
  {
    flightNumber: "FL-315",
    destination: "Rome",
    status: "Cancelled",
    gate: "C-03",
    terminal: "Terminal 2",
    departureTime: "10:05",
  },
  {
    flightNumber: "FL-422",
    destination: "Berlin",
    status: "On Time",
    gate: "D-17",
    terminal: "Terminal 2",
    departureTime: "11:20",
  },
];

const statusOptions = ["All", "On Time", "Delayed", "Cancelled"] as const;

export function FlightTable() {
  const [selectedStatus, setSelectedStatus] =
    useState<(typeof statusOptions)[number]>("All");

  const visibleFlights =
    selectedStatus === "All"
      ? flights
      : flights.filter((flight) => flight.status === selectedStatus);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Northstar Airport Flight Board</h1>

      <div style={{ margin: "16px 0" }}>
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setSelectedStatus(status)}
            style={{
              marginRight: 8,
              padding: "8px 12px",
              border:
                selectedStatus === status
                  ? "1px solid #111827"
                  : "1px solid #d1d5db",
              background: selectedStatus === status ? "#111827" : "#fff",
              color: selectedStatus === status ? "#fff" : "#111827",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {status}
          </button>
        ))}
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: 16,
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
          {visibleFlights.map((flight) => (
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
    </main>
  );
}

const cellStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left" as const,
};
