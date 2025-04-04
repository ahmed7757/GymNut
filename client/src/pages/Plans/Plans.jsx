import { AiOutlinePlus } from "react-icons/ai"; // Import the add icon
import React, { useState } from "react";

const Plans = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [planData, setPlanData] = useState({
    goal: "lose",
    activity: "1.2",
    targetWeight: "",
    duration: "",
  });
  // const [goal, setGoal] = useState("lose"); // Default: Lose weight
  // const [activity, setActivity] = useState(""); // Default: Lose weight
  // const [weight, setWeight] = useState("");
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with form data (e.g., send to server or display it)
    console.log(planData);

    // Close the modal after submission
    toggleModal();
  };

  return (
    <section className="p-3 grid grid-cols-3 gap-4">
      <h1 className="col-span-3 text-xl font-bold mb-4">Plans</h1>

      {/* Sample Cards */}
      <div className="border p-4 col-span-3 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold">Current Plan</h2>
        <p>Details about Plan Current Plan</p>
      </div>

      <div className="border p-4 shadow-lg rounded-md">
        <h2 className="text-lg font-semibold">Plan 2</h2>
        <p>Details about Plan 2</p>
      </div>

      {/* Add New Plan Card */}
      <div
        onClick={toggleModal}
        className="border p-4 shadow-lg rounded-md flex justify-center items-center text-gray-500 dark:hover:text-[#0a3126] hover:text-[#007654] cursor-pointer"
      >
        <AiOutlinePlus size={48} /> {/* Large add icon */}
      </div>

      {/* Modal for the form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add Your Plan</h2>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Goal selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Goal:
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={planData.goal}
                  onChange={(e) => setPlanData(prev => ({...prev , goal:e.target.value}))}
                >
                  <option value="lose">Lose Weight</option>
                  <option value="gain">Gain Weight</option>
                  <option value="maintain">Maintain Weight</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Activity:
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={planData.activity}
                  onChange={(e) => setPlanData(prev => ({...prev , activity:e.target.value}))}
                >
                  <option value="1.2">Sedentary: little or no exercise</option>
                  <option value="1.375">Light: exercise 1-3 times/week</option>
                  <option value="1.465" >
                    Moderate: exercise 4-5 times/week
                  </option>
                  <option value="1.55">
                    Active: daily exercise or intense exercise 3-4 times/week
                  </option>
                  <option value="1.725">
                    Very Active: intense exercise 6-7 times/week
                  </option>
                  <option value="1.9">
                    Extra Active: very intense exercise daily, or physical job
                  </option>
                </select>
              </div>

              {/* Weight input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  target weight (kg):
                </label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={planData.targetWeight}
                  onChange={(e) => setPlanData(prev => ({...prev , targetWeight:e.target.value}))}
                  required
                />
              </div>

              {/* Duration selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Duration:
                </label>
                <select
                  className="w-full border p-2 rounded"
                  value={planData.duration}
                  onChange={(e) => setPlanData(prev => ({...prev , duration:e.target.value}))}
                >
                  <option value="1">1 week</option>
                  <option value="2">2 weeks</option>
                  <option value="3" >
                    3 weeks
                  </option>
                  <option value="4">
                    1 month
                  </option>
                  <option value="8">
                    2 months
                  </option>
                  <option value="12">
                    3 months
                  </option>
                  <option value="16">
                    4 months
                  </option>
                  <option value="20">
                    5 months
                  </option>
                  <option value="24">
                    6 months
                  </option>
                  <option value="28">
                    7 months
                  </option>
                  <option value="32">
                    8 months
                  </option>
                  <option value="36">
                    9 months
                  </option>
                  <option value="40">
                    10 months
                  </option>
                  <option value="44">
                    11 months
                  </option>
                  <option value="48">
                    1 year
                  </option>
                </select>
              </div>

              {/* Start date input */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Start Date:
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={planData.startDate}
                  onChange={(e) => setPlanData(prev => ({...prev , startDate:e.target.value}))}
                  required
                />
              </div> */}

              {/* End date input */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  End Date:
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded"
                  value={planData.endDate}
                  onChange={(e) => setPlanData(prev => ({...prev , endDate:e.target.value}))}
                  required
                />
              </div> */}

              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Submit
              </button>

              {/* Close button */}
              <button
                type="button"
                className="mt-2 text-gray-600 w-full"
                onClick={toggleModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Plans;
