export const create = (patientId, doctorId, token, appointment) => {
    return fetch(
        `http://localhost:8080/appointment/new/${patientId}/${doctorId}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: appointment,
        }
    )
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => console.log(err));
};
