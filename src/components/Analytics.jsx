// import { useEffect, useState } from "react";
// import API from "../services/api";
// import socket from "../services/socket";

// function Analytics() {
//   const [analytics, setAnalytics] = useState({});

//   const fetchAnalytics = async () => {
//     const response = await API.get("/analytics");
//     setAnalytics(response.data);
//   };

//   useEffect(() => {
//     fetchAnalytics();

//     socket.on("timerUpdate", () => {
//       fetchAnalytics();
//     });

//     socket.on("numberPublished", () => {
//       fetchAnalytics();
//     });

//     return () => {
//       socket.off("timerUpdate");
//       socket.off("numberPublished");
//     };
//   }, []);

//   return (
//     <div>
//       <h2>Live Analytics</h2>

//       {Object.keys(analytics).length === 0 ? (
//         <p>No selections yet</p>
//       ) : (
//         Object.entries(analytics).map(([number, count]) => (
//           <div key={number}>
//             Number {number} → {count} users
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Analytics;
import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import socket from "../services/socket";

function Analytics() {
  const [data, setData] =
    useState(null);

  const fetchAnalytics =
    async () => {
      const response =
        await API.get(
          "/analytics"
        );

      setData(
        response.data
      );
    };

  useEffect(() => {
    fetchAnalytics();

    socket.on(
      "numberPublished",
      fetchAnalytics
    );

    return () => {
      socket.off(
        "numberPublished",
        fetchAnalytics
      );
    };
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>
        Total Pool:
        {" "}
        {
          data.totalPool
        }
      </h2>

      <hr />

      <h2>
        Number Wise
        Analysis
      </h2>

      {Object.entries(
        data.numberTotals
      ).map(
        (
          [
            number,
            amount,
          ]
        ) => (
          <div
            key={
              number
            }
          >
            Number{" "}
            {
              number
            }
            →{" "}
            {
              amount
            }
            points
            (
            {data.percentages[
              number
            ]?.toFixed(
              2
            )}
            %)
          </div>
        )
      )}

      <hr />

      <h2>
        User Wise Bets
      </h2>

      {Object.entries(
        data.userBets
      ).map(
        (
          [
            userId,
            bets,
          ]
        ) => (
          <div
            key={
              userId
            }
          >
            <h4>
              User:
              {" "}
              {
                userId
              }
            </h4>

            {bets.map(
              (
                bet,
                index
              ) => (
                <div
                  key={
                    index
                  }
                >
                  Number{" "}
                  {
                    bet.selectedNumber
                  }
                  →{" "}
                  {
                    bet.betAmount
                  }
                </div>
              )
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Analytics;