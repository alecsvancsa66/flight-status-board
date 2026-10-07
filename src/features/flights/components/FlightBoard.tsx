import { FlightStatus, STATUS_OPTIONS } from "../model/flight";
import { groupFlightsByTerminal } from "../model/groupFlights";
import { useFlightBoard } from "../hooks/useFlightBoard";
import { FlightRow } from "./FlightRow";
import { FlightBoardStatus } from "..";

const cellStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #e5e7eb",
  textAlign: "left" as const,
};

export function FlightBoard() {
  const {
    visibleFlights,
    isFirstLoad,
    isRefreshing,
    isFailureSimulationEnabled,
    error,
    selectedStatus,
    setSelectedStatus,
    setFailureSimulation,
    refreshFlights,
  } = useFlightBoard();
  const groupedFlights = groupFlightsByTerminal(visibleFlights);

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Northstar Airport Flight Board</h1>

      <FlightBoardStatus
        isFirstLoad={isFirstLoad}
        isRefreshing={isRefreshing}
        isFailureSimulationEnabled={isFailureSimulationEnabled}
        error={error}
        onFailureSimulationChange={setFailureSimulation}
        onRefresh={refreshFlights}
      />

      <div style={{ margin: "16px 0" }}>
        {[FlightStatus.ALL, ...STATUS_OPTIONS].map((status) => (
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

      {groupedFlights.map(({ terminal, flights }) => (
        <section key={terminal} style={{ marginBottom: 24 }}>
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
                <FlightRow key={flight.flightNumber} flight={flight} />
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </main>
  );
}
