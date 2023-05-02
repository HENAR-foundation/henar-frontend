import React from 'react';

const FeedbacksBlock = () => {
    return (
        <div className='flex bg-white rounded-s p-6'>
            <div className="flex flex-col font-bodyLight">
                <span className='text-a-m'>Откликнулись 3 человека</span>
                <span className='text-tetriary text-a-ss'>Просмотрело 100 человек</span>
            </div>
        </div>
    );
};

export default FeedbacksBlock;