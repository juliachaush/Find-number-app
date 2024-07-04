import "./fileLoader.css";
import GitHubIcon from "../Icons/GitHubIcon";
import { useState } from "react";

const FileLoader = () => {
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [calcPerformance, setCalcPerformance] = useState("");
  const [stats, setStats] = useState({
    max: null,
    min: null,
    median: null,
    average: null,
    sequenceIncrease: null,
    sequenceDecrease: null,
  });

  const handleFileRead = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const numbers = content.split(/\r?\n/).map(Number);
        const start = performance.now();
        calculateStatistics(numbers);
        const end = performance.now();
        setCalcPerformance(((end - start) / 1000).toFixed(5));
      };
      reader.readAsText(file);
    }
  };

  const calculateStatistics = (numbers) => {
    let max = numbers[0];
    let min = numbers[0];
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] > max) max = numbers[i];
      if (numbers[i] < min) min = numbers[i];
      sum += numbers[i];
    }

    const average = (sum / numbers.length).toFixed(0);
    const median = calculateMedian(numbers);
    const sequenceIncrease = longestIncreasingSubsequence(numbers);
    const sequenceDecrease = longestDecreasingSubsequence(numbers);

    setStats({ max, min, median, average, sequenceIncrease, sequenceDecrease });
    setIsLoading(false);
  };

  const calculateMedian = (numbers) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 !== 0
      ? sorted[mid]
      : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(0);
  };

  const longestIncreasingSubsequence = (arr) => {
    if (arr.length === 0) return [];

    let maxLength = 1;
    let currentLength = 1;
    let endIndex = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[i - 1]) {
        currentLength++;
      } else {
        if (currentLength > maxLength) {
          maxLength = currentLength;
          endIndex = i - 1;
        }
        currentLength = 1;
      }
    }

    if (currentLength > maxLength) {
      maxLength = currentLength;
      endIndex = arr.length - 1;
    }

    const startIndex = endIndex - maxLength + 1;
    return arr.slice(startIndex, endIndex + 1).length;
  };

  function longestDecreasingSubsequence(arr) {
    if (arr.length === 0) return 0;

    let maxLength = 1;
    let currentLength = 1;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        currentLength++;
        if (currentLength > maxLength) {
          maxLength = currentLength;
        }
      } else {
        currentLength = 1;
      }
    }

    return maxLength;
  }

  return (
    <div>
      <GitHubIcon />
      <div className="form-wrapper">
        <h1>Find your numbers 🔍</h1>
        <div className="input-file-container">
          <form action="#">
            <input
              className="input-file"
              id="my-file"
              accept=".txt"
              type="file"
              onChange={handleFileRead}
            />
            <label
              tabIndex="0"
              htmlFor="my-file"
              className="input-file-trigger"
            >
              Upload file .txt
            </label>
            <div className="file-wrapper">
              {fileName ? (
                <p className="file-return">{fileName}</p>
              ) : (
                <p className="file-return">no file selected</p>
              )}
            </div>
          </form>
        </div>
      </div>

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
    </div>
  );
};

export default FileLoader;
