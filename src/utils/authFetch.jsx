export const authFetch = async (url, options = {}) => {
    let token = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshToken");
    const authOptions = {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        }
      };
    
      let response = await fetch(url, authOptions);
    
      if (response.status === 401 && refreshToken) {
        const refreshResponse = await fetch("http://localhost:8080/api/auth/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(refreshToken)
          });
          if (refreshResponse.ok) {
            const json = await refreshResponse.json();
            localStorage.setItem("token", json.token);
            authOptions.headers.Authorization = `Bearer ${json.token}`;
            response = await fetch(url, authOptions);
          } else {
            localStorage.clear();
      window.location.href = "/login";
    }
  }
  return response;
};