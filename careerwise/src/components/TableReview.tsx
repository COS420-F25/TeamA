import { Anchor, Group, Progress, Table, Text } from '@mantine/core';
import classes from './TableReviews.module.css';

export type Goal = {
 title: string
 category: "Job Application" |"Skill Development" |"Etc"
 description: string
};

interface TableReviewProps{
  data: Goal[];
}

export function TableReviews({data}: TableReviewProps) {
  const rows = data.map((row) => {
    // const totalReviews = row.reviews.negative + row.reviews.positive;
    // const positiveReviews = (row.reviews.positive / totalReviews) * 100;
    // const negativeReviews = (row.reviews.negative / totalReviews) * 100;

    return (
      <Table.Tr key={row.title}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.title}
          </Anchor>
        </Table.Td>
        <Table.Td>{row.category}</Table.Td>
        <Table.Td>
            {row.description}
        </Table.Td>
        {/* <Table.Td>{Intl.NumberFormat().format(totalReviews)}</Table.Td> */}
        <Table.Td>
          <Group justify="space-between">
            {/* <Text fz="xs" c="teal" fw={700}>
              {positiveReviews.toFixed(0)}%
            </Text> */}
            {/* <Text fz="xs" c="red" fw={700}>
              {negativeReviews.toFixed(0)}%
            </Text> */}
          </Group>
          {/* <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={positiveReviews}
              color="teal"
            />

            <Progress.Section
              className={classes.progressSection}
              value={negativeReviews}
              color="red"
            />
          </Progress.Root> */}
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
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}