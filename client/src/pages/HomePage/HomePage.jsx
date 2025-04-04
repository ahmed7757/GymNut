import React from 'react';
import axios from '../../api/axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "../../contexts/User";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import { Autoplay } from 'swiper/modules';

const HomePage = () => {
    const loggedData = useContext(UserContext);
    const [tip, setTip] = useState("");
    const [foods, setFoods] = useState([]);
    const [data, setData] = useState({});
    const [progress, setProgress] = useState("daily");
    // console.log((Math.random()*100).toFixed())
    useEffect(() => {
        const fetchTip = async () => {
            try {
                const response = await axios.get("/user/randomTip", {
                    headers: {
                        Authorization: `Bearer ${loggedData.loggedUser}`,
                    },
                });
                setTip(response.data.randomTip.tip);
            } catch (err) {
                console.log(err);
            }
        };
        const feachFood = async () => {
            try {
                const response = await axios.get("/user/foods/page/1?limit=52", {
                    headers: {
                        Authorization: `Bearer ${loggedData.loggedUser}`,
                    },
                });
                // console.log(response.data.foods);
                setFoods(response.data.foods);
            } catch (err) {
                console.log(err);
            }
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get("/user/profile", {
                    headers: {
                        Authorization: `Bearer ${loggedData.loggedUser}`,
                    },
                });
                // console.log(response);
                setData(response.data.user);
                console.log(response.data.user);
                // setReset(false); // Reset the reset state after fetching the data
                // console.log(data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserData();
        feachFood();
        fetchTip(); // Fetch the data when reset is true
        const intervalId = setInterval(fetchTip, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className='container min-h-[130vh] lg:max-h-[150vh] md:max-h-[180vh] sm:max-h-[200vh] md:grid md:grid-cols-4 mx-auto px-8 sm:px10 md:px-8 lg:px-12 py-8 md:grid-rows-2 flex flex-col gap-6 items-center'>
            <aside className='md:col-span-1 md:row-span-1 md:row-start-1 flex flex-col gap-2 items-left w-full px-2 self-start'>
                <ul className="menu menu-horizontal rounded-md bg-base-200">
                    <button onClick={() => setProgress("daily")} className='font-bold text-lg border-r-2 border-neutral w-1/2'>Daily</button>
                    <button onClick={() => setProgress("weekly")} className='font-bold text-lg border-l-2 border-neutral w-1/2'>Weekly</button>
                </ul>
                <div>
                    <h1>target weight progress</h1>
                    <div className='flex items-center gap-3'>
                        <p>{data.weight} kg</p>
                        <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                        <p>{data.weight} kg</p>
                    </div>
                </div>
                {
                    progress === "daily" ? (

                        <div className='flex flex-col gap-2 items-left w-full'>
                            <div>
                                <h1>daily calory progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <h1>daily protean progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <h1>daily Carbohydrates progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <h1>daily fats progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-2 items-left w-full'>
                            <div>
                                <h1>weekly calory progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <h1>weekly protean progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <h1>weekly Carbohydrates progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                            <div>
                                <h1>weekly fats progress</h1>
                                <div className='flex items-center gap-3'>
                                    <p>{data.weight} kg</p>
                                    <progress className="progress min-w-40 md:max-w-52 max-w-80" value={10} max="100"></progress>
                                    <p>{data.weight} kg</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </aside>
            <div className='md:row-span-1 md:row-start-1 md:col-span-3 flex w-full h-full items-start justify-end'>
                <div className='randomTip  w-full px-10 py-5 rounded-md shadow-md bg-gradient-to-b from-[#398650] to-green-900'>
                    <h1 className='text-5xl font-bold text-white'>Tip of the day</h1>
                    <p className='text-2xl p-5 text-neutral-100'>"{tip}"</p>
                </div>
            </div>
            <div className="swiper md:row-span-1 md:row-start-2 md:col-span-4 w-full text-center flex flex-col items-center">
                <h1 className='text-4xl font-bold text-neutral '>SOME FOODS NUTRITIONS</h1>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1}
                    // onSlideChange={() => console.log('slide change')}
                    // onSwiper={(swiper) => console.log(swiper)}
                    className="w-full"
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false
                    }}
                >
                    {
                        foods.map((food) => {
                            return (
                                <SwiperSlide className='p-10 object-fit h-full flex justify-center' key={food._id}>
                                    <div className='card flex max-w-[300px] h-[530px] flex-col shadow-lg bg-orange-100 dark:bg-[#1A1A1A]'>
                                        <img className='h-[300px] rounded-t-2xl bg-white' width={300} height={300} src={food.img} alt={food.name} />
                                        <div className='flex flex-col gap-4 items-start p-5'>
                                            <h2 className='card-title'>{food.name} for 100G</h2>
                                            <div className="grid grid-cols-2 gap-4 w-full pr-4">
                                                <div className="col-span-1 flex flex-col items-start">
                                                    <p>Protein</p>
                                                    <p>{food.protein}g</p>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-end">
                                                    <p>calories</p>
                                                    <p>{food.calories}Kcal</p>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-start">
                                                    <p>Fats</p>
                                                    <p>{food.fats}g</p>
                                                </div>
                                                <div className="col-span-1 flex flex-col items-end">
                                                    <p>Carbs</p>
                                                    <p>{food.carbs}g</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default HomePage;
