/* File ScheduleView.tsx
 * Contains tests for ScheduleView
 * COS 420 Team A
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScheduleView } from './ScheduleView'
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';

const testSchedule = 
{
	"11-23-2025": [
		{
			startTime: "10:00 AM",
			endTime: "10:20 AM",
			available: true
		},
		{
			startTime: "10:30 AM",
			endTime: "10:50 AM",
			available: true
		},

	],
	"11-24-2025": [
		{
			startTime: "11:00 AM",
			endTime: "12:00 PM",
			available: false
		}
	]
}

/* Test the Schedule View */
describe("ScheduleView Component Tests", () => {

	beforeEach(() => {
		render(
			<MantineProvider>
			<ScheduleView />
			</MantineProvider>
		);
	});

	/* Test if fields are present */
	test("Calendar View / date picker is present", () => {
		const calendar = screen.getByText("November 2025");
		expect(calendar).toBeInTheDocument();
		screen.debug(calendar);
	});

	test ("'Request Meeting' Button is present but disabled", () => {
		const reqButton = screen.getByRole("button", {name: /Request Meeting/i})
		expect(reqButton).toBeInTheDocument();
		expect(reqButton).toBeDisabled();
	});

	/* Test that the view is correct for the schedule under test */
	test ("November 23rd and 24th are present on the calendar", () => {
		const day1 = screen.getByLabelText("23");
		const day2 = screen.getByLabelText("24");
		expect(day1).toBeInTheDocument;
		expect(day2).toBeInTheDocument;
		screen.debug(day1);
		screen.debug(day2);
	});

	test ("November 23rd is clickable on the calendar", () => {
		const day = screen.getByLabelText("23");
		expect(day).not.toBeDisabled();
	});

	test ("November 24th is not clickable on the calendar", () => {
		const day = screen.getByLabelText("24");
		expect(day).toBeDisabled();
	});

	/* Test click actions */
	test ("Click November 23rd, 10:30 AM is shown", () => {
		const day = screen.getByLabelText("23");
		userEvent.click(day);
		const timeShown = screen.getByLabelText(/10:30 AM/i);
		expect(timeShown).toBeInTheDocument();
	});

	test ("Click November 23rd again, 10:30 AM is hidden", () => {
		const day = screen.getByLabelText("23");
		userEvent.click(day);
		userEvent.click(day);
		const timeShown = screen.queryByLabelText(/10:30 AM/i);
		expect(timeShown).not.toBeInTheDocument();
	});

	test ("Click November 23rd, click 10:30 AM, 'Request Meeting' button enables", () => {
		const day = screen.getByLabelText("23");
		userEvent.click(day);
		const timeShown = screen.getByLabelText(/10:30 AM/i);
		userEvent.click(timeShown);
		const reqButton = screen.getByLabelText("Request Meeting");
		expect(reqButton).not.toBeDisabled();
	});

});