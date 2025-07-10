// src/components/layout/Section.jsx
import React, { forwardRef } from 'react';

const Section = forwardRef(({
    children,
    id,
    className = '',
    background = 'default',
    padding = '', // default kosong agar bisa dikontrol langsung
    ...props
}, ref) => {
    const backgroundClasses = {
        default: '',
        glass: 'bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 backdrop-blur-sm',
        gradient: 'bg-gradient-to-br from-primary-900/20 to-accent-900/20'
    };

    return (
        <section
            ref={ref}
            id={id}
            className={`relative w-full ${padding} ${backgroundClasses[background]} ${className}`}
            {...props}
        >
            {children}
        </section>
    );
});

Section.displayName = "Section";

export default Section;
