import { useState } from "react";

// Simple mock user. Replace with real authentication logic as needed.
export function useUser() {
  // You can set this to null to simulate a logged-out state
  const [user] = useState({ id: "1", username: "demo_user" });
  return { user };
}
