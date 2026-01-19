import { RoomProvider } from "@liveblocks/react/suspense";
import { useParams } from "react-router-dom";
import Workspace from "../pages/Workspace";

export default function WorkspaceWrapper() {
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    // Use the dynamic route param so Liveblocks room matches the opened workspace
    <RoomProvider
      id={`workspace-${id}`}
      authEndpoint={`${backendUrl}/api/v1/auth/liveblocks`}
    >
      <Workspace />
    </RoomProvider>
  );
}