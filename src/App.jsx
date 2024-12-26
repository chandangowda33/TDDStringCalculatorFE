import { useState } from "react";
import Loader from "./Loader";

function App() {
  const [string, setString] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);

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
    setisLoading(true);
    try {
      const data = await getResult(string);
      setResult(data.result);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult("");
    } finally {
      setisLoading(false);
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
        <button type="submit" disabled={isLoading}>
          Calculate
        </button>
      </form>

      {isLoading && <Loader />}

      {result !== "" && !isLoading && (
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
