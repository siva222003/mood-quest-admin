import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/data/schema";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { motion } from "framer-motion";
import { ChartBar, Database, Scroll, SignOut, Users } from "phosphor-react";
import { NavLink, useNavigate } from "react-router-dom";
interface SidebarProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | undefined;
}

const Sidebar = ({ setIsAuthenticated, user }: SidebarProps) => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);

    toast({
      title: "Success",
      description: "Logged out successfully",
    });

    navigate("/auth");
  };

  return (
    <>
      <div className="flex justify-between items-center max-md:pr-10 max-md:shadow-md">
        {/* Mobile Navbar Toggle */}

        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex p-2 mt-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-180 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/1800/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <h1 className="md:hidden">Mood Quest</h1>
      </div>

      {/* Sidebar */}

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 md:m-2 md:border md:border-gray-200 md:rounded-lg z-40 w-64 h-screen transition-transform -translate-x-full md:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 rounded-lg overflow-y-auto md:rounded-lg  dark:bg-gray-800">
          {/* Sidebar Header */}
          <div className="text-center py-5 border-b-2 border-gray-300">
            <h1 className="text-3xl font-bold">Mood Quest</h1>
          </div>

          {/* Sidebar Navigation */}

          <ul className="space-y-2 font-medium mt-4">
            <motion.li
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 ${
                    isActive ? "bg-black text-white hover:bg-black" : "hover:bg-gray-100"
                  } text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group`
                }
              >
                <ChartBar size={18} weight="bold" />
                <span className="ms-3 text-[15px] font-semibold ">Dashboard</span>
              </NavLink>
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 ${
                    isActive ? "bg-black text-white hover:bg-black" : "hover:bg-gray-100"
                  } text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group`
                }
              >
                <Users size={18} weight="bold" />
                <span className="flex-1 ms-3 text-[15px] font-semibold whitespace-nowrap">
                  Users
                </span>
              </NavLink>
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/questionnaire"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 ${
                    isActive ? "bg-black text-white hover:bg-black" : "hover:bg-gray-100"
                  } text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group`
                }
              >
                <Scroll size={18} weight="bold" />
                <span className="flex-1 ms-3 text-[15px] font-semibold whitespace-nowrap">
                  Questionnaire
                </span>
              </NavLink>
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to="/recommendations"
                className={({ isActive }) =>
                  `flex items-center px-2 py-3 ${
                    isActive ? "bg-black text-white hover:bg-black" : "hover:bg-gray-100"
                  } text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group`
                }
              >
                <Database size={18} weight="bold" />
                <span className="flex-1 ms-3 text-[15px] font-semibold whitespace-nowrap">
                  Recommendations
                </span>
              </NavLink>
            </motion.li>

            <motion.li
              onClick={handleLogout}
              className="cursor-pointer hover:bg-gray-100 rounded-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="flex items-center px-2 py-3 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group">
                <SignOut size={18} weight="bold" />
                <span className="flex-1 ms-3 text-[15px] font-semibold whitespace-nowrap">
                  Sign Out
                </span>
              </button>
            </motion.li>
          </ul>

          <div className="bg-zinc-100 rounded-lg py-3 items-center mt-56 px-4 gap-4 flex">
            <Avatar>
              {/* <AvatarImage src="" /> */}
              <AvatarFallback className="w-full flex justify-center items-center bg-gray-200">
                {user?.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-sm font-bold">{user?.name}</h1>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
