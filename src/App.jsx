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
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import CreateUser from "./pages/CreateUser";
import Users from "./pages/UserDetails";
import Wallet from "./pages/Wallet";
import UserDetails from "./pages/UserDetails";
import WalletHistory from "./pages/WalletHistory";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet-history"
          element={
            <ProtectedRoute>
              <WalletHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;