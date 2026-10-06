export const FlightStatus = {
  ALL: "All",
  ON_TIME: "On Time",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled",
} as const;

export const STATUS_OPTIONS = [
  FlightStatus.ON_TIME,
  FlightStatus.DELAYED,
  FlightStatus.CANCELLED,
] as const;

export type FlightStatusValue =
  (typeof FlightStatus)[keyof typeof FlightStatus];
export type FlightStatusFilter =
  | typeof FlightStatus.ALL
  | (typeof STATUS_OPTIONS)[number];

export type Flight = {
  flightNumber: string;
  destination: string;
  status: Exclude<FlightStatusValue, typeof FlightStatus.ALL>;
  gate: string;
  terminal: string;
  departureTime: string;
};
