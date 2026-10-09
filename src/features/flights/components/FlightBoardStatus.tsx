export type FlightBoardStatusProps = {
  lastSuccessfulUpdate: Date | null;
  isFirstLoad: boolean;
  isRefreshing: boolean;
  isFailureSimulationEnabled: boolean;
  error: string | null;
  onFailureSimulationChange: (enabled: boolean) => void;
  onRefresh: () => Promise<void>;
};

export function FlightBoardStatus({
  lastSuccessfulUpdate,
  isFirstLoad,
  isRefreshing,
  isFailureSimulationEnabled,
  error,
  onFailureSimulationChange,
  onRefresh,
}: FlightBoardStatusProps) {
  return (
    <>
      <section aria-label="Status" style={{ margin: "16px 0" }}>
        <h2>Status</h2>
        <p>
          {isFirstLoad
            ? "Data is being loaded for the first time"
            : "Data is not being loaded for the first time"}
        </p>
        <p>
          A background refresh is{" "}
          {isRefreshing ? "in progress" : "not in progress"}.
        </p>
        {lastSuccessfulUpdate && (
          <p>
            Last successfully updated:{" "}
            <time dateTime={lastSuccessfulUpdate.toISOString()}>
              {lastSuccessfulUpdate.toLocaleString()}
            </time>
          </p>
        )}
        <button
          type="button"
          onClick={() => void onRefresh()}
          disabled={isFirstLoad || isRefreshing}
        >
          Refresh
        </button>

        <button
          type="button"
          aria-pressed={isFailureSimulationEnabled}
          onClick={() => onFailureSimulationChange(!isFailureSimulationEnabled)}
        >
          Simulate request failures: {isFailureSimulationEnabled ? "On" : "Off"}
        </button>

        {error && (
          <p role="alert" style={{ color: "#b91c1c" }}>
            {error}
          </p>
        )}
      </section>

      {isFirstLoad && <p role="status">Loading flights...</p>}
    </>
  );
}
