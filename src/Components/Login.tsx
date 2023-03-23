import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

export const Login = () => {
  const { instance } = useMsal();

  const handleLogin = (loginType: any) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <>
      <button onClick={() => handleLogin("popup")}>Sign in</button>
    </>
  );
};
