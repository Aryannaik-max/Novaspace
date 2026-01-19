import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import WorkspaceWrapper from "./room/WorkspaceWrapper";
import Signup from "./pages/Signup";

// Create a separate component that uses the auth context
function LiveblocksConfig({ children }) {
  const { token, loading, user } = useAuth();

  // Wait for auth to initialize before setting up Liveblocks
  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <LiveblocksProvider 
      authEndpoint={async (room) => {

        if (!token) {
          console.error('No token available!');
          throw new Error('No authentication token available');
        }

        const response = await fetch(`${backendUrl}/api/v1/auth/liveblocks`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ room }),
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Auth failed:', errorData);
          throw new Error('Failed to authenticate with Liveblocks');
        }
        
        return await response.json();
      }}
      resolveUsers={async ({ userIds }) => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/users/batch` , {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIds }),
    });
     
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    // Your controller already returns the formatted array directly
    const users = await response.json();
    console.log('Resolved users:', users);
    return users;
    
  } catch (error) {
    console.error('Error resolving users:', error);
    // Fallback
    return userIds.map(userId => ({
      name: userId,
      avatar: `https://ui-avatars.com/api/?name=${userId}&background=random`,
    }));
  }
}}
      resolveMentionSuggestions={async ({ text }) => {
        // Optional: Return user suggestions for @mentions
        // You can fetch from your API here if needed
        return [];
      }}
    >
      {children}
    </LiveblocksProvider>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <LiveblocksConfig>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/workspace/:id" 
            element={
              <ProtectedRoute>
                <WorkspaceWrapper />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </LiveblocksConfig>
    </AuthProvider>
  );
}

export default App;