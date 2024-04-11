import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoblyApi from './api';
import './ApplyJobs.css';

function ApplyJob() {

    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const jobData = await JoblyApi.getJobDetails(jobId);
                setJob(jobData);
            } catch (error) {
                console.error(`Failed to fetch job details:`, error);
            }
        }
        fetchJob();
    }, [jobId])

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Application Submitted!`)
        navigate(-1);
    };

    if (!job) return <div>Loading job details...</div>

  return (
    <div className='apply-job-container'>
            <h1>Apply for Job: {job.title}</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input type='text' name='name' required />
                </label>
                <label>Email:
                    <input type='email' name='email' required />
                </label>
                <label>Resume (URL):
                    <input type='text' name='resume' required />
                </label>
                <button type='submit'>Submit Application</button>
            </form>
        </div>
  )
}

export default ApplyJob;
