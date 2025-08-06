import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import requireAuth from "./hocs/requireAuth";

const AuthenticatedDashboard = requireAuth(DashboardPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<AuthenticatedDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
