import React from 'react';
import {Card, CardDeck, Button} from 'react-bootstrap';
import Signin from '../patient/Signin'
import HospitalImage from '../images/hospital.jpg'
import DoctorImage from '../images/doctor.jpg'
import PatientImage from '../images/patient.jpg'
import Bg from '../images/bghome.png'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div style={{
    backgroundImage: `url(${Bg})`,
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%'}}>
    <text>h</text>
    <CardDeck style={{marginTop: 260, marginLeft: 10, width: "93rem"}}>
    <Card style={{ background: "black", color: "white"}}>
      <Card.Img variant="top" src={HospitalImage} />
      <Card.Body>
        <Card.Title>Hospital's Portal</Card.Title>
        <Card.Text>
          Hello hospital's admin. Register yourself with our software, or login using the given credentials.
        </Card.Text>
        <Link to={'/hospital/signin'} class="btn btn-raised btn-primary ">Hospital's Portal</Link>
      </Card.Body>
    </Card>
    <Card style={{ background: "black", color: "white"}}>
      <Card.Img variant="top" src={DoctorImage} />
      <Card.Body>
        <Card.Title>Doctor's Portal</Card.Title>
        <Card.Text>
          Hello Doctor. Sign in to your account to interact with your fellow doctors and your patients.{' '}
        </Card.Text>
        <Link to={'/doctor/signin'} class="btn btn-raised btn-primary ">Doctor's Portal</Link>
      </Card.Body>
    </Card>
    <Card style={{ background: "black", color: "white"}}>
      <Card.Img variant="top" src={PatientImage} />
      <Card.Body>
        <Card.Title>Patient's Portal</Card.Title>
        <Card.Text>
         Hello Patients. Signin to your accounts through here to interact with your doctors. 
        </Card.Text>
        <Link to={'/patient'} class="btn btn-raised btn-primary ">Patient's Portal</Link>
      </Card.Body>
    </Card>
  </CardDeck>
  </div>
  );
}

export default Home;
