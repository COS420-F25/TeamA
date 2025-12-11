import { Button, Checkbox, Group, List, Progress, Select, Stack, Table, Text, TextInput, Textarea } from '@mantine/core';
import { handleMilestoneClick, Comment, Goal, Milestone } from './CreateCareerGoal';
import React, { useState } from 'react';

interface TableReviewProps{
  data: Goal[];
  milestones?: Milestone[];
  comments?: Comment[];
  handleAddComment?: (comment: Comment) => void;
  onUpdateGoal?: (goal: Goal, originalTitle: string) => void;
  onDeleteGoal?: (title: string) => void;
  onUpdateMilestone?: (milestone: Milestone, originalTitle: string) => void;
  onDeleteMilestone?: (goalTitle: string, milestoneTitle: string) => void;
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

export function TableReviews({
  data,
  milestones = [],
  comments = [],
  handleAddComment,
  onUpdateGoal,
  onDeleteGoal,
  onUpdateMilestone,
  onDeleteMilestone,
}: TableReviewProps) {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [goalDraft, setGoalDraft] = useState<Goal | null>(null);
  const [editingMilestoneKey, setEditingMilestoneKey] = useState<string | null>(null);
  const [milestoneDraft, setMilestoneDraft] = useState<Milestone | null>(null);

  const completedGoals = data.filter((g) => g.completed).length;
  const overallProgress = data.length ? (completedGoals / data.length) * 100 : 0;

  const startEditGoal = (goal: Goal) => {
    setEditingGoal(goal.title);
    setGoalDraft({ ...goal, completed: goal.completed ?? false });
  };

  const cancelEditGoal = () => {
    setEditingGoal(null);
    setGoalDraft(null);
  };

  const saveGoal = (originalTitle: string) => {
    if (goalDraft && onUpdateGoal) {
      onUpdateGoal(goalDraft, originalTitle);
      cancelEditGoal();
    }
  };

  const startEditMilestone = (milestone: Milestone) => {
    const key = `${milestone.goalTitle}::${milestone.title}`;
    setEditingMilestoneKey(key);
    setMilestoneDraft(milestone);
  };

  const cancelEditMilestone = () => {
    setEditingMilestoneKey(null);
    setMilestoneDraft(null);
  };

  const saveMilestone = (originalTitle: string, goalTitle: string) => {
    if (milestoneDraft && onUpdateMilestone) {
      onUpdateMilestone(milestoneDraft, originalTitle);
      cancelEditMilestone();
    }
  };

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

    const isEditingGoal = editingGoal === row.title;
    return (
      <Table.Tr key={row.title}>
        <Table.Td>
          {isEditingGoal && goalDraft ? (
            <TextInput
              value={goalDraft.title}
              onChange={(event) => { setGoalDraft({ ...goalDraft, title: event.currentTarget.value }); }}
            />
          ) : (
            <Text fw={500}>{row.title}</Text>
          )}
        </Table.Td>
        <Table.Td>
          {isEditingGoal && goalDraft ? (
            <Select
              data={["Job Application", "Skill Development", "Etc"]}
              value={goalDraft.category}
              onChange={(value) => {
                if (value) {
                  setGoalDraft({ ...goalDraft, category: value as Goal["category"] });
                }
              }}
            />
          ) : (
            <Text>{row.category}</Text>
          )}
        </Table.Td>
        <Table.Td>
          {isEditingGoal && goalDraft ? (
            <Textarea
              value={goalDraft.description}
              onChange={(event) => { setGoalDraft({ ...goalDraft, description: event.currentTarget.value }); }}
            />
          ) : (
            <Text>{row.description}</Text>
          )}
        </Table.Td>
        <Table.Td>
          {isEditingGoal && goalDraft ? (
            <Checkbox
              label="Completed"
              checked={!!goalDraft.completed}
              onChange={(event) => { setGoalDraft({ ...goalDraft, completed: event.currentTarget.checked }); }}
            />
          ) : (
            <Text>{row.completed ? "Completed" : "In progress"}</Text>
          )}
        </Table.Td>

        <Table.Td>
          {goalMilestones.length > 0 ? (
            <List size="sm">
              {goalMilestones.map((milestone) => (
                <List.Item  key={milestone.title}>
                  {editingMilestoneKey === `${milestone.goalTitle}::${milestone.title}` && milestoneDraft ? (
                    <Stack gap="xs">
                      <TextInput
                        label="Title"
                        value={milestoneDraft.title}
                        onChange={(event) => { setMilestoneDraft({ ...milestoneDraft, title: event.currentTarget.value }); }}
                      />
                      <Textarea
                        label="Description"
                        value={milestoneDraft.description}
                        onChange={(event) => { setMilestoneDraft({ ...milestoneDraft, description: event.currentTarget.value }); }}
                      />
                      <Checkbox
                        label="Completed"
                        checked={milestoneDraft.completed}
                        onChange={(event) => { setMilestoneDraft({ ...milestoneDraft, completed: event.currentTarget.checked }); }}
                      />
                      <Group gap="xs">
                        <Button size="xs" variant="light" onClick={() => { saveMilestone(milestone.title, milestone.goalTitle); }}>
                          Save
                        </Button>
                        <Button size="xs" variant="default" onClick={cancelEditMilestone}>
                          Cancel
                        </Button>
                      </Group>
                    </Stack>
                  ) : (
                    <Stack gap={4}>
                      {handleMilestoneClick(milestone)}
                      <Group gap="xs">
                        <Button size="xs" variant="subtle" onClick={() => { startEditMilestone(milestone); }}>
                          Edit
                        </Button>
                        <Button size="xs" color="red" variant="subtle" onClick={() => onDeleteMilestone?.(milestone.goalTitle, milestone.title)}>
                          Delete
                        </Button>
                      </Group>
                    </Stack>
                  )}
                </List.Item>
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
        <Table.Td>
          {isEditingGoal && goalDraft ? (
            <Group gap="xs">
              <Button size="xs" variant="light" onClick={() => { saveGoal(row.title); }}>
                Save
              </Button>
              <Button size="xs" variant="default" onClick={cancelEditGoal}>
                Cancel
              </Button>
            </Group>
          ) : (
            <Group gap="xs">
              <Button size="xs" variant="subtle" onClick={() => {startEditGoal(row)}}>
                Edit
              </Button>
              <Button size="xs" color="red" variant="subtle" onClick={() => onDeleteGoal?.(row.title)}>
                Delete
              </Button>
            </Group>
          )}
        </Table.Td>
        <Table.Td>
          <Text fz="sm" fw={500}>
            {overallProgress.toFixed(0)}%
          </Text>
          <Progress value={overallProgress} size="sm" mt="xs" />
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
            <Table.Th>Status</Table.Th>
            <Table.Th>Milestones</Table.Th>
            <Table.Th>Milestone Progress</Table.Th>
             <Table.Th>Comments</Table.Th>
             <Table.Th>Actions</Table.Th>
             <Table.Th>Overall Progress</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}