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
import Wallet from "./pages/Wallet";
import UserDetails from "./pages/UserDetails";
import UserProfile from "./pages/UserProfile";
import WalletHistory from "./pages/WalletHistory";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import GameDetail from "./pages/GameDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/users" element={<UserDetails />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route
            path="/wallet-history"
            element={<WalletHistory />}
          />
          <Route path="/user/:id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;