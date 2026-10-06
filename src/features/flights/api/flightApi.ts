import { STATUS_OPTIONS } from "../model/flight";
import type { Flight } from "../model/flight";

type JsonPlaceholderPost = {
  id: number;
  userId: number;
  title: string;
};

function deriveStatus(postId: number, userId: number) {
  return STATUS_OPTIONS[(postId + userId) % STATUS_OPTIONS.length];
}

function deriveGate(postId: number, userId: number) {
  const gateLetters = ["A", "B", "C", "D", "E"] as const;
  const gateLetter = gateLetters[(postId + userId) % gateLetters.length];
  const gateNumber = ((postId * 7 + userId * 3) % 20) + 1;

  return `Gate ${gateLetter}-${gateNumber}`;
}

function deriveDepartureTime(postId: number, userId: number) {
  const minutesSinceMidnight =
    (((postId * 37 + userId * 11) % 1440) + 480) % 1440;
  const hours = Math.floor(minutesSinceMidnight / 60);
  const minutes = minutesSinceMidnight % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function mapPostToFlight(post: JsonPlaceholderPost): Flight {
  return {
    flightNumber: `FL-${post.id}`,
    destination: post.title,
    status: deriveStatus(post.id, post.userId),
    gate: deriveGate(post.id, post.userId),
    terminal: `Terminal ${post.userId}`,
    departureTime: deriveDepartureTime(post.id, post.userId),
  };
}

export async function getFlights(): Promise<Flight[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const posts = (await response.json()) as JsonPlaceholderPost[];

  return posts.map(mapPostToFlight);
}
