import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the company.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500 mt-1">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <div className="w-full">
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
