"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitCase() {
  const [form, setForm] = useState({
    category: "",
    department: "",
    location: "",
    severity: "Low",
    anonymous: false,
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({ ...prev, [name]: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Case submitted successfully! Tracking ID: ${data.trackingId}`);
        router.push("/cases");
      } else {
        alert(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Submit a Complaint / Feedback</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          style={styles.input}
        >
          <option value="">Select Category</option>
          <option>Safety</option>
          <option>Policy</option>
          <option>Facilities</option>
          <option>HR</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          style={styles.input}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            name="anonymous"
            checked={form.anonymous}
            onChange={handleChange}
          />
          <span>Submit anonymously</span>
        </label>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          style={{ ...styles.input, resize: "vertical" }}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Submitting..." : "Submit Case"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "30px"
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px"
  },
  input: {
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  button: {
    padding: "12px",
    background: "#4facfe",
    border: "none",
    color: "white",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};