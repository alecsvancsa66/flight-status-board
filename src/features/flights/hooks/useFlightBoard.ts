import { useEffect, useMemo, useState } from "react";

import { getFlights } from "../api/flightApi";
import { FlightStatus } from "../model/flight";
import type { Flight, FlightStatusFilter } from "../model/flight";
import { filterFlights } from "../model/filterFlights";
import { groupFlightsByTerminal } from "../model/groupFlights";

export function useFlightBoard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<FlightStatusFilter>(
    FlightStatus.ALL,
  );

  const visibleFlights = useMemo(
    () => filterFlights(flights, selectedStatus),
    [flights, selectedStatus],
  );

  useEffect(() => {
    getFlights().then(setFlights);
  }, []);

  console.log(groupFlightsByTerminal(visibleFlights));

  return {
    flights,
    visibleFlights,
    selectedStatus,
    setSelectedStatus,
  };
}
