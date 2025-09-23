
import React, { useState } from 'react';
import { Mood } from '../../types';
import { Card } from '../ui/Card';

export const MoodCheckin: React.FC = () => {
    const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

    const handleMoodSelect = (mood: Mood) => {
        setSelectedMood(mood);
        // Here you would typically send this to an API
        console.log(`Mood checked in as: ${mood}`);
        setTimeout(() => setSelectedMood(null), 2000); // Reset after a delay
    }

    return (
        <Card className="mb-6">
            <h3 className="font-bold text-lg mb-3 text-center">How are you feeling today?</h3>
            {selectedMood ? (
                 <div className="text-center py-4">
                    <p className="text-4xl">{selectedMood}</p>
                    <p className="mt-2 text-green-600 font-semibold animate-fade-in">Thanks for sharing!</p>
                </div>
            ) : (
                <div className="flex justify-around items-center">
                    {Object.values(Mood).map(mood => (
                        <button 
                            key={mood} 
                            onClick={() => handleMoodSelect(mood)}
                            className="text-4xl transform hover:scale-125 transition-transform duration-200"
                            title={Object.keys(Mood)[Object.values(Mood).indexOf(mood)]}
                        >
                            {mood}
                        </button>
                    ))}
                </div>
            )}
        </Card>
    );
}
