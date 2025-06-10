import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;

  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = allAppliedJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(allAppliedJobs.length / jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="overflow-x-auto px-2 sm:px-4">
      <Table>
        <TableCaption className="mb-5">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't applied to any job yet.
              </TableCell>
            </TableRow>
          ) : (
            currentJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {appliedJob?.createdAt?.split('T')[0] || 'N/A'}
                </TableCell>
                <TableCell>{appliedJob.job?.title || 'N/A'}</TableCell>
                <TableCell>{appliedJob.job?.company?.name || 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === 'rejected'
                        ? 'bg-red-400'
                        : appliedJob.status === 'pending'
                        ? 'bg-gray-400'
                        : 'bg-green-400'
                    }`}
                  >
                    {appliedJob.status?.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 flex-wrap gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md border text-sm ${
                currentPage === page
                  ? 'bg-[#6A38C2] text-white border-[#6A38C2]'
                  : 'bg-white text-black border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;
