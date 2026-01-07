import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";

import WorkspaceWrapper from "./room/WorkspaceWrapper";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <LiveblocksProvider publicApiKey={"pk_dev_MEHgQAV84EsRn6EUQFamELm8dFNNU8DJeUAFskFmGq6tuVBftrTS7pNmCUkauGpf"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Workspace needs its own room */}
          <Route path="/workspace/:id" element={<WorkspaceWrapper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </LiveblocksProvider>
    </AuthProvider>
  );
}

export default App;
