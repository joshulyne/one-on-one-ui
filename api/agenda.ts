import { AgendaItem, TeamMemberEmail } from "@/app/page";
import axios from "axios";

export const HOST = process.env.NEXT_PUBLIC_API_HOST;

interface APIAgendaInput {
  user: TeamMemberEmail;
  startDate: Date;
  endDate: Date;
  agendaItems: AgendaItem[];
}

export const apiGenerateAgenda = async (agendaInput: APIAgendaInput) => {
  return await axios.post(`${HOST}/agenda`, agendaInput, {
    responseType: "blob",
  });
};
