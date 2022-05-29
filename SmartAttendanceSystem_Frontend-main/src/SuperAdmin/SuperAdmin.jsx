import Table from '../utils/Table/Table';
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import './SuperAdmin.css';
import PersonCard from '../utils/PersonCard/PersonCard';
import Navbar from './Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import env from 'react-dotenv';

const newReqsHeaders = [
  'Organization Name',
  'Email',
  'No. of Employees',
  'Action',
];

const companyDetailsHeaders = [
  'Id',
  'Organization Name',
  'Admin Name',
  'No. of Employees',
];

const defaultSuperAdmin = {
  name: '',
  email: '',
  image:
    'https://www.google.com/url?sa=i&url=https%3A%2F%2Fenphamedbiotech.com%2Four-team%2F&psig=AOvVaw13HFLxYZx5i_MtjHwGV76L&ust=1651534943276000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPC9m5-9v_cCFQAAAAAdAAAAABAD',
  designation: '',
  empId: '',
};

const SuperAdmin = () => {
  const { state } = useLocation();
  const [superAdminDetails, setSuperAdminDetails] = useState(defaultSuperAdmin);
  const [newCompanyRequests, setNewCompanyRequests] = useState([]);
  const [companiesDetails, setCompaniesDetails] = useState([]);

  useEffect(() => {
    /**
     * Get Super Admin details
     */
    const getSuperAdminDetails = () => {
      axios
        .get(
          env.SERVER_ADDRESS + '/user/' + state.companyId + '/' + state.userId
        )
        .then((res) => {
          console.log(res);
          const data = res.data.data;
          data.image = env.SERVER_ROOT_ADDRESS + data.image;
          console.log(data.image);
          setSuperAdminDetails({
            name: data.name,
            email: data.email,
            image: data.image,
            designation: data.designation,
            userId: data.userId,
          });
        });
    };

    /**
     * Get Companies
     */
    const getCompanies = () => {
      axios.get(env.SERVER_ADDRESS + '/company').then((res) => {
        console.log(res);
        const data = res.data.data;

        let approvedCompanies = [];
        let unapprovedCompanies = [];

        data.forEach((entry) => {
          if (entry.isApproved) {
            const approvedCompany = {
              id: entry.companyId,
              name: entry.name,
              admin: entry.adminName,
              noOfEmployees: entry.noOfEmployees,
            };

            approvedCompanies.push(approvedCompany);
          } else {
            const unapprovedCompany = {
              name: entry.name,
              email: entry.email,
              noOfEmployees: entry.noOfEmployees,
              action: (
                <div>
                  <Button
                    onClick={() => {
                      approveOrDenyCompany(entry.companyId, entry.email, true);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => {
                      approveOrDenyCompany(entry.companyId, entry.email, false);
                    }}
                  >
                    Deny
                  </Button>
                </div>
              ),
            };

            unapprovedCompanies.push(unapprovedCompany);
          }
        });

        setNewCompanyRequests(unapprovedCompanies);
        setCompaniesDetails(approvedCompanies);
      });
    };

    getSuperAdminDetails();
    getCompanies();
  }, []);

  /**
   * Approve / Deny a company
   */

  const approveOrDenyCompany = (companyId, email, isApproved) => {
    const data = {
      companyId: companyId,
      email: email,
      approve: isApproved,
    };

    axios
      .post(env.SERVER_ADDRESS + '/superuser/approve', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className='super-admin-page-container'>
      <div className='navbar-container'>
        <Navbar />
      </div>
      <section className='top-section'>
        <div>
          <PersonCard data={superAdminDetails} />
        </div>
        <div className='new-request-container'>
          <Table headers={newReqsHeaders} rows={newCompanyRequests} />
        </div>
      </section>

      <section className='bottom-section'>
        <div className='client-info-container'>
          <Table headers={companyDetailsHeaders} rows={companiesDetails} />
        </div>
      </section>
    </div>
  );
};

export default SuperAdmin;
