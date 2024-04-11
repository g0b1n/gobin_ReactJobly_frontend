import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoblyApi from './api';
import './Details.css';

function Company() {

    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const companyData = await JoblyApi.getCompany(handle);
                setCompany(companyData);
            } catch (error) {
                console.error("Failed to fetch company details:", error);
            }
        };
        fetchCompany();
    }, [handle]);


    if (!company) return <div>Loading...</div>;

  return (
    <div className="company-container">
            <h1>{company.name}</h1>
            <h3>{company.description}</h3>
            <h2>Open Positions</h2>
            <ul>
                {company.jobs && company.jobs.map(job => (
                    <li key={job.id} className="job-item">
                        <div className="job-info">
                            <h3>{job.title}</h3>
                            <p>Salary: {job.salary}</p>
                            <p>Equity: {job.equity}</p>
                        </div>
                        <button onClick={() => navigate(`/apply/${job.id}`)}>Apply</button>
                    </li>
                ))}
            </ul>
        </div>
  )
}

export default Company;
