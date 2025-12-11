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
import { CreateCareerGoal, Goal, Milestone, Comment } from './CreateCareerGoal';
import { TableReviews } from './TableReview';

export function ProgressView({
  setPage,
}: {
  page: "home" | "progress";
  setPage: React.Dispatch<React.SetStateAction<"home" | "progress">>;
}) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Handles adding a new comment to the comments state
  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [...prev, comment]);
  };

  const handleAddMilestone = (milestone: Milestone) => {
    setMilestones((prev) => [...prev, milestone]);
  };

  const handleUpdateGoal = (updatedGoal: Goal, originalTitle: string) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.title === originalTitle ? { ...goal, ...updatedGoal } : goal))
    );
    // Also update milestones/comments that reference the goal title if it changed
    if (updatedGoal.title !== originalTitle) {
      setMilestones((prev) =>
        prev.map((milestone) =>
          milestone.goalTitle === originalTitle ? { ...milestone, goalTitle: updatedGoal.title } : milestone
        )
      );
      setComments((prev) =>
        prev.map((comment) =>
          comment.GoalTitle === originalTitle ? { ...comment, GoalTitle: updatedGoal.title } : comment
        )
      );
    }
  };

  const handleDeleteGoal = (title: string) => {
    setGoals((prev) => prev.filter((goal) => goal.title !== title));
    setMilestones((prev) => prev.filter((milestone) => milestone.goalTitle !== title));
    setComments((prev) => prev.filter((comment) => comment.GoalTitle !== title));
  };

  const handleUpdateMilestone = (updatedMilestone: Milestone, originalTitle: string) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.title === originalTitle && milestone.goalTitle === updatedMilestone.goalTitle
          ? { ...milestone, ...updatedMilestone }
          : milestone
      )
    );
  };

  const handleDeleteMilestone = (goalTitle: string, milestoneTitle: string) => {
    setMilestones((prev) =>
      prev.filter((milestone) => !(milestone.goalTitle === goalTitle && milestone.title === milestoneTitle))
    );
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

        <TableReviews 
          data={goals} 
          milestones={milestones} 
          comments={comments}
          handleAddComment={handleAddComment}
          onUpdateGoal={handleUpdateGoal}
          onDeleteGoal={handleDeleteGoal}
          onUpdateMilestone={handleUpdateMilestone}
          onDeleteMilestone={handleDeleteMilestone}
        />

        <Button onClick={() => {setPage("home")}}>
          Back to Dashboard
        </Button>
      </Stack>
    </div>
  );
}
