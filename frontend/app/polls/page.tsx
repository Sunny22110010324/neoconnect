"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Poll {
  id: number;
  question: string;
  options: string[];
  userVote: number | null;
  createdAt: string;
}

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPoll, setNewPoll] = useState({ question: "", options: "" });
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polls`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPolls(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId: number, optionIndex: number) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polls/${pollId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ option: optionIndex })
      });
      if (res.ok) {
        // Refresh polls to update userVote
        fetchPolls();
      } else {
        alert("Vote failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const optionsArray = newPoll.options.split(",").map(s => s.trim());
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/polls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ question: newPoll.question, options: optionsArray })
      });
      if (res.ok) {
        setNewPoll({ question: "", options: "" });
        setShowCreate(false);
        fetchPolls();
      } else {
        alert("Failed to create poll");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Polls</h1>
      <button onClick={() => setShowCreate(!showCreate)} style={styles.button}>
        {showCreate ? "Cancel" : "Create New Poll"}
      </button>
      {showCreate && (
        <form onSubmit={handleCreatePoll} style={styles.form}>
          <input
            type="text"
            placeholder="Question"
            value={newPoll.question}
            onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Options (comma separated)"
            value={newPoll.options}
            onChange={(e) => setNewPoll({ ...newPoll, options: e.target.value })}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Create</button>
        </form>
      )}
      <div style={styles.pollList}>
        {polls.map(poll => (
          <div key={poll.id} style={styles.pollCard}>
            <h3>{poll.question}</h3>
            <div style={styles.options}>
              {poll.options.map((opt, idx) => (
                <div key={idx} style={styles.option}>
                  <button
                    onClick={() => handleVote(poll.id, idx)}
                    disabled={poll.userVote !== null}
                    style={{
                      ...styles.voteButton,
                      background: poll.userVote === idx ? "#4caf50" : "#4facfe"
                    }}
                  >
                    {opt}
                  </button>
                  {poll.userVote === idx && <span> (Your vote)</span>}
                </div>
              ))}
            </div>
            <p style={styles.date}>Created: {new Date(poll.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "40px 20px" },
  title: { textAlign: "center" as const, marginBottom: "30px" },
  button: { padding: "10px 20px", background: "#4facfe", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" as const, gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", border: "1px solid #ccc", borderRadius: "6px" },
  pollList: { display: "flex", flexDirection: "column" as const, gap: "20px" },
  pollCard: { border: "1px solid #eee", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  options: { display: "flex", flexDirection: "column" as const, gap: "10px", marginTop: "10px" },
  option: { display: "flex", alignItems: "center", gap: "10px" },
  voteButton: { padding: "8px 16px", border: "none", borderRadius: "4px", color: "white", cursor: "pointer" },
  date: { fontSize: "0.9em", color: "#666", marginTop: "10px" },
  loading: { textAlign: "center", marginTop: "50px" }
};