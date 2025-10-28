import React, { useState, useEffect } from "react";
import API from "./api";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);


  // Fetch all messages (public)
  const fetchMessages = async () => {
    const res = await API.get("/api/messages");
    setMessages(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Login for existing users
  const handleLogin = async () => {
    try {
      const res = await API.post("/api/token", new URLSearchParams({
        username,
        password
      }));
      localStorage.setItem("token", res.data.access_token);
      setLoggedIn(true);
      alert("Logged in!");
    } catch (err) {
      alert("Login failed");
    }
  };

  const handleRegister = async () => {
  try {
    await API.post("/api/users", {
      username,
      password
    });
    alert("Account created! You can log in now.");
  } catch (err) {
    alert("Failed to create account.");
    console.error(err);
  }
};

  // Post a new message (requires login)
  const handlePost = async () => {
  try {
    const token = localStorage.getItem("token"); // or however you're storing it

    await API.post("/api/messages", 
      { content: newMessage },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setNewMessage("");
    fetchMessages();
  } catch (err) {
    alert("You must be logged in to post.");
  }
};


// --- return JSX here ---
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Social Media Feed</h1>

      {!loggedIn ? (
        <div>
          <h3>Login or Create Account</h3>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin && handleRegister}>Login</button>
        </div>
        ) : (
        <div>
          <h3>Create Message</h3>
          <input
            placeholder="What's on your mind?"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handlePost}>Post</button>
        </div>
      )}

        <h2>All Messages</h2>
        <ul>
          {messages.map((m) => (
            <li key={m.owner}>{m.content}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;
