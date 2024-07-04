import "./numbers.css";

const Numbers = ({ isLoading, calcPerformance, stats }) => {
  return (
    <div className="result-content-wrapper">
      <h2>Numbers</h2>
      {isLoading && (
        <p style={{ fontSize: "16px", color: "#0b80d4" }}>
          Calculation of numbers...
        </p>
      )}
      {!isLoading && (
        <div>
          <p>
            Max value : <strong>{stats.max}</strong>
          </p>
          <p>
            Min value: <strong>{stats.min}</strong>
          </p>
          <p>
            Median value: <strong>{stats.median}</strong>
          </p>
          <p>
            Average value: <strong>{stats.average}</strong>
          </p>
          <p>
            The longest increasing sequence has:{" "}
            <strong>{stats.sequenceIncrease}</strong> numbers
          </p>
          <p>
            The longest decreasing sequence has:{" "}
            <strong>{stats.sequenceDecrease}</strong> numbers
          </p>
        </div>
      )}
      {!isLoading ? (
        <p>
          Performance :{" "}
          <strong style={{ color: "green" }}>{calcPerformance} sec. </strong>
        </p>
      ) : (
        <p style={{ fontSize: "16px", color: "#0b80d4" }}>
          Performance calculation...
        </p>
      )}
    </div>
  );
};

export default Numbers;
