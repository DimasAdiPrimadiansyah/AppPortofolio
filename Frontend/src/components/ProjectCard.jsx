import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="border rounded-lg p-4 shadow-lg bg-white">
            <h2 className="text-xl font-bold text-indigo-600">{project.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{project.category} • {project.year}</p>
            <p className="mb-3">{project.description}</p>

            {project.photos && project.photos.length > 0 && (
                <img src={project.photos[0]} alt={project.title} className="rounded w-full mb-3" />
            )}

            <div className="text-sm text-gray-600">
                <strong>Tech:</strong> {project.technologies?.join(', ')}
            </div>

            {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">Lihat GitHub</a>
            )}
        </div>
    );
};

export default ProjectCard;
