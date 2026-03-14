"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Case {
  id: number;
  trackingId: string;
  category: string;
  department: string;
  location: string;
  severity: string;
  status: string;
  createdAt: string;
  anonymous: boolean;
  user?: { name: string; email: string };
  assignedUser?: { name: string };
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCases = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error(err);
        alert("Error loading cases");
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [router]);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cases</h1>
      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Category</th>
              <th>Department</th>
              <th>Status</th>
              <th>Severity</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id}>
                <td>{c.trackingId}</td>
                <td>{c.category}</td>
                <td>{c.department}</td>
                <td>{c.status}</td>
                <td>{c.severity}</td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    style={styles.viewButton}
                    onClick={() => router.push(`/cases/${c.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  viewButton: {
    padding: "6px 12px",
    background: "#4facfe",
    border: "none",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer"
  },
  loading: {
    textAlign: "center",
    marginTop: "50px"
  }
};