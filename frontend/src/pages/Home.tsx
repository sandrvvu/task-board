import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TasksListsContainer from "../components/Lists/ListsContainer";
import Navbar from "../components/Structure/Navbar";
import Footer from "../components/Structure/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="selection:bg-violet-300 selection:text-violet-900 flex-grow mx-14 lg:mx-28 my-10 border-b-20 border-indigo-500">
        <Navbar />
        <TasksListsContainer />
      </div>
      <ToastContainer position="bottom-right" />
      <Footer />
    </div>
  );
};

export default Home;
