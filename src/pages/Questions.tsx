import { Outlet } from "react-router-dom";
import { columns } from "../components/data-table/columns";
import { DataTable } from "../components/data-table/data-table";
import { tasks } from "../constants/index";

// Simulate a database read for tasks.
// async function getTasks() {
//   const res = await fetch("src/data/tasks.json");

//   const data = await res.json();

//   return data;
// }

export default function Questions() {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Questionnaires</h2>
            <p className="text-muted-foreground">Here&apos;s the list of questionnaires!</p>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />

        <Outlet />

      </div>
    </>
  );
}
