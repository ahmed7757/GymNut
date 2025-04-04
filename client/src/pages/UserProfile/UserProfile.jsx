import Sidebar from "../../components/Sidebar";
import { useEffect, useState, useContext, Fragment } from "react";
import axios from "../../api/axios";
import { UserContext } from "../../contexts/User";
import { CiEdit } from "react-icons/ci";
import { FaArrowCircleDown } from "react-icons/fa";


const getProfileUrl = "/user/profile";
const updateProfileURL = "/user/updateProfile";

function UserButtons({ reset, data, setData, setShowHide }) {

  const [editingFields, setEditingFields] = useState({
    age: false,
    gender: false,
    height: false,
    weight: false,
    disease: false,
    email: false,
    phoneNum: false,
  });

  // useEffect to reset editing fields when the reset prop changes
  useEffect(() => {
    if (reset) {
      setEditingFields({
        age: false,
        gender: false,
        height: false,
        weight: false,
        disease: false,
        email: false,
        phoneNum: false,
      });
    }
  }, [reset]); // This hook runs only when `reset` changes

  const toggleInput = (key) => {
    setEditingFields((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the input for the specific key
    }));
    setShowHide(true);
  };

  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <Fragment key={key}>
          {key === "age" ? (
            <div className="divider w-full border-opacity-50">Details</div>
          ) : key === "disease" ? (
            <div className="divider w-full border-opacity-50">
              Health Status
            </div>
          ) : key === "email" ? (
            <div className="divider w-full border-opacity-50">Contact</div>
          ) : (
            ""
          )}
          <div className="flex justify-between w-full gap-10 items-center" >
            {/* Conditionally render the h3 or input based on whether editing is active for this key */}
            {!editingFields[key] ? (
              <h3
                className="text-2xl  cursor-pointer"
                onClick={() => toggleInput(key)} // Toggle input on click
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </h3>
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, [key]: e.target.value })); // Update the state with input value
                }}
                className="rounded-lg w-16 hover:w-48 transition-all ease-in-out duration-700 p-2 hover:border-2 hover:border-black"
              />
            )}
            <div
              onClick={() => toggleInput(key)} // Toggle input when button is clicked
              className="text-xl hover:text-white shadow-md rounded-lg transition-all p-4"
            >
              <CiEdit />
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
}


function UserProfile() {
  const loggedData = useContext(UserContext);

  const [reset, setReset] = useState(false);
  const [data, setData] = useState({});
  const [showHide, setShowHide] = useState(false);

  //sidebar username
  const [usernameDisplay, setUsernameDisplay] = useState(false)
  //sidebar profile picture
  const [pictureDisplay, setPictureDisplay] = useState(false)
  //handle error
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getProfileUrl, {
          headers: {
            Authorization: `Bearer ${loggedData.loggedUser}`,
          },
        });
        setData(response.data.user);

        setReset(false); // Reset the reset state after fetching the data
        // console.log(data)
      } catch (err) {
        console.log(err);
      }
    };

    if (reset || !data.userName) {
      fetchData(); // Fetch the data when reset is true
    }
  }, [reset]);


  // console.log(data)

  const sendData = async (updatedFields) => {
    try {
      const updatedData = new FormData();

      Object.entries(updatedFields).forEach(([key, value]) => {
        updatedData.append(key, value);
      });

      const dd = await axios.patch(updateProfileURL, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${loggedData.loggedUser}`,
        },
        withCredentials: false,
      });

      // console.log(dd);

      // Trigger a reset to re-fetch updated data, including the new profile picture
      setReset(true);
    } catch (err) {
      console.error(err);
      setError(err.response.data.message)
    }
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

    sendData(data);
    setShowHide(false);
    setReset(true);
    setUsernameDisplay(false)
  };

  // console.log(data)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(""); // Clear the error after 5 seconds
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when error changes
    }
  }, [error]);

  return (
    <form onSubmit={handleFormSubmit}>
      <div role="alert" className={`${error ? "block" : "hidden"} alert alert-error`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error! {error}</span>
      </div>
      <section className="h-screen flex flex-col md:grid md:grid-cols-12">
      <aside className=" col-span-3 bg-[#9e9583] bg-gradient-to-b dark:text-[#0d1906] dark:from-neutral-400 dark:to-neutral-700 flex flex-col p-4 items-center ">
        <Sidebar
          setShowHide={setShowHide}
          setData={setData}
          data={{ username: data.userName, profilePicture: data.profilePicture }}
          usernameDisplay={usernameDisplay}
          setUsernameDisplay={setUsernameDisplay}
          pictureDisplay={pictureDisplay}
          setPictureDisplay={setPictureDisplay}
          className="col-span-1"
        />
        </aside>
        <div className="col-span-9 items-start rounded-xl flex flex-col p-6 shadow-lg gap-10">
          <UserButtons
            setShowHide={setShowHide}
            setData={setData}
            reset={reset}
            data={{
              age: data.age,
              gender: data.gender,
              height: data.height,
              weight: data.weight,
              disease: data.disease,
              email: data.email,
              phoneNum: data.phoneNum
            }}
          />
          {/* Submit Button */}
          <div className="flex justify-center mt-10 " id="submitbutton">
            <input
              type="submit"
              className={`${showHide ? "block" : "hidden"
                } bg-[#007654] text-white rounded-lg p-4 shadow-lg hover:bg-[#105642] transition-all`}
              value={"Save Changes"}
            />
          </div>
          <a href="#submitbutton" className={`${showHide ? "block" : "hidden"} absolute right-10  text-4xl z-50 transition text-[#346859] glass rounded-full mt-10 animate-bounce`}><FaArrowCircleDown /></a>

        </div>
      </section>
    </form>
  );
}

export default UserProfile;
