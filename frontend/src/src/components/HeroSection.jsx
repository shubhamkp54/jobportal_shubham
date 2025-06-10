import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col gap-5 my-10 max-w-4xl mx-auto'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base'>
                    No. 1 Job Hunt 
                </span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-sm sm:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </p>
                <div className='flex w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-sm sm:text-base py-2 rounded-l-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] p-3 sm:p-2">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
