export const getpathReportById = (pathreportId, token) => {
  return fetch(`http://localhost:8080/pathreport/${pathreportId}`, {
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

export const deletepathReportById = (pathreportId, token) => {
  return fetch(`http://localhost:8080/pathreport/${pathreportId}`, {
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
export const getAllpathReports = () => {
  return fetch("http://localhost:8080/pathreport/all", {
    method: "GET",
  })
    .then((response) => {
      console.log("list", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const createpathReport = (pathreport, token) => {
  return fetch("http://localhost:8080/pathreport/create", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },

    body: JSON.stringify(pathreport),
  })
    .then((response) => {
      console.log("list", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUsersDropdown = () => {
  return fetch("http://localhost:8080/hospital/allpatients", {

  }).then((response) =>
    response.json()
  );
};
export const getUsersDropdowndoctors = () => {
  return fetch("http://localhost:8080/hospital/getalldoctors").then((response) =>
    response.json()
  );
};

export const getmessages = (body) => {
  return fetch("http://localhost:8080/chat/conversation/query/" + body.sender + "/" + body.reciever).then((response) =>
    response.json()
  );
};

export const getconversations = () => {
  return fetch("http://localhost:8080/chat/coversations").then((response) =>
    response.json()
  );
};

export const sendmessage = (message) => {
  return fetch("http://localhost:8080/chat/sendmessage", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },

    body: JSON.stringify(message),
  })
    .then((response) => {
      console.log("res: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getpathReportsByDoctor = (token) => {
  const doctorId = localStorage.getItem("doctor_id");
  return fetch(`http://localhost:8080/pathreport/pathreports-by-doctor/${doctorId}`, {
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

export const getpathReportsOfPatient = (patientId, token) => {
  return fetch(`http://localhost:8080/pathreport/pathreports-of-patient/${patientId}`, {
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
