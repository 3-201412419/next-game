import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant? : 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyle = 'px-4 py-2 rounded font-bold';
    const variantStyle = variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-grey-200 text-grey-800 hover:bg-grey-300';

    return (
        <button className = {`${baseStyle} ${variantStyle} ${className}`} {...props} >{children}</button>
    )
}