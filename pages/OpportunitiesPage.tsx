import React from 'react';
import { mockOpportunities } from '../data/mockData';
import { Opportunity } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { BriefcaseIcon } from '../constants';

const OpportunityCard: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
    const typeColors = {
        Job: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Scholarship: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Event: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Gig: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    };
    return (
        <Card className="animate-slide-in-up">
            <div className="flex justify-between items-start">
                <div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeColors[opportunity.type]}`}>{opportunity.type}</span>
                    <h3 className="text-xl font-bold mt-2 text-gray-900 dark:text-gray-100">{opportunity.title}</h3>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>Posted by</span>
                    <Avatar src={opportunity.postedBy.avatar} alt={opportunity.postedBy.name} size="sm" />
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 my-4">{opportunity.description}</p>
            {opportunity.deadline && <p className="text-sm text-red-500 font-medium">Deadline: {opportunity.deadline}</p>}
            <div className="mt-4">
                <a href={opportunity.link} target="_blank" rel="noopener noreferrer">
                    <Button>Learn More</Button>
                </a>
            </div>
        </Card>
    );
};

export const OpportunitiesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 pt-6">
        <div className="text-center mb-8">
            <BriefcaseIcon className="w-12 h-12 mx-auto text-primary" />
            <h1 className="text-4xl font-bold mt-2 text-gray-900 dark:text-gray-100">Opportunities Board</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">Find your next step forward.</p>
        </div>

        <div className="space-y-6">
            {mockOpportunities.map(op => (
                <OpportunityCard key={op.id} opportunity={op} />
            ))}
        </div>
    </div>
  );
};
