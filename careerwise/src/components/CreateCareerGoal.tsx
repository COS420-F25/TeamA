import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Textarea, Select, TextInput } from '@mantine/core';
import React, { useState } from 'react';

export function CreateCareerGoal(
  {
    onAdd,
  }: {
    onAdd: (goal: { title: string, category: "Job Application" |"Skill Development" |"Etc", description: string; }) => void;
  }
) {
  const [opened, { open, close }] = useDisclosure(false);
  const [goalType, setGoalType] = useState<"goal" | "milestone">("goal");
  const [goalName, setGoalName] = useState<string>("");
  const [goalCategory, setGoalCategory] = useState<"Job Application" |"Skill Development" |"Etc">("Etc");
  const [goalDescription, setGoalDescription] = useState<string>("");

  const handleSubmit = () => {
    onAdd({
      title: goalName,
      category: goalCategory,
      description: goalDescription
    });
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="New Career Goal">
        <TextInput
          label="Goal Name"
          placeholder="Add Name"
          value={goalName}
          onChange={(event) => setGoalName(event.currentTarget.value)}
        />

        <Select
          mt="md"
          comboboxProps={{ withinPortal: true }}
          data={["Job Application", "Skill Development", "Etc"]}
          placeholder="Pick one"
          label="Category"
          value={goalCategory}
            onChange={(value) => {
                if (value) setGoalCategory(value as "Job Application" | "Skill Development" | "Etc");
            }}
        />

        <Textarea label="Description" placeholder="Add Description" 
        value = {goalDescription}
        onChange={(event) => setGoalDescription(event.currentTarget.value)}
        />

        <Button variant="default" onClick={handleSubmit}>
          Create Milestone(Not working)
        </Button>

        <Button variant="default" onClick={handleSubmit}>
          Add Career Goal
        </Button>
      </Modal>

      <Button variant="default" onClick={open}>
        Create Career Goal
      </Button>
    </>
  );
}
