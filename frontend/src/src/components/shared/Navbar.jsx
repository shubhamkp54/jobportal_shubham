import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-pink shadow-md">
        <nav className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
          {/* Logo */}
          <div>
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" className="hover:text-gray-700">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="hover:text-gray-700">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-gray-700">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-gray-700">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="hover:text-gray-700">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Login/Signup desktop buttons */}
            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div>
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                      {user && user.role === 'student' && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 />
                          <Button variant="link">
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                      )}
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Mobile menu toggle button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md border-t border-gray-200 z-50">
            <ul className="flex flex-col gap-4 p-4">
              {user && user.role === 'recruiter' ? (
                <>
                  <li>
                    <Link
                      to="/admin/companies"
                      className="block hover:text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Companies
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/jobs"
                      className="block hover:text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/"
                      className="block hover:text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="block hover:text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/browse"
                      className="block hover:text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Browse
                    </Link>
                  </li>
                </>
              )}

              {!user ? (
                <>
                  <li>
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {user && user.role === 'student' && (
                    <li>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <User2 />
                        View Profile
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                      <LogOut />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Push content down so it's not behind fixed navbar */}
      <main className="pt-16">
        <div className="h-screen bg-gray-100">
          <h1>Page Content</h1>
        </div>
      </main>
    </>
  );
};

export default Navbar;
