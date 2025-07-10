// src/components/Skills.jsx
import React from 'react';
import Section from './layout/Section';
import SkillsCinematic from './SkillsCinematic';

const Skills = () => {
    return (
        <Section
            id="skills"
            className="relative min-h-screen"
        >
            <SkillsCinematic />
        </Section>
    );
};

export default Skills;
