import { useState } from "react";

function App() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function getResult(string) {
    if (!string) string = "0";
    try {
      const encodedString = encodeURIComponent(string);
      // Replace with your actual API endpoint
      const res = await fetch(
        `https://tddstringcalculatorbe.onrender.com/calculate?string=${encodedString}`
      );
      if (!res.ok) throw new Error("Failed to fetch the result");

      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await getResult(string);
      setResult(data.result);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#073356",
        background: "grey",
        height: "100vh",
      }}
    >
      <h1>String Calculator</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2.4px",
        }}
      >
        <input
          type="text"
          value={string}
          onChange={(e) => setString(e.target.value)}
          placeholder="Enter the string"
        />
        <button type="submit">Calculate</button>
      </form>

      {result !== "" && (
        <h3 style={{ color: "Blue", textAlign: "center" }}>
          Result:<span> {result}</span>
        </h3>
      )}
      <h4 style={{ color: "red" }}>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </h4>
    </div>
  );
}

export default App;
