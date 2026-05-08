// import ManualPublish from "./components/ManualPublish";
// import Analytics from "./components/Analytics";
// import PublishedNumbers from "./components/PublishedNumbers";

// function App() {
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>RabbitMQ Admin Dashboard</h1>

//       <ManualPublish />

//       <hr />

//       <PublishedNumbers />

//       <hr />

//       <Analytics />
//     </div>
//   );
// }

// export default App;
import ManualPublish from "./components/ManualPublish";
import Analytics from "./components/Analytics";
import PublishedNumbers from "./components/PublishedNumbers";

function App() {
  return (
    <div
      style={{
        padding:
          "20px",
      }}
    >
      <h1>
        Admin Panel
      </h1>

      <ManualPublish />

      <hr />

      <PublishedNumbers />

      <hr />

      <Analytics />
    </div>
  );
}

export default App;