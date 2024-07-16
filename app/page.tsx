"use client";
import Dropdown, { Option } from "./components/dropdown";
import { useState } from "react";
import DateTimeInput from "./components/dateTimePicker";
import Checkbox from "./components/checkbox";
import { apiGenerateAgenda } from "@/api/agenda";

import { QueryClient, QueryClientProvider } from "react-query";

export type TeamMemberEmail = "joshpark118@gmail.com" | "pi.dudka@gmail.com";
const TEAM_MEMBER_OPTIONS: Option[] = [
  {
    label: "Joshulyne Park",
    value: "joshpark118@gmail.com",
  },
  {
    label: "Peter Dudka",
    value: "pi.dudka@gmail.com",
  },
];

export type AgendaItem =
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

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

function Home() {
  const today = new Date();
  const oneWeekBefore = new Date(today);
  oneWeekBefore.setDate(today.getDate() - 7);
  const [teamMember, setTeamMember] = useState<TeamMemberEmail>(
    "joshpark118@gmail.com"
  );
  const [selectedStartDate, setSelectedStartDate] =
    useState<Date>(oneWeekBefore);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(today);

  const [selectedAgendaItems, setSelectedAgendaItems] = useState<AgendaItem[]>(
    []
  );

  const handleDownloadAgendaPDF = async () => {
    const response = await apiGenerateAgenda({
      user: teamMember,
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      agendaItems: selectedAgendaItems,
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${teamMember}-${formatDate(selectedStartDate)}-${formatDate(
        selectedEndDate
      )}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      console.error("Failed to fetch the PDF:", response.statusText);
    }
  };

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
              setTeamMember(option as TeamMemberEmail);
            }}
            fullWidth
          />
        </div>
        <div className="flex flex-row justify-between">
          <div>Date Range:</div>
          <div className="flex-col space-y-4">
            <DateTimeInput
              selected={selectedStartDate}
              onChange={(date) => date && setSelectedStartDate(date)}
              showTimeSelect={false}
              maxDate={oneWeekBefore}
            />
            <DateTimeInput
              selected={selectedEndDate}
              onChange={(date) => date && setSelectedEndDate(date)}
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
                setSelectedAgendaItems(option as AgendaItem[])
              }
            />
          </div>
        </div>
        <button
          className="justify-center items-center flex shadow-sm hover:shadow-md disabled:shadow-none ease-out duration-200 font-medium disabled:cursor-default w-full h-12 px-6 b2 rounded-.5xl border border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20 disabled:border-none disabled:bg-white/5 disabled:text-white/50"
          onClick={handleDownloadAgendaPDF}
        >
          <div className="m-2 p-2">Generate Agenda!</div>
        </button>
      </div>
    </main>
  );
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero indexed
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
}
