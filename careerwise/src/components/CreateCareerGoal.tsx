import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Textarea, Select, TextInput, Stack, Group, Text, Checkbox } from '@mantine/core';
import React, { useState } from 'react';

export type Goal = {
  title: string;
  category: "Job Application" | "Skill Development" | "Etc";
  description: string;
  completed?: boolean;
};

export type Milestone = {
  title: string;
  description: string;
  goalTitle: string;
  completed: boolean;
};

export type Comment = {
  text: string;
  GoalTitle: string;
}

export const handleMilestoneClick = (milestone: Milestone): React.JSX.Element => {
  return (
    <div>
      <Text><Text span fw={700}>Milestone Name:</Text> {milestone.title}</Text>
      <Text><Text span fw={700}>Milestone Description:</Text> {milestone.description}</Text>
      <Text><Text span fw={700}>Milestone Completed:</Text> {milestone.completed ? "Yes" : "No"}</Text>
    </div>
  );
};

export function CreateCareerGoal(
  {
    onAdd,
    onAddMilestone,
    existingGoals = [],
  }: {
    onAdd: (goal: Goal) => void;
    onAddMilestone?: (milestone: Milestone) => void;
    existingGoals?: Goal[];
  }
) {
  const [goalModalOpened, { open: openGoalModal, close: closeGoalModal }] = useDisclosure(false);
  const [milestoneModalOpened, { open: openMilestoneModal, close: closeMilestoneModal }] = useDisclosure(false);
  
  // Goal form state
  const [goalName, setGoalName] = useState<string>("");
  const [goalCategory, setGoalCategory] = useState<"Job Application" |"Skill Development" |"Etc">("Etc");
  const [goalDescription, setGoalDescription] = useState<string>("");
  const [goalCompleted, setGoalCompleted] = useState<boolean>(false);
  
  // Milestone form state
  const [milestoneName, setMilestoneName] = useState<string>("");
  const [milestoneDescription, setMilestoneDescription] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string>("");

  const handleGoalSubmit = () => {
    onAdd({
      title: goalName,
      category: goalCategory,
      description: goalDescription,
      completed: goalCompleted,
    });
    // Reset form
    setGoalName("");
    setGoalCategory("Etc");
    setGoalDescription("");
    setGoalCompleted(false);
    closeGoalModal();
  };

  const handleMilestoneSubmit = () => {
    if (onAddMilestone && selectedGoal) {
      onAddMilestone({
        title: milestoneName,
        description: milestoneDescription,
        goalTitle: selectedGoal,
        completed: false
      });
      // Reset form
      setMilestoneName("");
      setMilestoneDescription("");
      setSelectedGoal("");
      closeMilestoneModal();
    }
  };

  const handleCreateMilestoneClick = () => {
    closeGoalModal();
    // Small delay to ensure smooth transition
    setTimeout(() => {
      openMilestoneModal();
    }, 100);
  };

  return (
    <>
      {/* Goal Creation Modal */}
      <Modal opened={goalModalOpened} onClose={closeGoalModal} title="New Career Goal">
        <Stack gap="md">
          <TextInput
            label="Goal Name"
            placeholder="Add Name"
            value={goalName}
            onChange={(event) => {setGoalName(event.currentTarget.value)}}
          />

          <Select
            comboboxProps={{ withinPortal: true }}
            data={["Job Application", "Skill Development", "Etc"]}
            placeholder="Pick one"
            label="Category"
            value={goalCategory}
            onChange={(value) => {
                if (value) setGoalCategory(value as "Job Application" | "Skill Development" | "Etc");
            }}
          />

          <Textarea 
            label="Description" 
            placeholder="Add Description" 
            value={goalDescription}
            onChange={(event) => {setGoalDescription(event.currentTarget.value)}}
          />

          <Checkbox
            label="Mark goal as completed"
            checked={goalCompleted}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setGoalCompleted(event.currentTarget.checked); }}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleGoalSubmit}>
              Add Career Goal
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Milestone Creation Modal */}
      <Modal opened={milestoneModalOpened} onClose={closeMilestoneModal} title="New Milestone">
        <Stack gap="md">
          <Select
            comboboxProps={{ withinPortal: true }}
            data={existingGoals.map(goal => goal.title)}
            placeholder="Select a goal"
            label="Associated Goal"
            value={selectedGoal}
            onChange={(value) => {
              if (value) setSelectedGoal(value);
            }}
            required
          />

          <TextInput
            label="Milestone Name"
            placeholder="Add Milestone Name"
            value={milestoneName}
            onChange={(event) => {setMilestoneName(event.currentTarget.value)}}
          />

          <Textarea 
            label="Description" 
            placeholder="Add Milestone Description" 
            value={milestoneDescription}
            onChange={(event) => {setMilestoneDescription(event.currentTarget.value)}}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeMilestoneModal}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleMilestoneSubmit}
              disabled={!selectedGoal || !milestoneName}
            >
              Add Milestone
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Group gap="sm" align="center">
        <Button variant="default" onClick={openGoalModal}>
          Create Career Goal
        </Button>
        <Button variant="default" onClick={handleCreateMilestoneClick}>
          Create Milestone
        </Button>
      </Group>
    </>
  );
}

