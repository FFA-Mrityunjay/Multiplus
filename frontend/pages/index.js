import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/hello")
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Simple Fullstack Website</h1>
      <h2>Backend says:</h2>
      <p style={{ fontSize: 20, color: "blue" }}>{message}</p>
    </div>
  );
}
