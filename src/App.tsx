import { Route, Routes } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Questionnaire from "./pages/Questionnaire";
import Recommendations from "./pages/Recommendations";
import Sections from "./pages/Sections";
import Questions from "./pages/Questions";

const App = () => {
  return (
    <main className="flex max-md:flex-col md:m-2 font-primary">
      <Sidebar />

      <section className="md:ml-[264px] border border-black rounded-lg flex-1 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/users" element={<Users />} />

          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/questionnaire/:questionnaireId" element={<Sections />} />
          <Route path="/questionnaire/:id/section/:sectionId" element={<Questions />} />

          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </section>
    </main>
  );
};

export default App;
