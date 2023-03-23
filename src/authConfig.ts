export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/ ${
      import.meta.env.VITE_AZURE_TENANT_ID
    }`, // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: import.meta.env.VITE_AZUREAD_REDIRECTURL,
    postLogoutRedirectUri: import.meta.env.VITE_AZUREAD_POSTLOGOUT_REDIRECTURL,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphGroupEndpoint: "https://graph.microsoft.com/v1.0/me/memberOf",
};
