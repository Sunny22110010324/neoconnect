"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page when the root is accessed
    router.replace("/login");
  }, [router]);

  // Optional: show a loading indicator while redirecting
  return (
    <div style={styles.container}>
      <p>Redirecting to login...</p>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "system-ui, sans-serif",
  },
};