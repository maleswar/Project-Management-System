// auth.js

export const isAuthenticated = () => {
    // Implement your authentication logic here
    // For example, check if the user is logged in by verifying the existence of a token or session
    // Return true if authenticated, otherwise return false
    return sessionStorage.getItem("TLID") !== null;
  };
  