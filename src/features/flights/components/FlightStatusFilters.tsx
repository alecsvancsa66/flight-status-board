import { FlightStatus, STATUS_OPTIONS } from "../model/flight";
import type { FlightStatusFilter } from "../model/flight";

type FlightStatusFiltersProps = {
  selectedStatus: FlightStatusFilter;
  onStatusChange: (status: FlightStatusFilter) => void;
};

export function FlightStatusFilters({
  selectedStatus,
  onStatusChange,
}: FlightStatusFiltersProps) {
  return (
    <div style={{ margin: "16px 0" }}>
      {[FlightStatus.ALL, ...STATUS_OPTIONS].map((status) => (
        <button
          key={status}
          type="button"
          onClick={() => onStatusChange(status)}
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
  );
}
