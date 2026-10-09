import { groupFlightsByTerminal } from "../model/groupFlights";
import { useFlightBoard } from "../hooks/useFlightBoard";
import { FlightBoardStatus } from "./FlightBoardStatus";
import { FlightStatusFilters } from "./FlightStatusFilters";
import { TerminalFlightGroup } from "./TerminalFlightGroup";

export function FlightBoard() {
  const {
    visibleFlights,
    lastSuccessfulUpdate,
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
        lastSuccessfulUpdate={lastSuccessfulUpdate}
        isFirstLoad={isFirstLoad}
        isRefreshing={isRefreshing}
        isFailureSimulationEnabled={isFailureSimulationEnabled}
        error={error}
        onFailureSimulationChange={setFailureSimulation}
        onRefresh={refreshFlights}
      />

      <FlightStatusFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {groupedFlights.map((group) => (
        <TerminalFlightGroup
          key={group.terminal}
          terminal={group.terminal}
          flights={group.flights}
        />
      ))}
    </main>
  );
}
