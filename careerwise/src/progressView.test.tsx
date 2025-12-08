import React from 'react';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import { CreateCareerGoal } from './components/CreateCareerGoal';
import { TableReviews } from './components/TableReview';
import {Goal} from './components/TableReview';

const mockdata: Goal[] = [
        {title: 'goal',category:'Job Application', description: 'description' }
]


describe("Create Career Goal Component Tests", () => {

    const onAdd = jest.fn()

    beforeEach(() => {
        render(
            <MantineProvider>
            <CreateCareerGoal
                       onAdd={onAdd} />
            </MantineProvider>
        );
    });

    test("Create Career Goal Button is present", () => {
            const CreateCareerGoalButton = screen.getByRole("button", {
                name: /Create Career Goal/i
            });
            expect(CreateCareerGoalButton).toBeInTheDocument();
        });

	});

