import React from 'react'

function SuccessPage() {
    return (
        <div className='max-w-desktop mx-auto flex justify-center items-center mb-8 flex-col '>
            <div className="main-container">
                <div className="check-container">
                    <div className="check-background">
                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="check-shadow"></div>
                </div>
            </div>
            <h1 className=' text-[40px] font-bold ' >Order Complete</h1>
            <p className='text-[24px] text-gray-400 ' >You Will Receive a confirmation email soon! </p>
        </div>
    )
}

export default SuccessPage