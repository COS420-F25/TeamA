import { Anchor, Group, List, Progress, Table, Text, TextInput } from '@mantine/core';
import classes from './TableReviews.module.css';
import { CreateCareerGoal, handleMilestoneClick, Comment, Goal, Milestone } from './CreateCareerGoal';
import React, { useState } from 'react';

interface TableReviewProps{
  data: Goal[];
  milestones?: Milestone[];
  comments?: Comment[];
  handleAddComment?: (comment: Comment) => void;
}

function CommentInput({ 
  goalTitle, 
  onAddComment 
}: { 
  goalTitle: string; 
  onAddComment?: (comment: Comment) => void;
}) {
  const [commentText, setCommentText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim() && onAddComment) {
      onAddComment({
        text: commentText,
        GoalTitle: goalTitle
      });
      setCommentText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        value={commentText}
        onChange={(event) => {setCommentText(event.currentTarget.value)}}
        placeholder="Add a comment..."
        size="sm"
      />
    </form>
  );
}

export function TableReviews({data, milestones = [], comments = [], handleAddComment}: TableReviewProps) {
  const rows = data.map((row) => {
    // Filter milestones for this specific goal
    const goalMilestones = milestones.filter(m => m.goalTitle === row.title);
    
    // Calculate milestone progress (percentage of completed milestones)
    const completedCount = goalMilestones.filter(m => m.completed).length;
    const milestoneProgress = goalMilestones.length > 0 
      ? (completedCount / goalMilestones.length) * 100 
      : 0;

    // Get comments for this specific goal
    const goalComments = comments.filter(c => c.GoalTitle === row.title);

    return (
      <Table.Tr key={row.title}>
        <Table.Td>{row.title}</Table.Td>
        <Table.Td>{row.category}</Table.Td>
        <Table.Td>{row.description}</Table.Td>

        <Table.Td>
          {goalMilestones.length > 0 ? (
            <List size="sm">
              {goalMilestones.map((milestone) => (
                <List.Item  key={milestone.title}>{handleMilestoneClick(milestone)} </List.Item>
              ))}
            </List>
          ) : (
            <Text fz="xs" c="dimmed">No milestones</Text>
          )}
        </Table.Td>
        
        <Table.Td>
          <Text fz="sm" fw={500}>
            {milestoneProgress.toFixed(0)}%
          </Text>
          <Progress value={milestoneProgress} size="sm" mt="xs" />
        </Table.Td>
        

        {/* <Table.Td>
          <Text fz="sm" fw={500}>
            {row.goalpercentage}%
          </Text>
          <Progress value={row.goalpercentage} size="sm" mt="xs" />
        </Table.Td> */}

        <Table.Td>
          <CommentInput 
            goalTitle={row.title} 
            onAddComment={handleAddComment}
          />
          {goalComments.length > 0 && (
            <List size="sm" mt="xs">
              {goalComments.map((comment, idx) => (
                <List.Item key={idx}>{comment.text}</List.Item>
              ))}
            </List>
          )}
        </Table.Td>

      </Table.Tr>
    );
  });

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Career Goal</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Milestones</Table.Th>
            <Table.Th>Milestone Progress</Table.Th>
             <Table.Th>Overall Progress</Table.Th>
             <Table.Th>Comments</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}