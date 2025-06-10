import React, { useState } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalJobs = allJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='max-w-7xl mx-auto my-20 px-4 sm:px-6 md:px-8'>
      <h1 className='text-3xl sm:text-4xl font-bold text-center sm:text-left'>
        <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
        {
          currentJobs.length <= 0
            ? <span>No Job Available</span>
            : currentJobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        }
      </div>

      {/* Pagination */}
      {
        totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {
              Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md border 
                      ${currentPage === page
                        ? 'bg-[#6A38C2] text-white border-[#6A38C2]'
                        : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                );
              })
            }
          </div>
        )
      }
    </div>
  );
};

export default LatestJobs;
