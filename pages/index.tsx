import type OpenLogin from "@toruslabs/openlogin";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [openlogin, setOpenLogin] = useState<OpenLogin>();
  const [privKey, setPrivKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fn = async () => {
      const OpenLogin = (await import("@toruslabs/openlogin")).default;
      const openlogin = new OpenLogin({
        clientId:
          "BC01p_js5KUIjvqYYAzWlDKt6ft--5joV0TbZEKO7YbDTqnmU5v0sq_4wgkyh0QAfZZAi-v6nKD4kcxkAqPuj8U",
        network: "mainnet",
        redirectUrl: window.location.origin,
      });
      await openlogin.init();

      setOpenLogin(openlogin);
      setPrivKey(openlogin.privKey);
    };

    fn().catch((err) => setError(err.message));
  }, []);

  const onClickLogin = async () => {
    if (openlogin?.privKey) return;

    await openlogin.login();
    setPrivKey(openlogin.privKey);
  };

  const onClickLogout = async () => {
    if (!openlogin?.privKey) return;

    await openlogin.logout();
    setPrivKey(openlogin.privKey);
  };

  return (
    <div>
      {privKey ? (
        <>
          <p>Logged in {privKey}</p>
          <button onClick={onClickLogout}>Logout</button>
        </>
      ) : (
        <button onClick={onClickLogin}>Login</button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
