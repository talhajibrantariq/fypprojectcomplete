import { isEmpty } from "lodash";
import moment from "moment";
import React from "react";
import { getUsersDropdown } from "./pathreportapi";
import { getReportsOfPatientByDoctor as getBloodReports } from "./reportapi";

export const ViewReportsByPatient = () => {
    const [AllPatients, setAllPatients] = React.useState([]);
    const [SelectedPatient, setSelectedPatient] = React.useState();
    const [SelectedWeek, setSelectedWeek] = React.useState();
    const [BloodReports, setBloodReports] = React.useState([]);
    const [Error, setError] = React.useState("");

    React.useEffect(() => {
        getUsersDropdown().then((res) => {
            console.log(res);
            setAllPatients(res.data);
        });
    }, []);

    React.useEffect(() => {
        if (SelectedPatient && SelectedWeek) {
            const fromDate = String(moment(SelectedWeek).startOf("isoWeek"));
            // .format("YYYY-MM-DD");
            const toDate = String(moment(SelectedWeek).endOf("isoWeek"));
            // .format("YYYY-MM-DD");

            getBloodReports(SelectedPatient, fromDate, toDate).then((data) => {
                if (data.error) {
                    setError(String(data.error));
                } else {
                    setError("");
                    setBloodReports(data.results);
                }
            });
        } else {
            if (!SelectedPatient) {
                setError("Please select a patient");
            } else {
                setError("Please select a week");
            }
        }
    }, [SelectedPatient, SelectedWeek]);

    return (
        <>
            <h1>View Reports By Patient</h1>

            <div className="row">
                {AllPatients && (
                    <>
                        <div className="col-md-4">
                            <select
                                id="inputPatient"
                                class="form-control"
                                placeholder="Enter Patient's name"
                                style={{ marginBottom: 10 }}
                                value={SelectedPatient}
                                required
                                onChange={(e) =>
                                    setSelectedPatient(e.target.value)
                                }
                            >
                                <option value="null">Select patient</option>
                                {AllPatients.map((r) => (
                                    <option key={r._id} value={r._id}>
                                        {r.firstname} {r.lastname} {r.phone}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input
                                className="form-control"
                                type="week"
                                name="week"
                                id="week"
                                onChange={(e) =>
                                    setSelectedWeek(e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
            </div>

            {!isEmpty(Error) ? (
                Error
            ) : isEmpty(SelectedPatient) ? (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "50vh" }}
                >
                    <h4 className="text-muted">
                        Please select a patient to view his/her reports
                    </h4>
                </div>
            ) : (
                <>
                    <h3>Blood Reports</h3>
                    {isEmpty(BloodReports) ? (
                        <>There are no blood reports for this week</>
                    ) : (
                        <>
                            {BloodReports.map((r) => (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "33% 33% 33% ",
                                    }}
                                >
                                    <span>
                                        Blood pressure: {r.bloodpressure}
                                    </span>
                                    <span>Glucose: {r.glucose}</span>
                                    <span>Hemoglobin: {r.hmg}</span>
                                </div>
                            ))}
                        </>
                    )}
                </>
            )}
        </>
    );
};