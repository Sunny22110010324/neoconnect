"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Optional: fetch current user info if you have an endpoint like /api/auth/me
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        // If token invalid, redirect to login
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome{user ? `, ${user.email}` : " to NeoConnect"}!</h1>
        <p style={styles.text}>This is your dashboard. More features coming soon.</p>
        <button
          style={styles.button}
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f2f5"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "400px",
    textAlign: "center"
  },
  title: {
    marginBottom: "20px"
  },
  text: {
    marginBottom: "30px",
    color: "#555"
  },
  button: {
    padding: "10px 20px",
    background: "#4facfe",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  loading: {
    textAlign: "center",
    marginTop: "50px"
  }
};