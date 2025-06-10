import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    const lowerQuery = searchedQuery?.toLowerCase?.() || "";

    const filtered = allJobs.filter((job) => {
      return (
        job?.title?.toLowerCase().includes(lowerQuery) ||
        job?.description?.toLowerCase().includes(lowerQuery) ||
        job?.location?.toLowerCase().includes(lowerQuery)
      );
    });

    setFilterJobs(filtered);
    setCurrentPage(1);
  }, [allJobs, searchedQuery]);

  // Pagination calculations
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filterJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50"> 
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-2 sm:px-4 sticky top-0" >
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowMobileFilter((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white shadow-sm"
          >
            <Filter className="w-4 h-4 sticky top-0" />
            <span>Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterCard />
          </div>

          {/* Mobile Filter */}
          {showMobileFilter && (
            <div className="lg:hidden mb-4">
              <FilterCard />
            </div>
          )}

          {/* Jobs */}
          <div className="lg:col-span-9">
            {currentJobs.length === 0 ? (
              <span>Job not found</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {currentJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 space-x-2 flex-wrap mb-8">
                {Array.from({ length: totalPages }, (_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-md border text-sm mb-2 ${
                        currentPage === page
                          ? "bg-[#6A38C2] text-white border-[#6A38C2]"
                          : "bg-white text-black border-gray-300 hover:bg-gray-100"
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
      </div>
      
    </div>
    
  );
};

export default Jobs;
