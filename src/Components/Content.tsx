import { useMsal } from "@azure/msal-react";
import { useState } from "react";
import { loginRequest } from "../authConfig";
import { callMsGraphIsMemberOf, callMsGraphMe } from "../graph";
import { ProfileData } from "./ProfileData";

export const Content = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data

    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraphMe(response.accessToken).then((response: any) => {
          setGraphData(response);
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraphMe(response.accessToken).then((response: any) =>
            setGraphData(response)
          );
        });
      });
  }

  return (
    <>
      <div>
        {graphData ? (
          <>
            <ProfileData graphData={graphData} />
          </>
        ) : (
          <button onClick={RequestProfileData}>
            Request Profile Information
          </button>
        )}
      </div>
    </>
  );
};
