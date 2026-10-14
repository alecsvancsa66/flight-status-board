// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { getFlights } from "../api/flightApi";
import type { Flight } from "../model/flight";
import { useFlightBoard } from "./useFlightBoard";

vi.mock("../api/flightApi", () => ({
  getFlights: vi.fn(),
}));

afterEach(() => {
  vi.useRealTimers();
});

it("does not start overlapping requests on the automatic refresh interval", async () => {
  vi.useFakeTimers();

  let resolveFirstRequest: (flights: Flight[]) => void;

  const firstRequest = new Promise<Flight[]>((resolve) => {
    resolveFirstRequest = resolve;
  });

  vi.mocked(getFlights).mockReturnValueOnce(firstRequest).mockResolvedValue([]);

  const { unmount } = renderHook(() => useFlightBoard());

  // The hook's effect starts the first request on mount.
  expect(getFlights).toHaveBeenCalledTimes(1);

  // The interval fires while that first request is still pending.
  await act(async () => {
    await vi.advanceTimersByTimeAsync(30_000);
  });

  // The in-progress guard should have prevented a second API call.
  expect(getFlights).toHaveBeenCalledTimes(1);

  // Finish the first request.
  await act(async () => {
    resolveFirstRequest([]);
    await firstRequest;
  });

  // The next interval tick can now start another request.
  await act(async () => {
    await vi.advanceTimersByTimeAsync(30_000);
  });

  expect(getFlights).toHaveBeenCalledTimes(2);

  unmount();
});
