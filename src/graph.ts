import { graphConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callMsGraphMe(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(graphConfig.graphMeEndpoint, options)
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
}

export async function callMsGraphIsMemberOf(
  accessToken: string,
  groupName: string
) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("ConsistencyLevel", "eventual");

  const options = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    graphConfig.graphGroupEndpoint +
      `/microsoft.graph.group?$count=true&$orderby=displayName&$filter=displayName eq '${groupName}'`,
    options
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
}
