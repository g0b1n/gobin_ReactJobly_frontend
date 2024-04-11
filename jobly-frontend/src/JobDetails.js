import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import JoblyApi from './api';
import './JobDetails.css';

function JobDetails() {

    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { handle } = useParams();
    const navigate = useNavigate();

    const fetchedJobs = async () => {
            try {
                const fetchedJobs = await JoblyApi.getJobs(searchTerm);
                setJobs(fetchedJobs);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            };
        };

    useEffect(() => {
      fetchedJobs();
    }, [searchTerm]);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      fetchedJobs();
    }

  return (
    <div className="job-details-container">
            <h1>Jobs</h1>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type='text' placeholder='Search Jobs...'
                    value={searchTerm} onChange={handleSearchChange}
                />
                <button type='submit'>Search</button>
            </form>
            {jobs.length > 0 ? (
                <ul>
                    {jobs.map((job) => (
                        <li key={job.id} className="job-item">
                            <div className="job-info">
                                <h2>{job.title}</h2>
                                <p>{job.companyName}</p>
                                <p>Salary: {job.salary}</p>
                                <p>Equity: {job.equity}</p>
                            </div>
                            <button className="apply-button" onClick={() => navigate(`/apply/${job.id}`)}>Apply</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Jobs Not Found. Please try again. :(</p>
            )}
        </div>
  )
}

export default JobDetails;
