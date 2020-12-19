import React from "react";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
    return (
        <>
            <div className="Post" ref={ref}>
                <h1>{props.patient}</h1>
                <p>{props.bloodpressure}</p>
                <p>{props.glucose}</p>
                <p>{props.hmg}</p>
            </div>
            <Pdf targetRef={ref} filename="post.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
        </>
    );
};

export default PDF;
