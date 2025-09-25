
import React from 'react';
import { Card } from '../components/ui/Card';
import { BookOpenIcon } from '../constants';
import { useData } from '../hooks/useData';
import { Resource } from '../types';

export const ResourcesPage: React.FC = () => {
  const { resources } = useData();

  const groupedResources = resources.reduce((acc, resource) => {
    (acc[resource.category] = acc[resource.category] || []).push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <div className="container mx-auto px-4 pt-6">
        <div className="text-center mb-10">
            <BookOpenIcon className="w-12 h-12 mx-auto text-primary" />
            <h1 className="text-4xl font-bold mt-2 text-gray-900 dark:text-gray-100">Resources Hub</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Helpful articles, guides, and support lines.</p>
        </div>

        <div className="space-y-8">
            {/* Fix: Changed from Object.entries to Object.keys for better type inference */}
            {Object.keys(groupedResources).map((category) => (
                <section key={category}>
                    <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2 text-gray-900 dark:text-gray-100">{category}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groupedResources[category].map(resource => (
                            <Card key={resource.title} className="hover:shadow-lg transition-shadow">
                                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">{resource.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">{resource.description}</p>
                            </Card>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    </div>
  );
};