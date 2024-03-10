// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signUp", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resolve({ data });
      } else {
        const err = await response.text();
        reject({ err });
      }
    } catch (error) {
      reject({ error });
      console.log(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.text();
        reject({ err });
      }
    } catch (error) {
      reject({ error });
      console.log(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    //TODO: on server we will  remove user info
    resolve({ data: "sucess" });
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        body: JSON.stringify({email}),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const err = await response.text();
        reject({ err });
      }
    } catch (error) {
      reject({ error });
      console.log(error);
    }
  });
}

