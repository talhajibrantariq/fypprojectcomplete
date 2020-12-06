export const getReportById = (reportId, token) => {
  return fetch(`http://localhost:8080/report/${reportId}`, {
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

export const deleteReportById = (reportId, token) => {
  return fetch(`http://localhost:8080/report/${reportId}`, {
    method: "DELETE",
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
export const getAllReports = () => {
  return fetch("http://localhost:8080/report/all", {
    method: "GET",
  })
    .then((response) => {
      console.log("list", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const createReport = (report, token) => {
  return fetch("http://localhost:8080/report/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },

    body: JSON.stringify(report),
  })
    .then((response) => {
      console.log("list", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsersDropdown = () => {
  return fetch("http://localhost:8080/hospital/allpatients").then((response) =>
    response.json()
  );
};

export const getReportsByDoctor = (token) => {
  const doctorId = localStorage.getItem("doctor_id");
  return fetch(`http://localhost:8080/report/reports-by-doctor/${doctorId}`, {
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

export const getReportsOfPatient = (patientId, token) => {
  return fetch(`http://localhost:8080/report/reports-of-patient/${patientId}`, {
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