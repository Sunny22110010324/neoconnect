"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function register() {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        { email, password }
      );
      if (res.status === 200 || res.status === 201) {
        alert("Registration successful! Please login.");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>NeoConnect Register</h1>
        <input
          style={styles.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={register}>
          Register
        </button>
        <p style={styles.link}>
          Already have an account? <a href="/login">Login</a>
        </p>
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
    background: "linear-gradient(135deg,#4facfe,#00f2fe)"
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center"
  },
  title: {
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4facfe",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  link: {
    marginTop: "15px",
    fontSize: "14px"
  }
};