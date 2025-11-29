import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const h = String(time.getHours()).padStart(2, "0");
  const m = String(time.getMinutes()).padStart(2, "0");
  const s = String(time.getSeconds()).padStart(2, "0");

  return (
    <div className="time">
      <style>{`
        .box {
          width: calc(100vw / 8 - 40px);
          height: 150px;
          border: 5px solid #fff;
          border-radius: 15px;
          font-size: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .time {
          width: 100vw;
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
        }
      `}</style>

      {[...h].map((digit, i) => (
        <div key={"h" + i} className="box hour">{digit}</div>
      ))}

      <div className="box colon">:</div>

      {[...m].map((digit, i) => (
        <div key={"m" + i} className="box min">{digit}</div>
      ))}

      <div className="box colon">:</div>

      {[...s].map((digit, i) => (
        <div key={"s" + i} className="box sec">{digit}</div>
      ))}
    </div>
  );
}

export default Clock;
