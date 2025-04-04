import { useEffect, useState } from "react"
import { UserContext } from "../contexts/User"
import { useContext } from "react"
import axios from "../api/axios"
import { object } from "prop-types";
const trackFoodURL = "/user/trackedFood";
const Food = (props) => {
    const [grams, setGrams] = useState(100)
    const [food, setFood] = useState({})
    const [calories, setCalories] = useState(0)
    const [protein, setProtein] = useState(0)
    const [fats, setFats] = useState(0)
    const [carbs, setCarbs] = useState(0)

    let loggedData = useContext(UserContext);

    const tarckFood = async () => {
        console.log(food._id)
        console.log(grams)
        try {
            const response = await axios.post(trackFoodURL, JSON.stringify({
                foodId: food._id,
                quantity: grams,
                details: {
                    calories: calories,
                    protein: protein,
                    fats: fats,
                    carbs: carbs
                }
            }),
                {
                    headers: {
                        'Authorization': `Bearer ${loggedData.loggedUser}`,
                        'Content-Type': 'application/json'
                    },
                }
            )
        } catch (error) {
            console.log("Can't track this food", error)
        }

    }


    const handleTrack = () => {
        tarckFood()
        setFood({})
    }

    useEffect(() => {
        setFood(props.food)
    }, [props.food])

    useEffect(() => {
        setCalories(((food.calories / 100) * grams).toFixed(2));
        setProtein(((food.protein / 100) * grams).toFixed(2));
        setFats(((food.fats / 100) * grams).toFixed(2));
        setCarbs(((food.carbs / 100) * grams).toFixed(2));
    })

    const calculateMacros = (e) => {
        if (e.target.value.length !== 0) {
            setGrams(Number(e.target.value));
        } else {
            setGrams(100);
        }
    }

    return (<>
        {Object.keys(food).length !== 0 && (<div className="w-full md:max-w-[400px] p-3 bg-orange-100 dark:bg-[#1A1A1A] rounded-lg shadow-md flex flex-col gap-1 ">
            <div>
                <img className="min-h-96 h-96 rounded-lg" width={400} height={400} src={food.img} alt={food.name} />
            </div>
            <h2 className="font-semibold text-xl">{food.name} ({calories} Kcal for {grams}G)</h2>
            <div className="flex flex-wrap ">
                <div className="w-1/2 py-3">
                    <p>Protein</p>
                    <p>{protein}g</p>
                </div>
                <div className="w-1/2 py-3">
                    <p>Fats</p>
                    <p>{fats}g</p>
                </div>
                <div className="w-1/2 py-3">
                    <p>Carbs</p>
                    <p>{carbs}g</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <input onChange={calculateMacros} max={1000} className="px-2 py-1 rounded-md" type="number" placeholder="Quantity in Gms" />
                <button onClick={handleTrack} className="px-2 py-1 bg-[#007654] text-xl font-bold dark:text-slate-50  rounded-lg dark:btn-success">Track This Food</button>
            </div>
        </div>)
        }
    </>
    )
}

export default Food