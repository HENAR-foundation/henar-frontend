import React, { ButtonHTMLAttributes, FC, useEffect, useState } from 'react';

const Tabs: FC<{
    options: {
        label: string;
        value: string;
    }[];
    current: string;
    className?: string;
    onTabChange: (value: string) => void;
}> = ({
    options,
    current,
    className,
    onTabChange,
    ...rest
}) => {
        const [tab, updateTab] = useState(current || "")

        function handleTabChange(tab: string) {
            updateTab(tab)
        }

        useEffect(() => {
            onTabChange(tab)
        }, [tab])

        useEffect(() => {
            if (current !== tab) {
                updateTab(current)
            }
        }, [current])

        return (
            <div
                {...rest}
                className={
                    className +
                    ' flex flex-row justify-start'
                }
            >
                {
                    options.map((option, index) => (
                        <div className={`mr-10 py-2 cursor-pointer  border-accent1 ${option.value === tab && 'border-b-2'}`} onClick={() => handleTabChange(option.value)} key={index}>
                            <span className={option.value === tab ? 'text-accent1' : 'text-legacyGraphit'}>{option.label}</span>
                        </div>
                    ))
                }
            </div>
        );
    };

export default Tabs;
