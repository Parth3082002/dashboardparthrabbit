// import { useEffect, useState } from "react";
// import API from "../services/api";
// import socket from "../services/socket";

// function PublishedNumbers() {
//   const [numbers, setNumbers] = useState([]);

//   const fetchHistory = async () => {
//     const response = await API.get(
//       "/published-history"
//     );
//     setNumbers(response.data);
//   };

//   useEffect(() => {
//     fetchHistory();

//     socket.on("numberPublished", () => {
//       fetchHistory();
//     });

//     return () => {
//       socket.off("numberPublished");
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Published Numbers</h2>

//       {numbers.length === 0 ? (
//         <p>No published numbers yet</p>
//       ) : (
//         numbers.map((num, index) => (
//           <div key={index}>
//             Round {numbers.length - index} → {num}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default PublishedNumbers;
import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import socket from "../services/socket";

function PublishedNumbers() {
  const [numbers, setNumbers] =
    useState([]);

  const fetchHistory =
    async () => {
      const response =
        await API.get(
          "/published-history"
        );

      setNumbers(
        response.data
      );
    };

  useEffect(() => {
    fetchHistory();

    socket.on(
      "numberPublished",
      fetchHistory
    );

    return () => {
      socket.off(
        "numberPublished",
        fetchHistory
      );
    };
  }, []);

  return (
    <div className="section-box">
      <div className="section-head">
        <div>
          <h2>Published history</h2>
          <p className="page-subtitle">
            Latest rounds, updated in real time.
          </p>
        </div>
      </div>

      {numbers.length === 0 ? (
        <p className="page-subtitle">No published numbers yet.</p>
      ) : (
        <div className="history-list history-list--scroll">
          {numbers.map((number, index) => (
            <div className="history-row" key={index}>
              <div className="pill">
                Round {numbers.length - index}
              </div>
              <div className="history-value">{number}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublishedNumbers;