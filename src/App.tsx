import { useEffect, useState } from "react";
import LoginPage from "./views/LoginPage";
import Dashboard from "./views/Dashboard";
import "./App.css";

function App() {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (path === "/dashboard") {
    return <Dashboard />;
  }

  return <LoginPage />;
}

export default App;
