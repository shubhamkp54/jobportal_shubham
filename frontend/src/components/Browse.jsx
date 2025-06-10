import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, []);

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 my-10">
        <h1 className="font-bold text-xl mb-6">
          Search Results ({allJobs.length})
        </h1>

        {currentJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md border text-sm mb-2 ${
                    currentPage === page
                      ? 'bg-[#6A38C2] text-white border-[#6A38C2]'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
