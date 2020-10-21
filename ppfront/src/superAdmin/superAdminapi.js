/** Hospital's Actions **/
export const hospitalsignup = (user, token) => {
  return fetch("http://localhost:8080/superAdmin/hospitalsignup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getallhospitals = (token) => {
  return fetch(`http://localhost:8080/superAdmin/getallhospitals`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response);
    return response.json();
  });
};

export const deleteHospital = (hospitalId, token) => {
  return fetch(`http://localhost:8080/superAdmin/deletehospitals`, {
    method: "DELETE",
    body: JSON.stringify({
      id: hospitalId,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response);
    return response.json();
  });
};

export const updateHospital = (hospital, next) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.hospital = hospital;
      localStorage.setItem("jwt", JSON.stringify(auth));
      next();
    }
  }
};
