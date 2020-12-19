import React from "react";
import Pdf from "react-to-pdf";
// import { getdoctorsnames, getpatientsnames } from "./reportapi";

const ref = React.createRef();

const PDF = (props) => {
    return (
        <>
            <div className="bloodreport" ref={ref}>
                <h1>Patient name: {props.patientname}</h1>
                <h4> Bloodpressure:{props.bloodpressure}</h4>
                <h4>Glucose: {props.glucose}</h4>
                <h4>Heamoglobin:{props.hmg}</h4>
            </div>
            <div className="reportpdf">
                <Pdf targetRef={ref} filename="bloodreport.pdf">
                    {({ toPdf }) => (
                        <button id="btn" onClick={toPdf}>
                            Capture as PDF
                        </button>
                    )}
                </Pdf>
            </div>
        </>
    );
};

export default PDF;
