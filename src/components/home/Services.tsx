import React from 'react';

const cardList = [
    ["40+", "Topics"],
    ["400+", "Hands on Challenges"],
    ["10x", "Cheaper than traditional labs"],
    ["100x", "Faster lab deployments"],
];

const Services = () => {
    return (
        <div className="m-auto max-w-desktop p-commonPadding">
            <div className='w-full' >
                <div className="border-container m-12 rounded-3xl">
                    <div className="flex justify-around flex-col lg:flex-row py-6 rounded-3xl bg-background dark:bg-dark-background">
                        {cardList.map((item, index) => (
                            <div key={index} className="p-1">
                                <div className="flex flex-col items-center justify-around py-5 w-76 space-y-4">
                                    <h1 className="text-4xl font-normal">{item[0]}</h1>
                                    <p className=' text-center ' >{item[1]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
