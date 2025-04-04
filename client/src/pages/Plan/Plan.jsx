import { useContext, useEffect, useState } from 'react';
import axios from '../../api/axios';
import { UserContext } from '../../contexts/User';

const apiKey = 'AIzaSyCIC9WTKyp1qLm6gd4P2uIsBLuf-yym9OI';
const profileDataURL = "/user/profile";
const userBMIURL = "/user/calculateBMI";


const Plan = () => {
    const loggedData = useContext(UserContext);
    const [plan, setPlan] = useState(null);
    const [profile, setProfile] = useState(null);
    const [planData, setPlanData] = useState(null)
    const [bmi, setBmi] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [textPlan, setTextPlan] = useState("");
    const [protein, setProtein] = useState(0)
    const [calories, setCalories] = useState(0)
    const [carb, setCarb] = useState(0)
    const [fats, setFats] = useState(0)


    useEffect(() => {
        const fetchBMI = async () => {
            try {
                const response = await axios.get(userBMIURL, {
                    headers: {
                        "Authorization": `Bearer ${loggedData.loggedUser}`,
                    },
                });
                const userBMI = await response.data;
                setBmi(userBMI.BMI);
                console.log(userBMI.BMI);
            } catch (error) {
                console.error("Error fetching user BMI:", error);
            }
        };
        fetchBMI();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(profileDataURL, {
                    headers: {
                        "Authorization": `Bearer ${loggedData.loggedUser}`,
                    },
                });
                const userData = await response.data;
                setProfile(userData);
                console.log(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const generatePlan = async () => {
            if (profile && profile.user) { // Ensure profile and profile.user are defined
                try {
                    const fetchPlan = async () => {
                        return axios.post(
                            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`,
                            {
                                "contents": [{
                                    "parts": [{
                                        "text": `Create a detailed nutrition and workout plan for a ${profile.user.age}-year-old individual who weighs ${profile.user.weight}kg, is ${profile.user.height}cm tall, and has a BMI of ${bmi}. Their goal is ${planData?.goal}, and target Weight is ${planData?.targetWeight}, and their activity level is ${planData?.activityLevel}. The plan duration is ${planData?.duration}. Please create a structured response without any symbols or markdown. 
                                        
                                        Include:
                                        1. **Nutrition Setup**: 
                                        - Describe appropriate calorie intake for the goal, breaking it down by macronutrients (proteins, carbohydrates, fats).
                                        - Include portion sizes for each meal, broken down by Breakfast, Lunch, Dinner, and Snacks.
                                        - Provide recommendations for hydration and timing of meals.
                                        
                                        2. **Workout Plan**: 
                                        - Detail a daily workout schedule for the week, including warm-ups, exercises, and cool-downs.
                                        - Mention the frequency of strength training, cardio, and rest days.
                                        
                                        3. **Important Considerations**: 
                                        - List key health tips, including sleep and stress management, and suggest supplements if necessary.
                                        
                                        4. **Macronutrient Breakdown**: 
                                        Provide a clear breakdown of the macronutrients at the end of the plan, like this example:
                                        Macronutrients:
                                        - Calories: 2000 kcal
                                        - Protein: 150 g
                                        - Carbohydrates: 250 g
                                        - Fats: 50 g
                                        I want the final result like this JSON format:
                                        {
                                        "nutritionSetup": {
                                            "calorieIntake": "",
                                            "macronutrientBreakdown": {
                                                "protein": "",
                                                "carbohydrates": "",
                                                "fats": ""
                                                },
                                                "mealPlan": {
                                                    "breakfast": "",
                                                    "lunch": "",
                                                    "dinner": "",
                                                    "snacks": [
                                                "",
                                                "",
                                                "",
                                                ""
                                                ]
                                                },
                                                "hydration": "",
                                                "mealTiming": ""
                                                },
                                                "workoutPlan": {
                                                    "dailySchedule": [
                                            {
                                                "day": "",
                                                "workout": ""
                                                },
                                                {
                                                    "day": "",
                                                    "workout": ""
                                                    },
                                                    {
                                                "day": "",
                                                "workout": ""
                                            },
                                            {
                                                "day": "",
                                                "workout": ""
                                                },
                                                {
                                                    "day": "",
                                                    "workout": ""
                                                    },
                                                    {
                                                        "day": "",
                                                        "workout": ""
                                                        },
                                                        {
                                                "day": "",
                                                "workout": ""
                                                }
                                                ],
                                                "cardio": "",
                                                "coolDown": "",
                                                "strengthTrainingFrequency": "",
                                                "cardioFrequency": "",
                                                "restDays": ""
                                                },
                                                "importantConsiderations": [
                                                    "",
                                                    "",
                                            "",
                                            ""
                                            ],
                                            "macronutrientBreakdown": {
                                            "calories": "",
                                            "protein": "",
                                            "carbohydrates": "",
                                            "fats": ""
                                            }
                                            }
                                            `
                                    }]
                                }]
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }
                        );
                    };
                    const response = await exponentialBackoff(fetchPlan);
                    setTextPlan(response.data.candidates[0].content.parts[0].text);
                    console.log(response.data.candidates[0].content.parts[0].text);
                } catch (error) {
                    console.error("Error generating plan:", error.response || error);
                }
            }
        };
        if (planData) {
            generatePlan();
        }
    }, [planData, profile, bmi]);


    useEffect(() => {
        const sendData = async () => {
            try {
                const response = await axios.post(
                    "/user/pans/addAIplan",
                    {
                        targetWeight: planData.targetWeight,
                        duration: planData.duration,
                        activityLevel: planData.activityLevel,
                        goal: planData.goal,
                        dailyCalory: calories,
                        dailyProtean: protein,
                        dailyCarbohydrates: carb,
                        dailyFats: fats,
                        details: plan,
                    },
                    {
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${loggedData.loggedUser}` },
                        withCredentials: false,
                    }
                );
            }
            catch (err) {
                console.log(err)
            }
        }
        if (plan && planData && calories && protein && carb && fats && loggedData.loggedUser) {
            sendData();
        }
    }, [plan, planData, calories, protein, carb, fats, loggedData.loggedUser]);
    useEffect(() => {
        const extractJSONFromResponse = (textPlan) => {
            const splicePlans = (textPlan.split('\n'))
            let slicePlan = splicePlans.slice(1, splicePlans.length - 1)
            if (slicePlan[slicePlan.length - 1] !== "}") {
                slicePlan = slicePlan.slice(0, slicePlan.length - 1)
            }
            console.log(slicePlan);
            const joinSplicePlan = slicePlan.join('\n')
            console.log(joinSplicePlan);
            console.log(JSON.parse(joinSplicePlan));
            setPlan(JSON.parse(joinSplicePlan));
        }
        if (textPlan) {
            extractJSONFromResponse(textPlan)
        }
        const Macronutrient = () => {
            const parseValue = (value) => parseFloat(value.replace(/[^\d.]/g, ''));
            if (plan?.nutritionSetup) {
                setProtein(parseValue(plan.nutritionSetup.macronutrientBreakdown.protein))
                setCalories(parseValue(plan.nutritionSetup.calorieIntake))
                setCarb(parseValue(plan.nutritionSetup.macronutrientBreakdown.carbohydrates))
                setFats(parseValue(plan.nutritionSetup.macronutrientBreakdown.fats))
            }
        }
        if (plan) {
            Macronutrient()
        }
    }, [textPlan])

    const exponentialBackoff = async (fn, retries = 5, delay = 1000) => {
        try {
            return await fn();
        } catch (error) {
            if (retries > 0 && error.response?.status === 429) {
                const retryAfter = error.response.headers['retry-after'];
                const waitTime = retryAfter ? retryAfter * 1000 : delay;
                console.warn(`429 Too Many Requests - retrying after ${waitTime / 1000} seconds... attempts left: ${retries}`);

                await new Promise((resolve) => setTimeout(resolve, waitTime));
                return exponentialBackoff(fn, retries - 1, delay * 2); // Increase delay exponentially if no 'Retry-After'
            } else {
                throw error;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const planData = {
            goal: e.target[0].value,
            activityLevel: e.target[1].value,
            duration: e.target[2].value,
            targetWeight: e.target[3].value
        };
        setPlanData(planData);
        console.log(planData);
        setIsLoading(true)
    }


    return (
        <section className='container mx-auto px-8 sm:px10 md:px-12 lg:px-14 py-3 flex flex-col gap-4'>
            <div className='flex flex-col gap-4 items-center'>
                <h1 className='text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold'>Create your custom nutrition plan</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 md:flex-row md:gap-2 w-full justify-around p-3 rounded-md dark:from-neutral dark:to-neutral bg-gradient-to-b from-[#398650] to-green-900 items-center'>
                    <h3 className='font-semibold text-xl md:text-2xl text-white dark:text-current'>Enter these information</h3>
                    <select className="select select-success w-full max-w-xs">
                        <option disabled selected>Pick your your goal</option>
                        <option value={"weight loss"}>weight loss</option>
                        <option value={"muscle gain"}>muscle gain</option>
                        <option value={"Maintain my current fit"}>Maintain my current fit</option>
                    </select>
                    <select className="select select-success w-full max-w-xs">
                        <option disabled selected>Pick activity level</option>
                        <option value="Sedentary (1.2)">Sedentary: little or no exercise</option>
                        <option value="Lightly active (1.375)">Light: exercise 1-3 times/week</option>
                        <option value="Moderately active (1.465)" >
                            Moderate: exercise 4-5 times/week
                        </option>
                        <option value="Active (1.55)">
                            Active: daily exercise or intense exercise 3-4 times/week
                        </option>
                        <option value="Very Active (1.725)">
                            Very Active: intense exercise 6-7 times/week
                        </option>
                        <option value="Extra Active (1.9)">
                            Extra Active: very intense exercise daily, or physical job
                        </option>
                    </select>
                    <select className="select select-success w-full max-w-xs">
                        <option disabled selected>Pick your plan duration</option>
                        <option value={"1 week"}>1 week</option>
                        <option value={"2 weeks"}>2 weeks</option>
                        <option value={"3 weeks"}>3 weeks</option>
                        <option value={"1 month"}>1 month</option>
                        <option value={"2 months"}>2 months</option>
                        <option value={"3 months"}>3 months</option>
                        <option value={"4 months"}>4 months</option>
                        <option value={"5 months"}>5 months</option>
                        <option value={"6 months"}>6 months</option>
                    </select>

                    <input
                        type="number"
                        className="w-full border select select-success max-w-xs"
                        min={5}
                        max={150}
                        placeholder='target weight (kg)'
                        required
                    />
                    <button className="btn btn-accent dark:btn-success">Generate</button>
                </form>
            </div>
            {plan && profile && textPlan ? (
                <div className="flex flex-col gap-4 items-center">
                    <h1 className='text-3xl font-bold'>Personalized Plan</h1>
                    <div className='dark:from-neutral dark:to-neutral bg-gradient-to-b from-[#398650] to-green-900 shadow-md space-y-3 rounded-md p-4'>

                        <div className='dark:bg-slate-400 bg-green-50 flex flex-col p-2 rounded-md'>
                            <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Client Profile</h2>
                            <ul className='text-neutral-700 text-lg dark:text-grey-200'>
                                <li>Name: {profile.user.userName}</li>
                                <li>
                                    Age: {profile.user.age} years
                                </li>
                                <li>Gender: {profile.user.gender}</li>
                                <li>
                                    Weight: {profile.user.weight} kg
                                </li>
                                <li>
                                    Height: {profile.user.height} cm
                                </li>
                                {profile.user.disease !== "none" ? <li>Disease: {profile.user.disease}</li> : null}
                            </ul>
                        </div>

                        <div className='flex flex-col gap-3 rounded-lg'>
                            {/* Nutrition Setup */}
                            {plan?.nutritionSetup && (
                                <div className='dark:bg-slate-400 bg-green-50 p-2 rounded-md flex flex-col gap-1'>
                                    <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Nutrition Setup</h2>
                                    <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Macronutrient Breakdown</h2>
                                    <ul className='text-neutral-700 text-lg dark:text-grey-200'>
                                        <li><span className='font-bold'>Calorie Intake:</span> {plan.nutritionSetup.calorieIntake}</li>
                                        <li><span className='font-bold'>Protein:</span> {plan.nutritionSetup.macronutrientBreakdown.protein}</li>
                                        <li><span className='font-bold'>Carbohydrates:</span> {plan.nutritionSetup.macronutrientBreakdown.carbohydrates}</li>
                                        <li><span className='font-bold'>Fats:</span> {plan.nutritionSetup.macronutrientBreakdown.fats}</li>
                                    </ul>
                                    <div className='text-neutral-700 text-lg dark:text-grey-200'>
                                        <h3 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200 '>Meal Plan</h3>
                                        <p><span className='font-bold'>Breakfast:</span> {plan.nutritionSetup.mealPlan.breakfast}</p>
                                        <p><span className='font-bold'>Lunch:</span> {plan.nutritionSetup.mealPlan.lunch}</p>
                                        <p><span className='font-bold'>Dinner:</span>{plan.nutritionSetup.mealPlan.dinner}</p>
                                        <h4 className='font-bold'>Snacks:</h4>
                                        <ul className='pl-5'>
                                            {plan.nutritionSetup.mealPlan.snacks.map((snack, index) => (
                                                <li className='list-disc' key={index}>{snack}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <p className='text-neutral-700 text-lg dark:text-grey-200'><span className='font-bold'>Hydration:</span> {plan.nutritionSetup.hydration}</p>
                                    <p className='text-neutral-700 text-lg dark:text-grey-200'><span className='font-bold'>Meal Timing:</span> {plan.nutritionSetup.mealTiming}</p>
                                </div>
                            )}

                            {/* Workout Plan */}
                            {plan?.workoutPlan && (
                                <div className='dark:bg-slate-400 bg-green-50 p-2 rounded-md flex flex-col gap-1'>
                                    <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Workout Plan</h2>
                                    <table className='border-2 text-neutral-700 text-lg dark:text-grey-200'>
                                        <tr className='border-2'>
                                            <th>Day</th>
                                            <th>Workout</th>
                                        </tr>
                                        {plan.workoutPlan.dailySchedule.map((day, index) => (
                                            <tr key={index} className='border-2 p-1'>
                                                <td className='p-1 border-2 font-semibold'>{day.day}</td>
                                                <td className='p-1 border-2'>{day.workout}</td>
                                            </tr>
                                        ))}
                                    </table>
                                    <p className='text-neutral-700 text-lg dark:text-grey-200'><span className='font-bold'>Cardio:</span> {plan.workoutPlan.cardio}</p>
                                    <p className='text-neutral-700 text-lg dark:text-grey-200'><span className='font-bold'>CardioFrequency:</span> {plan.workoutPlan.cardioFrequency}</p>
                                    <p className='text-neutral-700 text-lg dark:text-grey-200'><span className='font-bold'>Cool-down:</span> {plan.workoutPlan.coolDown}</p>
                                </div>
                            )}

                            {/* Important Considerations */}
                            {plan?.importantConsiderations.length > 0 && (
                                <div className='dark:bg-slate-400 bg-green-50 p-2 rounded-md flex flex-col text-neutral-700 text-lg dark:text-grey-200 gap-1'>
                                    <h2 className='text-neutral-700 text-xl md:text-2xl font-semibold dark:text-grey-200'>Important Considerations</h2>
                                    <ul>
                                        {plan.importantConsiderations.map((consideration, index) => (
                                            <li key={index}>{consideration}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>)
                : isLoading ?
                    (<div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <p>Loading plan data...</p>
                    </div>)
                    : null
            }
        </section>
    );
};

export default Plan;
