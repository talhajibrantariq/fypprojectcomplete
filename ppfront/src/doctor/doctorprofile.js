import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index';
import DefaultProfile from '../images/avatar.png';
import DeleteDoctor from './DeleteDoctor';
import { getdoctor } from './doctorapi';

class DoctorProfile extends Component {
  constructor() {
    console.log('In DoctorProfile constructor');
    super();
    this.state = {
      doctor: '',
      redirect: false,
    };
  }

  init = (doctorId) => {
    const token = isAuthenticated().token;

    getdoctor(doctorId, token).then((data) => {
      console.log('Doctor ID');
      console.log(doctorId);
      console.log(data);
      console.log('getdoctor response');
      if (data.error) {
        console.log('getdoctor response error');
        this.setState({
          redirect: true,
        });
      } else {
        this.setState({
          doctor: data,
        });
      }
    });
  };

  componentDidMount() {
    var doctorId = this.props.match.params.doctorId;
    doctorId = doctorId ? doctorId : localStorage.getItem('doctor_id');
    this.init(doctorId);
  }

  componentWillReceiveProps(props) {
    var doctorId = props.match.params.doctorId;
    doctorId = doctorId ? doctorId : localStorage.getItem('doctor_id');
    this.init(doctorId);
  }
  render() {
    const { redirect, doctor } = this.state;
    if (redirect) return <Redirect to='/doctor/signin' />;
    const photoUrl = this.state.doctor._id
      ? `http://localhost:8080/doctor/photo/${this.state.doctor._id}`
      : DefaultProfile;
    return (
      <div>
        <div className='d-flex justify-content-center'>
          <div class='my-3 col-md-4 text-center'>
            <div className='p-3 border rounded-lg shadow'>
              <img
                style={{ height: '200px', width: '200px', border: 2 }}
                className='img-thumbnail'
                src={photoUrl}
                onError={(i) => (i.target.src = `${DefaultProfile}`)}
                alt={doctor.firstname}
              />
              <div class='card-body'>
                <h5 class='card-title'>
                  {doctor.firstname} {doctor.lastname}
                </h5>
                <p class='card-text'>{doctor.email}.</p>
                <p class='card-text'>{doctor.designation}.</p>

                <p class='card-text'>{`Joined ${new Date(
                  this.state.doctor.created
                ).toDateString()}`}</p>

                {localStorage.getItem('doctor_id') === doctor._id && (
                  <>
                    <Link
                      to={`/doctor/edit/${doctor._id}`}
                      class='btn btn-raised btn-primary '
                    >
                      Edit Profile
                    </Link>
                    <DeleteDoctor doctorId={doctor._id} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoctorProfile;
