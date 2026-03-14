"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ResolvedCase {
  trackingId: string;
  category: string;
  department: string;
  description: string;
  createdAt: string;
  notes: string | null;
}

export default function HubPage() {
  const [cases, setCases] = useState<ResolvedCase[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchResolved = async () => {
      const token = localStorage.getItem("token");
      if (!token) return router.push("/login");
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cases/resolved`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCases(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResolved();
  }, [router]);

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Public Hub – Resolved Cases</h1>
      <div style={styles.caseList}>
        {cases.length === 0 ? (
          <p>No resolved cases yet.</p>
        ) : (
          cases.map(c => (
            <div key={c.trackingId} style={styles.caseCard}>
              <h3>{c.trackingId} – {c.category}</h3>
              <p><strong>Department:</strong> {c.department}</p>
              <p><strong>Description:</strong> {c.description}</p>
              {c.notes && <p><strong>Resolution notes:</strong> {c.notes}</p>}
              <p><em>Resolved on: {new Date(c.createdAt).toLocaleDateString()}</em></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "40px 20px" },
  title: { textAlign: "center" as const, marginBottom: "30px" },
  caseList: { display: "flex", flexDirection: "column" as const, gap: "20px" },
  caseCard: { border: "1px solid #eee", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  loading: { textAlign: "center", marginTop: "50px" }
};