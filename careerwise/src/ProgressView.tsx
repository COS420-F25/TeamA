/**
 * ProgressView Component
 * 
 * This component was refactored from App.tsx to improve code organization and separation of concerns.
 * It manages the progress tracking view where users can:
 * - Create new career goals using the CreateCareerGoal component
 * - View all their career goals in a table format via TableReviews
 * - Navigate back to the home dashboard
 * 
 * The component maintains its own local state for the list of goals and handles adding new goals
 * through the onAdd callback prop passed to CreateCareerGoal.
 * 
 * Props:
 * - page: Current page state ("home" | "progress")
 * - setPage: Function to update the page state for navigation
 */

import React, { useState } from 'react';
import { Stack, Text, Button } from '@mantine/core';
import { CreateCareerGoal, Goal, Milestone } from './components/CreateCareerGoal';
import { TableReviews } from './components/TableReview';

export function ProgressView({
  page,
  setPage,
}: {
  page: "home" | "progress";
  setPage: React.Dispatch<React.SetStateAction<"home" | "progress">>;
}) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  const handleAddMilestone = (milestone: Milestone) => {
    setMilestones((prev) => [...prev, milestone]);
  };

  return (
    <div>
      <Stack gap="md">
        <Text>Progress Tracker</Text>

        <CreateCareerGoal
          onAdd={(goal) => {setGoals((prev) => [...prev, goal])}}
          onAddMilestone={handleAddMilestone}
          existingGoals={goals}
        />

        <TableReviews data={goals} milestones={milestones} />

        <Button onClick={() => {setPage("home")}}>
          Back to Dashboard
        </Button>
      </Stack>
    </div>
  );
}
