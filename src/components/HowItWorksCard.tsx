import { FC } from 'react';

interface cardInterface {
    step: number;
    title: string;
    description: string;
}

const HowItWorksCard: FC<cardInterface> = (props) => {

    return (
        <div className='p-5 m-5 w-1/4 bg-top-nav rounded-xl'>
            <div className='text-2xl'>Step {props.step}</div>
            <div className='text-3xl'>{props.title}</div>
            <p className='text-xl'>
                {props.description}
            </p>
        </div>
    )
}

export default HowItWorksCard;