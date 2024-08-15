import { Outlet } from "react-router-dom";
import { columns } from "../components/questionnaire/questionnaire-columns";
import { DataTable } from "../components/data-table/data-table";
import { useFetchQuestionnaires } from "@/hooks/questionnaire";
import AddQuestionnaire from "@/components/questionnaire/AddQuestionnaire";

export default function Questionnaire() {
  const { questionnaires = [] } = useFetchQuestionnaires();


  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Questionnaires</h2>
            <p className="text-muted-foreground">Here&apos;s the list of questionnaires!</p>
          </div>
        </div>

        <AddQuestionnaire />
        <DataTable
          data={questionnaires}
          columns={columns}
          rowAsLink={true}
          link="/questionnaire/12"
        />

        <Outlet />
      </div>
    </>
  );
}
