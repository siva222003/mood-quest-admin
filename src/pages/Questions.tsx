import { Outlet, useParams } from "react-router-dom";
import { columns } from "../components/questions/question-columns";
import { DataTable } from "../components/data-table/data-table";
import { useFetchQuestions } from "@/hooks/question";
import AddQuestion from "@/components/questions/AddQuestion";

export default function Questions() {
  const { sectionId } = useParams();

  const { questions = [] } = useFetchQuestions(sectionId);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Questions</h2>
            <p className="text-muted-foreground">Here&apos;s the list of questions!</p>
          </div>
        </div>

        {sectionId && <AddQuestion sectionId={sectionId} />}

        <DataTable data={questions} columns={columns} />

        <Outlet />
      </div>
    </>
  );
}
