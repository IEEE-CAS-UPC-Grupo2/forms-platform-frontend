import React from 'react';
import Link from 'next/link';

const adminHeader: React.FC = () => {
    return (
        <header className="flex justify-center items-center h-25 bg-white">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPLlvQSrYUgXZ8hBhUhq-Pg1Z3HT1wGt8MzVjOnhIQ&s" 
            alt="Logo CAS" className="h-12 w-auto my-5"></img>
        </header>
    );
}

export default adminHeader;