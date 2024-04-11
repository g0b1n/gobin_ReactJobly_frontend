import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from './api';
import './Details.css';

function CompanyDetails({name}) {

    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchedCompanies = async () => {
            try {
                const fetchedCompanies = await JoblyApi.getCompanies(searchTerm);
                // console.log("Fetched companies:", fetchedCompanies);
                if (Array.isArray(fetchedCompanies)) {
                    setCompanies(fetchedCompanies);
                } else {
                    console.error("Expected fetchedCompanies to be an array but got:", typeof fetchedCompanies);
                }
                
            } catch (error) {
                console.error("Failed to fetch comoanies:", error);
            };
        };

    useEffect(() => {
        fetchedCompanies();
    }, [searchTerm])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchedCompanies();
        // console.log(`searched: ${searchTerm}`);
    }

    // if (!companies || companies.length === 0) {
    //     return (
    //     <div>Companies Not Found :(</div>
    // )}

  return (
    <div className="company-details-container">
            <h1>Companies</h1>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type='text' placeholder='Search Companies...'
                    value={searchTerm} onChange={handleSearchChange}
                />
                <button type='submit'>Search</button>
            </form>
            {companies.length > 0 ? (
                <ul>
                    {companies.map((company) => (
                        <li key={company.handle} className="company-item">
                            <Link to={`/company/${company.handle}`}>{company.name}</Link>
                            <p>{company.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Companies Not Found. Please try again. :(</p>
            )}
        </div>
  )
}

export default CompanyDetails;
