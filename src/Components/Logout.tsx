import { useMsal } from "@azure/msal-react";

export const Logout = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType: string) => {
    if (logoutType === "redirect") {
      instance.logoutRedirect();
    }
  };
  return (
    <>
      <button
        style={{ marginTop: "16px" }}
        onClick={() => handleLogout("redirect")}
      >
        Sign out
      </button>
    </>
  );
};
