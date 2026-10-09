import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getFlights } from "../api/flightApi";
import { FlightStatus } from "../model/flight";
import type { Flight, FlightStatusFilter } from "../model/flight";
import { filterFlights } from "../model/filterFlights";

export function useFlightBoard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [lastSuccessfulUpdate, setLastSuccessfulUpdate] = useState<Date | null>(
    null,
  );
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFailureSimulationEnabled, setIsFailureSimulationEnabled] =
    useState(false); // make true at the interview for testing fail on the first load
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<FlightStatusFilter>(
    FlightStatus.ALL,
  );
  const hasLoadedOnce = useRef(false);
  const requestInProgress = useRef(false);
  const failureSimulationRef = useRef(false); // make true at the interview for testing fail on the first load
  const lastSuccessfulUpdateRef = useRef<Date | null>(null);

  const visibleFlights = useMemo(
    () => filterFlights(flights, selectedStatus),
    [flights, selectedStatus],
  );

  const setFailureSimulation = (enabled: boolean) => {
    failureSimulationRef.current = enabled;
    setIsFailureSimulationEnabled(enabled);
  };

  const refreshFlights = useCallback(async () => {
    if (requestInProgress.current) {
      // a request is already in progress, quit for now
      return;
    }

    requestInProgress.current = true;
    if (hasLoadedOnce.current) {
      setIsRefreshing(true);
    }

    try {
      const nextFlights = await getFlights(failureSimulationRef.current);
      const updatedAt = new Date();
      setFlights(nextFlights);
      lastSuccessfulUpdateRef.current = updatedAt;
      setLastSuccessfulUpdate(updatedAt);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(
        lastSuccessfulUpdateRef.current
          ? "data may be stale"
          : "Unable to load flight data. No previously loaded data is available.",
      );
    } finally {
      requestInProgress.current = false;

      if (!hasLoadedOnce.current) {
        hasLoadedOnce.current = true;
        setIsFirstLoad(false);
      } else {
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    const initialRefreshId = setTimeout(() => refreshFlights(), 0);
    const intervalId = setInterval(() => refreshFlights(), 30000); // set to 500 for interview questions // API delay is 1.5 seconds, so 500ms is enough to test the refresh functionality

    return () => {
      clearTimeout(initialRefreshId);
      clearInterval(intervalId);
    };
  }, [refreshFlights]);

  return {
    flights,
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
  };
}
