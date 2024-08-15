import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Questionnaire from "./pages/Questionnaire";
import Recommendations from "./pages/Recommendations";
import Sections from "./pages/Sections";
import Questions from "./pages/Questions";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "./api/user";
import { User } from "./data/schema";
import HomeLoader from "./components/loader/HomeLoader";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        setIsAuthenticated(true);
      } else {
        navigate("/auth");
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <HomeLoader />;
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth" element={<Login isAuthenticated={isAuthenticated} />} />

        {/* Protected Routes */}
        <Route
          path="*"
          element={
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
          }
        />
      </Routes>
    </>
  );
};

export default App;
