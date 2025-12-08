import React, { useState } from 'react';
import { Stack, Text, Button } from '@mantine/core';
import { CreateCareerGoal } from './CreateCareerGoal';
import { TableReviews } from './TableReview';

interface ProgressViewProps {
	onBackToDashboard: () => void;
}

export function ProgressView({ onBackToDashboard }: ProgressViewProps) {
	const [goals, setGoals] = useState<{ title: string, category:"Job Application" |"Skill Development" |"Etc", description: string }[]>([]);

	return (
		<div>
			<Stack gap="md">
				<Text>Progress Tracker</Text>

				<CreateCareerGoal
					onAdd={(goal) => {setGoals((prev) => [...prev, goal])}}
				/>

				<TableReviews data={goals} />

				<Button onClick={onBackToDashboard}>
					Back to Dashboard
				</Button>
			</Stack>
		</div>
	);
}

