import { Outlet, useParams } from "react-router-dom";
import { columns } from "../components/sections/section-columns";
import { DataTable } from "../components/data-table/data-table";
import { useFetchSections } from "@/hooks/section";
import AddSection from "@/components/sections/AddSection";

export default function Sections() {
  const { questionnaireId } = useParams();
  const { sections } = useFetchSections(questionnaireId);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sections</h2>
            <p className="text-muted-foreground">Here&apos;s the list of questionnaires!</p>
          </div>
        </div>

       {questionnaireId &&  <AddSection questionnaireId={questionnaireId} />}

        <DataTable data={sections?.sections ? sections.sections : []} columns={columns} />

        <Outlet />
      </div>
    </>
  );
}
