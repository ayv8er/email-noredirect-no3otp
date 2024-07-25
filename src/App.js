import { magic } from "./magic";
import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      getUserMetadata();
    } catch (err) {
      console.log(err);
    }
  };

  const getUserMetadata = async () => {
    try {
      const data = await magic.user.getInfo();
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      magic.user.logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserMetadata();
  }, []);

  return (
    <main>
      <h1>{user ? user.email : "Not logged in"}</h1>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      <div className="description">
        <h3>Magic link + No Redirect + No 3 Digit OTP</h3>
        <h4>
          User submits email, then receives emailed magic link. User clicks link
          and logs in. No user protection against phishing. Notice session is
          issued where flow initiates.
        </h4>
      </div>
    </main>
  );
}
