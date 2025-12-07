/* File ScheduleView.tsx
 * View for a user to schedule a meeting with a mentor
 * COS 420 Team A
 */

import React from "react";

/* Import Mantine Components */
import { Button, useMantineTheme } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"

/* Import schedule utilities */
import { Schedule } from "./schedule";
import { getDates } from "./schedule";

interface ScheduleViewProps {
	schedule: Schedule;
}

/* Factory to generate an excludeDate callback function based on allowed dates  
 * from the schedule 
 * See https://mantine.dev/dates/calendar/?t=props
*/
function makeExcludeDates(schedule: Schedule): (date: string) => boolean {
	/* Create set of date strings */
	const allowedStrSet = new Set(
		/* Filter out dates where there are no available meetings */
		Object.keys(schedule).filter((datestr: string): boolean => {
			return schedule[datestr].some(slot => slot.available);
		})
	);
	/* Return callback function */
	return function(date: string): boolean {
		return !allowedStrSet.has(date);
	}
}

export function ScheduleView({ schedule }: ScheduleViewProps): React.JSX.Element {

	useMantineTheme();
	
	/* Get the list of Date objects from the schedule */
	const dateList: Date[] = getDates(schedule);

	return <div>
		{/* Calendar view for selecting meeting date */}
		<DatePicker 
			defaultDate={dateList[0]}
			excludeDate={makeExcludeDates(schedule)}
		/>

		{/* Request Meeting Button */}
		<Button disabled={true}>Request Meeting</Button>
	</div>
}