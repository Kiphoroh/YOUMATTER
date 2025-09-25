
import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const CommunityChallenge: React.FC<{ onParticipateClick: () => void }> = ({ onParticipateClick }) => {
    return (
        <Card className="bg-gradient-to-br from-primary to-secondary text-white mb-6">
            <h3 className="text-xl font-bold mb-2">Weekly Challenge</h3>
            <p className="mb-4">Share one positive thought you had this week. Let's spread some good vibes!</p>
            <Button 
                variant="ghost" 
                className="bg-white/20 hover:bg-white/30 text-white"
                onClick={onParticipateClick}
            >
                Participate Now
            </Button>
        </Card>
    );
};