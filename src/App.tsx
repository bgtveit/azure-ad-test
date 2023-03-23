import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./Components/Login";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useIsAuthenticated,
} from "@azure/msal-react";
import { Content } from "./Components/Content";
import { Logout } from "./Components/Logout";
import { loginRequest } from "./authConfig";
import { callMsGraphIsMemberOf } from "./graph";

function App() {
  const { instance, accounts } = useMsal();
  const IsAuthenticated = useIsAuthenticated();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const checkAuthorization = (): boolean => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphIsMemberOf(response.accessToken, "GiveAccess").then(
          (response: any) => {
            let returned: any[] = response.value;
            returned.length === 0
              ? setIsAuthorized(false)
              : setIsAuthorized(true);
          }
        );
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraphIsMemberOf(response.accessToken, "GiveAccess").then(
            (response: any) => {
              let returned: any[] = response.value;
              returned.length === 0
                ? setIsAuthorized(false)
                : setIsAuthorized(true);
            }
          );
        });
      });
    return false;
  };

  const visibleTodos = useMemo(() => {
    checkAuthorization();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <AuthenticatedTemplate>
        <>
          {accounts.length > 0 && (
            <div>{`Welcome ${accounts[0].name} (${accounts[0].username})`}</div>
          )}

          {!!!isAuthorized ? (
            "You do not have the correct authorisation. Please contact your administrator."
          ) : (
            <Content />
          )}
          <br />
          <Logout />
        </>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
        <Login />
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
