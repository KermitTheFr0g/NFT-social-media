import { FC } from "react";

import HowItWorksCard from "../HowItWorksCard";

const HowItWorks: FC = () => {
    const steps = [
        {
            id: 1,
            step: 1,
            title: 'Set Configuration',
            description: 'lorem ipsum'
        },
        {
            id: 2,
            step: 2,
            title: 'Generate Contract',
            description: 'lorem ipsum'
        },
        {
            id: 3,
            step: 3,
            title: 'Launch Project',
            description: 'lorem ipsum'
        }
    ]

    return (
        <div>
            <div className="w-1/2 m-32H">
                <div className="text-5xl">How it Works</div>
                <p className="w-11/12 mt-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book.
                </p>
            </div>

            <div className="flex flex-row justify-center">
                {
                    steps.map((step) => {
                        return (
                            <HowItWorksCard
                                key={step.id}
                                step={step.step}
                                title={step.title}
                                description={step.description}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default HowItWorks;