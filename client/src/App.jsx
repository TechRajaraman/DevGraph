import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Developers from "./pages/Developers.jsx";
import DeveloperDetail from "./pages/DeveloperDetail.jsx";
import Technologies from "./pages/Technologies.jsx";
import TechnologyDetail from "./pages/TechnologyDetail.jsx";
import CareerExplorer from "./pages/CareerExplorer.jsx";
import "./styles/index.css";

function NotFound() {
  return (
    <main className="page">
      <p className="eyebrow">404</p>
      <h1>Graph node not found.</h1>
    </main>
  );
}
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/developers/:id" element={<DeveloperDetail />} />
        <Route path="/technologies" element={<Technologies />} />
        <Route path="/technologies/:id" element={<TechnologyDetail />} />
        <Route path="/career" element={<CareerExplorer />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
