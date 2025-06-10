import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, Menu, User2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu toggle

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
   <div className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6">
        <div className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden sm:flex items-center gap-5 font-medium">
          {user?.role === 'recruiter' ? (
            <>
              <li><Link to="/admin/companies">Companies</Link></li>
              <li><Link to="/admin/jobs">Jobs</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/browse">Browse</Link></li>
            </>
          )}
        </ul>

        {/* Auth Buttons / Avatar */}
        <div className="hidden sm:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button></Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user.role === 'student' && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <ul className="flex flex-col gap-3 font-medium">
            {user?.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white w-full">Signup</Button></Link>
            </div>
          ) : (
            <div className="mt-3">
              <Button variant="link" className="w-full text-left" onClick={() => navigate('/profile')}>View Profile</Button>
              <Button variant="link" className="w-full text-left" onClick={logoutHandler}>Logout</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
