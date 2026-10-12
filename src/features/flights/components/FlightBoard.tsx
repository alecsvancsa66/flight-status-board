import { useFlightBoard } from "../hooks/useFlightBoard";
import { FlightBoardStatus } from "./FlightBoardStatus";
import { FlightStatusFilters } from "./FlightStatusFilters";
import { FlightGroup } from "./FlightGroup";

export function FlightBoard() {
  const {
    groupedFlights,
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
        <FlightGroup
          key={group.value}
          value={group.value}
          flights={group.flights}
        />
      ))}
    </main>
  );
}
