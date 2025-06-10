import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/src/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 sm:p-6 md:p-8'>
                <div className='flex flex-col md:flex-row justify-between gap-4'>
                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div className='text-center sm:text-left'>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <div className='self-center md:self-start'>
                        <Button onClick={() => setOpen(true)} variant="outline">
                            <Pen className='w-4 h-4 mr-1' />
                            Edit
                        </Button>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-sm text-gray-700'>
                        <Mail className='w-4 h-4' />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-sm text-gray-700'>
                        <Contact className='w-4 h-4' />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='font-semibold mb-2'>Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills.length > 0
                                ? user.profile.skills.map((item, index) => (
                                    <Badge key={index}>{item}</Badge>
                                ))
                                : <span className='text-gray-500'>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-start gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume
                            ? <a
                                target='_blank'
                                rel="noopener noreferrer"
                                href={user?.profile?.resume}
                                className='text-blue-600 hover:underline break-all'
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                            : <span className='text-gray-500'>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl px-4 sm:px-6 md:px-8 pb-8'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
