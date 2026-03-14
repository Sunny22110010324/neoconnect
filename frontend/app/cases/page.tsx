"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface CaseDetail {
  id: number;
  trackingId: string;
  category: string;
  department: string;
  location: string;
  severity: string;
  anonymous: boolean;
  description: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { name: string; email: string };
  assignedUser?: { name: string };
}

export default function CaseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const caseId = params.id as string;

  useEffect(() => {
    if (caseId) fetchCase();
  }, [caseId]);

  const fetchCase = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/${caseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCaseData(data);
      setNewStatus(data.status);
      setNewNotes(data.notes || "");
    } catch (err) {
      console.error(err);
      alert("Error loading case");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/${caseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus, notes: newNotes })
      });
      if (res.ok) {
        alert("Case updated");
        fetchCase();
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!caseData) return <div style={styles.loading}>Case not found</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Case Details</h1>
      <div style={styles.card}>
        <p><strong>Tracking ID:</strong> {caseData.trackingId}</p>
        <p><strong>Category:</strong> {caseData.category}</p>
        <p><strong>Department:</strong> {caseData.department}</p>
        <p><strong>Location:</strong> {caseData.location}</p>
        <p><strong>Severity:</strong> {caseData.severity}</p>
        <p><strong>Anonymous:</strong> {caseData.anonymous ? "Yes" : "No"}</p>
        <p><strong>Description:</strong> {caseData.description}</p>
        <p><strong>Status:</strong> {caseData.status}</p>
        <p><strong>Notes:</strong> {caseData.notes || "None"}</p>
        <p><strong>Submitted:</strong> {new Date(caseData.createdAt).toLocaleString()}</p>
        <p><strong>Last Updated:</strong> {new Date(caseData.updatedAt).toLocaleString()}</p>
        {caseData.user && <p><strong>Submitted by:</strong> {caseData.user.name} ({caseData.user.email})</p>}
        {caseData.assignedUser && <p><strong>Assigned to:</strong> {caseData.assignedUser.name}</p>}
      </div>

      {/* Update form – visible to case managers, admins, secretariat */}
      <div style={styles.card}>
        <h2>Update Case</h2>
        <form onSubmit={handleUpdate} style={styles.form}>
          <label>
            Status:
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} style={styles.input}>
              <option>New</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Pending</option>
              <option>Resolved</option>
              <option>Escalated</option>
            </select>
          </label>
          <label>
            Notes:
            <textarea
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              rows={4}
              style={styles.input}
            />
          </label>
          <button type="submit" disabled={updating} style={styles.button}>
            {updating ? "Updating..." : "Update Case"}
          </button>
        </form>
      </div>

      <button onClick={() => router.back()} style={styles.button}>Back</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px 20px"
  } as const,
  title: {
    textAlign: "center" as const,
    marginBottom: "30px"
  } as const,
  card: {
    border: "1px solid #eee",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  } as const,
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px"
  } as const,
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px"
  } as const,
  button: {
    padding: "10px 20px",
    background: "#4facfe",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  } as const,
  loading: {
    textAlign: "center" as const,
    marginTop: "50px"
  } as const
};