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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed');
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
          <h1 className="font-bold text-2xl mb-6 text-center text-gray-800">Login</h1>

          <div className="space-y-5">
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
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
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
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <Label htmlFor="recruiter" className="text-gray-700">Recruiter</Label>
                </div>
              </RadioGroup>
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
                Login
              </Button>
            )}

            <p className="text-sm text-center text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;