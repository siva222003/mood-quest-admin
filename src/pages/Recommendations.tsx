import { useFetchRecommendations } from "@/hooks/recommendation";
import { columns } from "../components/recommendations/recommendation-columns";
import { DataTable } from "../components/data-table/data-table";
import AddRecommendation from "@/components/recommendations/AddRecommendation";

export default function Recommendations() {
  const { recommendations = [] ,isLoading} = useFetchRecommendations();

  console.log(recommendations);
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recommendations</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>

        <AddRecommendation />

        <DataTable data={recommendations} columns={columns} loading={isLoading} />
      </div>
    </>
  );
}
