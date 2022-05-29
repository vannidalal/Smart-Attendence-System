import React, { useState, useEffect } from 'react';
import './Employee.css';
import NavBar from './Navbar/Navbar';
import PersonCard from '../utils/PersonCard/PersonCard';
import Table from '../utils/Table/Table';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';

const headers = ['S.no.', 'Log Type', 'Timestamp', 'Location'];

const defaultEmployee = {
  name: '',
  email: '',
  image:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fenphamedbiotech.com%2Four-team%2F&psig=AOvVaw13HFLxYZx5i_MtjHwGV76L&ust=1651534943276000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPC9m5-9v_cCFQAAAAAdAAAAABAD',
  designation: '',
  empId: '',
};

const Employee = () => {
  const { state } = useLocation();
  const [employeeDetails, setEmployeeDetails] = useState(defaultEmployee);
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  useEffect(() => {
    /**
     * Get Employee Details
     */
    const getEmployeeData = () => {
      axios
        .get(
          env.SERVER_ADDRESS + '/user/' + state.companyId + '/' + state.userId
        )
        .then((res) => {
          console.log(res);
          const data = res.data.data;
          data.image = env.SERVER_ROOT_ADDRESS + data.image;
          console.log(data.image);
          setEmployeeDetails({
            name: data.name,
            email: data.email,
            image: data.image,
            designation: data.designation,
            userId: data.userId,
          });
        });
    };

    /**
     * Get Employee Attendance Details
     */
    const getAttendanceLogs = () => {
      axios
        .get(
          env.SERVER_ADDRESS + '/log/' + state.companyId + '/' + state.userId
        )
        .then((res) => {
          console.log(res);
          const data = res.data.data;

          let attendanceLogsArray = [];

          data.forEach((entry, index) => {
            const attendanceLog = {
              sno: index + 1,
              type: entry.type,
              timestamp: entry.datetime,
              location: entry.location,
            };

            attendanceLogsArray.push(attendanceLog);
          });

          setAttendanceLogs(attendanceLogsArray);
        });
    };

    getEmployeeData();
    getAttendanceLogs();
  }, []);

  return (
    <div className='employee-page-container'>
      <div className='navbar-container'>
        <NavBar />
        <section className='top-section'>
          <div>
            <PersonCard data={employeeDetails} />
          </div>
          <div className='new-request-container'>
            <Table headers={headers} rows={attendanceLogs} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Employee;
