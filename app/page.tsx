"use client";
import Dropdown, { Option } from "./components/dropdown";
import { useState } from "react";
import DateTimeInput from "./components/dateTimePicker";
import Checkbox from "./components/checkbox";

type TeamMember = "joshulynepark" | "peterdudka";
const TEAM_MEMBER_OPTIONS: Option[] = [
  {
    label: "Joshulyne Park",
    value: "joshulynepark",
  },
  {
    label: "Peter Dudka",
    value: "peterdudka",
  },
];

type AgendaItems =
  | "personal-updates"
  | "accomplishments"
  | "blockers"
  | "risks";
const AGENDA_ITEM_OPTIONS: Option[] = [
  {
    label: "Personal Updates",
    value: "personal-updates",
  },
  {
    label: "Accomplishments",
    value: "accomplishments",
  },
  {
    label: "Blockers",
    value: "blockers",
  },
  {
    label: "Risks to company goals",
    value: "risks",
  },
];

export default function Home() {
  const today = new Date();
  const oneWeekBefore = new Date(today);
  oneWeekBefore.setDate(today.getDate() - 7);
  const [teamMember, setTeamMember] = useState<TeamMember>("joshulynepark");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const [selectedAgendaItems, setSelectedAgendaItems] = useState<AgendaItems[]>(
    []
  );

  return (
    <main className="flex min-h-screen flex-col items-center p-20 w-full">
      <div className="space-y-10">
        <div>Generate an agenda for your upcoming one-on-one</div>
        <div className="flex flex-row justify-between">
          <div>Team Member:</div>
          <Dropdown
            options={TEAM_MEMBER_OPTIONS}
            selectedOptionValue={teamMember}
            onSelectOption={(option) => {
              setTeamMember(option as TeamMember);
            }}
            fullWidth
          />
        </div>
        <div className="flex flex-row justify-between">
          <div>Date Range:</div>
          <div className="flex-col space-y-4">
            <DateTimeInput
              selected={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date)}
              showTimeSelect={false}
              maxDate={oneWeekBefore}
            />
            <DateTimeInput
              selected={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date)}
              showTimeSelect={false}
              maxDate={today}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div>Types of updates:</div>
          <div className="flex-col space-y-4">
            <Checkbox
              options={AGENDA_ITEM_OPTIONS}
              selectedValues={selectedAgendaItems}
              onSelectOption={(option) =>
                setSelectedAgendaItems(option as AgendaItems[])
              }
            />
          </div>
        </div>
        <button
          className="justify-center items-center flex shadow-sm hover:shadow-md disabled:shadow-none ease-out duration-200 font-medium disabled:cursor-default w-full h-12 px-6 b2 rounded-.5xl border border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20 disabled:border-none disabled:bg-white/5 disabled:text-white/50"
          onClick={() => console.log("generating agenda")}
        >
          <div className="m-2 p-2">Generate Agenda!</div>
        </button>
      </div>
    </main>
  );
}
