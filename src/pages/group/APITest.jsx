import React, { useEffect, useState } from "react";
import ConvertToTestData from "./ConvertData";

const APITest = () => {
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await ConvertToTestData();
        if (data) {
          setTestData(data);
        } else {
          console.error("No data returned from ConvertToTestData.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching test data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Converted Test Data</h1>
      {testData ? (
        <div>
          <h2>Groups</h2>
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(testData.groups, null, 2)}
          </pre>

          <h2>TimeTable</h2>
          {Object.entries(testData.timeTable).map(([email, days]) => (
            <div key={email} style={{ marginBottom: "20px" }}>
              <h3>{email}</h3>
              {Object.entries(days).map(([day, entries]) => (
                <div key={day}>
                  <h4>{day}</h4>
                  <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
                    {JSON.stringify(entries, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No test data available.</p>
      )}
    </div>
  );
};

export default APITest;