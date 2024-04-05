"use client";
import "../scss/LoginFormStyle.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type User = {
  id: string;
  email: string;
};
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

  const [error, setError] = useState<Error | null>(null);
  const [valid, setValid] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user: User },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (res.data.user) {
      const { email, ...userData } = res.data.user;
      setUser({ ...userData, email: email || "" });
      setValid("Please check your email");
    } else {
      setError(res.error);
      console.log(res.error);
    }
    // setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (res.data.user) {
      console.log("sigingin in");
      const { email, ...userData } = res.data.user;
      setUser({ ...userData, email: email || "" });
      router.push("/Dashboard");
    } else {
      setError(res.error);
      console.log(res.error);
    }
    //  setUser(res.data.user);
    router.refresh();
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  console.log({ loading, user });

  if (loading) {
    return <h1>loading..</h1>;
  }

  return (
    <main id="LoginFormPage">
      {/* <div> */}
      <div id="LoginFormContainer">
        <div id="LoginForm">
          <div
            id="LoginFormPageTitle"
            style={{
              textAlign: "center",
              marginBottom: "100px",
              marginTop: "30px",
            }}
          >
            <b style={{ fontSize: "20px", color: "#3c4349" }}>Welcome Back!</b>
            <h2>Sign in to your account!</h2>
          </div>
          <label htmlFor="Email">Email</label> <br />
          <input
            style={{ marginBottom: "30px" }}
            id="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <br />
          <label htmlFor="password">Password</label> <br />
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            style={{ marginBottom: "10px" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error != null ? (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {error.message}
            </div>
          ) : (
            ""
          )}
          {valid != "" ? (
            <div style={{ color: "green", marginBottom: "10px" }}>{valid}</div>
          ) : (
            ""
          )}
          <div
            style={{
              // display: "flex",
              //justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <button onClick={handleSignUp}>
              <b>Sign Up</b>
            </button>
            <button style={{ marginTop: "30px" }} onClick={handleSignIn}>
              <b>Sign In</b>
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
}
