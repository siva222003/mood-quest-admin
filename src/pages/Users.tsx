import { columns } from "../components/user/user-columns";
import { DataTable } from "../components/data-table/data-table";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";

export default function Users() {
  const { users ,isLoading} = useFetchUsers();

  console.log(users);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Users</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div>
        <DataTable data={users ? users : []} columns={columns} loading={isLoading} />
      </div>
    </>
  );
}
