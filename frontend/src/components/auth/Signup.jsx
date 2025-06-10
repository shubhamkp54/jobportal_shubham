import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 mt-10">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-gray-200 rounded-lg p-6 sm:p-8 shadow-md bg-white"
        >
          <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">Sign Up</h1>

          <div className="space-y-5">
            <div>
              <Label htmlFor="fullname" className="text-gray-700">Full Name</Label>
              <Input
                id="fullname"
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Shubham"
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="shubham@example.com"
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" className="text-gray-700">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="9876543210"
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <Label className="text-gray-700">Role</Label>
                <RadioGroup className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      id="student"
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === 'student'}
                      onChange={changeEventHandler}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="student" className="text-gray-700">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="recruiter"
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === 'recruiter'}
                      onChange={changeEventHandler}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="recruiter" className="text-gray-700">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="profile" className="text-gray-700">Profile Picture</Label>
                <div className="mt-1 relative">
                  <Input
                    id="profile"
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="hidden" // Hide default file input
                  />
                  <label
                    htmlFor="profile"
                    className="flex items-center justify-center w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-md border border-blue-300 cursor-pointer hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <span className="text-sm font-medium">
                      {input.file ? input.file.name : 'Choose File'}
                    </span>
                  </label>
                  {input.file && (
                    <p className="mt-1 text-sm text-gray-600 truncate">
                      Selected: {input.file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {loading ? (
              <Button
                disabled
                className="w-full mt-6 bg-blue-600 text-white rounded-md py-2 flex items-center justify-center"
              >
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2"
              >
                Signup
              </Button>
            )}

            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;