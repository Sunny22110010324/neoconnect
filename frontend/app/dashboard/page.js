"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to NeoConnect Dashboard</h1>
      <p style={styles.text}>You are logged in. Choose an option below:</p>
      
      <div style={styles.buttonGrid}>
        <button onClick={() => navigateTo("/submit-case")} style={styles.navButton}>
          Submit Case
        </button>
        <button onClick={() => navigateTo("/cases")} style={styles.navButton}>
          View Cases
        </button>
        <button onClick={() => navigateTo("/polls")} style={styles.navButton}>
          Polls
        </button>
        <button onClick={() => navigateTo("/hub")} style={styles.navButton}>
          Public Hub
        </button>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px",
    textAlign: "center" 
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px"
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#555"
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginBottom: "30px"
  },
  navButton: {
    padding: "12px 20px",
    background: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s"
  },
  logoutButton: {
    padding: "10px 30px",
    background: "#ff4757",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  }
};