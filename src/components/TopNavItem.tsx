import { FC } from 'react';
import Link from 'next/link';

interface itemProps {
    text: string;
    link: string;
}

const TopNavItem:FC<itemProps> = (props) => {
    return(
        <Link 
            href={props.link}
            className={'p-3'}
        >
            <div className='text-xl'>
                {props.text}
            </div>
        </Link>
    )
}

export default TopNavItem;