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

export function ScheduleView({ schedule }: ScheduleViewProps): React.JSX.Element {

	useMantineTheme();
	
	return <div>
		{/* Calendar view for selecting meeting date */}
		<DatePicker 
			defaultDate={getDates(schedule)[0]}
		/>

		{/* Request Meeting Button */}
		<Button disabled={true}>Request Meeting</Button>
	</div>
}