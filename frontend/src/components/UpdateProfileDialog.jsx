import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.map(skill => skill).join(', ') || '',
    file: user?.profile?.resume || ''
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('bio', input.bio);
    formData.append('skills', input.skills);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }

    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="w-[90%] max-w-lg"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-2 py-2">
            {[
              { label: 'Name', id: 'fullname', type: 'text' },
              { label: 'Email', id: 'email', type: 'email' },
              { label: 'Number', id: 'phoneNumber', type: 'text' },
              { label: 'Bio', id: 'bio', type: 'text' },
              { label: 'Skills (comma separated)', id: 'skills', type: 'text' }
            ].map((field) => (
              <div key={field.id} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                <Label htmlFor={field.id} className="sm:text-right">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={input[field.id]}
                  onChange={changeEventHandler}
                  className="sm:col-span-3"
                />
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="file" className="sm:text-right">Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="sm:col-span-3"
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            {loading ? (
              <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
