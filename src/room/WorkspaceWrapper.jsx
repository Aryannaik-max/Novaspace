import { RoomProvider } from "@liveblocks/react/suspense";
import { useParams } from "react-router-dom";
import Workspace from "../pages/Workspace";

export default function WorkspaceWrapper() {
  const { id } = useParams();
  return (
    // Use the dynamic route param so Liveblocks room matches the opened workspace
    <RoomProvider
      id={`workspace-${id}`}
      authEndpoint="http://localhost:3002/api/auth/liveblocks"
    >
      <Workspace />
    </RoomProvider>
  );
}
