import { FC } from 'react';
import Link from 'next/link';

import TopNavItem from '../TopNavItem';

const navItems = [
    {
        id: 1,
        text: 'Home',
        link: '/'
    },
    {
        id: 2,
        text: 'How To',
        link: '/how-to'
    },
    {
        id: 3,
        text: 'Discover',
        link: '/discover'
    },
    {
        id: 4,
        text: 'Create Project',
        link: '/create-project'
    }
]

const TopNav:FC = () => {
    return(
        <div className='flex items-center flex-row justify-end md:p-6 dark:bg-top-nav'>
            <Link href={'/'} className='mr-auto text-5xl font-title'>
                <div>NFT GENERATION</div>
            </Link>
            
            {
                navItems.map(item => {
                    return (
                        <TopNavItem
                            key={item.id}
                            text={item.text}
                            link={item.link}
                        />
                    )
                })
            }

            <Link
                className='p-3 dark:hover:bg-accent-black rounded-2xl'
                href={'/profile'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </Link>
        </div>
    )
}

export default TopNav;