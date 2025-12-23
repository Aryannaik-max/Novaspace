import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";

import WorkspaceWrapper from "./room/WorkspaceWrapper";

function App() {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_MEHgQAV84EsRn6EUQFamELm8dFNNU8DJeUAFskFmGq6tuVBftrTS7pNmCUkauGpf"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Workspace needs its own room */}
        <Route path="/workspace/:id" element={<WorkspaceWrapper />} />
      </Routes>
    </LiveblocksProvider>
  );
}

export default App;
