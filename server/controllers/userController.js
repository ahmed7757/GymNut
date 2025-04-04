const User = require("../models/user");
const Food = require("../models/food");
const Plan = require("../models/plan");
const Tips = require("../models/tips");
const fs = require("fs");
const { handleServerError } = require("../utils/errorHandler");

const getUserId = async (req, res, next) => {
    const userName = req.query.userName
    const email = req.query.email
    const user = await User.findOne({ $or: [{ email }, { userName }] });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "User ID Retrived successfully",
        userId: user._id,
    });

}
// function decodeToken(token){
//     if(jwt.verify(token, process.env.JWT_SECRET)){
//         let decoded = jwt.decode(token)
//         return decoded._id
//     }
//     else{
//         console.log("Token is invalid")
//     }
// }

const getProfile = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    // let userId = decodeToken(token);
    //userId = userId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.profilePicture = `http://localhost:5000/uploads/${user.profilePicture}`;
    res.json({
        message: "User profile Retrived successfully",
        user,
    });
});



const updateProfile = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    //userId = userId.replace(/^"|"$/g, '');
    const newProfile = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    if (req.file?.filename) {
        try {
            fs.unlink(`uploads/${user.profilePicture}`, (err) => {
                if (err) {
                    console.log(err)
                    return
                }
            })
        } catch (error) {
            // console.log(error)
        }
    }
    if (newProfile.userName !== user.userName) {
        let uname = await User.findOne({ userName: newProfile.userName });
        if (uname) {
            return res.status(400).json({ message: "userName already exists", code: 4002 });
        }
    }
    else if (newProfile.email !== user.email) {
        let uemail = await User.findOne({ email: newProfile.email });
        if (uemail) {
            return res.status(400).json({ message: "Email already exists", code: 4003 });
        }
    }
    user.userName = newProfile.userName || user.userName;
    user.email = newProfile.email || user.email;
    user.gender = newProfile.gender || user.gender;
    user.age = newProfile.age || user.age;
    user.weight = newProfile.weight || user.weight;
    user.height = newProfile.height || user.height;
    user.bio = newProfile.bio || user.bio;
    user.profilePicture = req.file?.filename || user.profilePicture;
    user.disease = newProfile.disease || user.disease;
    user.phoneNum = newProfile.phoneNum || user.phoneNum;


    await user.save();
    res.json({
        message: "Profile updated successfully",
        // user,
    });
});

const getPlans = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const user = await User.findById(userId).populate("listOfPlans");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "Plans Retrieved successfully",
        plans: user.listOfPlans,
    });
});

const getPlan = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const user = await User.findById(userId);
    let planId = req.query.planId;
    planId = planId.replace(/^"|"$/g, '');
    const plan = await Plan.findById(planId);
    if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({
        message: "Plan Retrieved successfully",
        plan,
    });
});

const setPlan = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    //userId = userId.replace(/^"|"$/g, '');
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const { totalCalories, totalWeight, listOfTotalNutrients, listOfFoods } = req.body;

    const plan = new Plan({
        totalCalories,
        totalWeight,
        listOfTotalNutrients,
        listOfFoods
    });

    await plan.save();
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.listOfPlans.push(plan._id);
    await user.save();

    res.json({
        message: "Plan created and saved successfully",
        plan
    });
});

const getRandomPlans = handleServerError(async (req, res, next) => {
    const plans = await Plan.aggregate([{ $sample: { size: 3 } }]);
    res.json({
        message: "Random plans retrived successfully",
        plans,
    });

});

const deletePlan = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    let planId = req.body.planId;
    //userId = userId.replace(/^"|"$/g, '');
    planId = planId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const planIndex = user.listOfPlans.indexOf(planId);
    if (planIndex === -1) {
        return res.status(404).json({ message: "Plan not found" });
    }
    user.listOfPlans.splice(planIndex, 1);
    await user.save();
    await Plan.findByIdAndDelete(planId);
    res.json({
        message: "Plan deleted successfully",
    });
});

const getAllFoods = handleServerError(async (req, res) => {
    let pageNum = parseInt(req.params.pageNum);
    let limit = req.query.limit && !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
    let skip = (pageNum * limit) - limit;

    if (!req.currentUser) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    if (isNaN(pageNum)) {
        return res.status(400).json({ message: "Invalid page number" });
    }
    // console.log(parseInt(req.params.pageNum));
    const foods = await Food.find().skip(skip).limit(limit);
    // console.log(req.currentUser)
    res.json({
        message: "Foods retrieved successfully",
        foods,
    });
});

const getFood = handleServerError(async (req, res, next) => {
    //   Check if the current user is authorized
    if (!req.currentUser) {
        return res.status(403).json({ message: "Unauthorized user" });
    }

    // Extract and sanitize the food name from request parameters
    let foodName = req.params.foodName.replace(/^"|"$/g, '');

    // Check if the page number is valid
    let pageNum = parseInt(req.query.page);
    if (isNaN(pageNum) || pageNum <= 0) {
        return res.status(400).json({ message: "Invalid page number" });
    }

    // Set the limit and calculate the skip value
    let limit = req.query.limit && !isNaN(parseInt(req.query.limit)) ? parseInt(req.query.limit) : 10;
    let skip = (pageNum - 1) * limit;

    // Find food matching the name using case-insensitive regex
    const food = await Food.find({ name: new RegExp(`^${foodName}`, 'i') }).skip(skip).limit(limit);

    // Check if any food items were found
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }

    // Return the found food items
    res.json({
        message: "Food retrieved successfully",
        food,
    });
});
const getFoodById = handleServerError(async (req, res, next) => {
    // Check if the current user is authorized
    if (!req.currentUser) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    // Extract and sanitize the food name from request parameters
    let foodId = req.params.foodId.replace(/^"|"$/g, '');


    // Find food matching the name using case-insensitive regex
    const food = await Food.findById(foodId);

    // Check if any food items were found
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }

    // Return the found food items
    res.json({
        message: "Food retrieved successfully",
        food,
    });
});


const calculateBMI = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const weight = user.weight; // Weight should be in kilograms (kg)
    const height = user.height; // Height should be in centimeters (cm)

    // Convert height from centimeters to meters for BMI calculation
    const heightInMeters = height / 100;

    // Calculate BMI
    const BMI = weight / (heightInMeters * heightInMeters);

    res.json({
        message: "BMI calculated successfully",
        BMI,
    });
});

const createPlan = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const weight = user.weight;
    const height = user.height;
    const age = user.age;
    const gender = user.gender;

    const { activity, goal, targetWeight, duration, dietType } = req.body;

    // Error handling for missing fields
    if (!activity || !goal || !targetWeight || !duration || !dietType) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Calculate Basal Metabolic Rate (BMR)
    let BMR;
    if (gender === 'male') {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // // Handle activity factor
    // const activityFactors = {
    //     sedentary: 1.2,
    //     light: 1.375,
    //     moderate: 1.55,
    //     active: 1.725,
    //     veryActive: 1.9
    // };

    // if (!activityFactors[activity]) {
    //     return res.status(400).json({ message: "Invalid activity level" });
    // }

    const maintenanceCalories = BMR * Number(activity);

    // Calculate target kg per week based on the goal
    let targetKgPerWeek;
    if (goal === 'maintain') {
        targetKgPerWeek = 0;
    } else {
        targetKgPerWeek = (Number(targetWeight) - weight) / Number(duration);
    }

    const caloriesPerKg = 7700;  // 1 kg = 7700 calories
    const dailyCalorieChange = (targetKgPerWeek * caloriesPerKg) / 7;

    // Adjust the maintenance calories by the daily calorie change for the goal
    const targetCalories = maintenanceCalories + dailyCalorieChange;

    // Define diet options and their weekly calorie distributions or macros
    const diets = {
        zigzag: {
            sunday: Math.round(targetCalories),
            monday: Math.round(targetCalories * 0.95),
            tuesday: Math.round(targetCalories * 0.95),
            wednesday: Math.round(targetCalories * 0.95),
            thursday: Math.round(targetCalories * 0.95),
            friday: Math.round(targetCalories * 0.95),
            saturday: Math.round(targetCalories)
        },
        intermittentFasting: {
            fastingDays: Math.round(targetCalories * 0.8),
            nonFastingDays: Math.round(targetCalories)
        },
        ketogenic: {
            carbs: Math.round(targetCalories * 0.05),  // 5% carbs
            protein: Math.round(targetCalories * 0.2),  // 20% protein
            fat: Math.round(targetCalories * 0.75)      // 75% fats
        },
        highProtein: {
            protein: Math.round(targetCalories * 0.35),  // 35% protein
            carbs: Math.round(targetCalories * 0.4),     // 40% carbs
            fats: Math.round(targetCalories * 0.25)      // 25% fats
        },
        mediterranean: {
            carbs: Math.round(targetCalories * 0.5),     // 50% carbs
            protein: Math.round(targetCalories * 0.2),   // 20% protein
            fats: Math.round(targetCalories * 0.3)       // 30% fats
        },
        paleo: {
            protein: Math.round(targetCalories * 0.4),   // 40% protein
            fats: Math.round(targetCalories * 0.3),      // 30% fats
            carbs: Math.round(targetCalories * 0.3)      // 30% carbs (from fruits/vegetables)
        },
        caloricCycling: {
            highCalorieDays: Math.round(targetCalories * 1.1),  // 10% above maintenance
            lowCalorieDays: Math.round(targetCalories * 0.9)    // 10% below maintenance
        }
    };

    // Check if the provided dietType is valid
    const selectedDiet = diets[dietType];
    if (!selectedDiet) {
        return res.status(400).json({ message: "Invalid diet type" });
    }

    res.json({
        message: "Calories calculated successfully",
        data: {
            maintainWeight: Math.round(maintenanceCalories),
            targetCalories: Math.round(targetCalories),  // For the specified weight change
            dailyCalorieChange: Math.round(dailyCalorieChange),
            diet: selectedDiet
        }
    });
});

const getTrackedFoodById = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const user = await User.findById(userId);
    let foodId = req.query.foodId;
    //foodId = foodId.replace(/^"|"$/g, '');
    const food = await Food.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    ListOfTrackedFoods = user.listOfTrackedFoods;
    let foodIndex = -1;
    for (let i = 0; i < ListOfTrackedFoods.length; i++) {
        if (ListOfTrackedFoods[i][0] == foodId) {
            foodIndex = i;
            break;
        }
    }
    if (foodIndex == -1) {
        return res.status(404).json({ message: "Food not found" });
    }
    res.json({
        message: "Food Retrieved successfully",
        food: ListOfTrackedFoods[foodIndex],
    });
});


const setTrackedFood = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    let foodId = req.body.foodId;
    let quantity = req.body.quantity;
    let datails = req.body.details;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    //foodId = foodId.replace(/^"|"$/g, '');
    const user = await User.findById(userId);
    const food = await Food.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.listOfTrackedFoods.push({
        foodId: foodId, // Ensure foodId is an ObjectId
        quantity: parseInt(quantity), // Parsed as an integer
        details: {
            calories: parseFloat(datails.calories),
            protein: parseFloat(datails.protein),
            fats: parseFloat(datails.fats),
            carbs: parseFloat(datails.carbs)
        },
        dateTracked: new Date() // Current date
    });
    // let foodIndex = -1;
    // for (let i = 0; i < user.listOfTrackedFoods.length; i++) {
    //     if (user.listOfTrackedFoods[i][0] == foodId) {
    //         foodIndex = i;
    //         break;
    //     }
    // }
    // if (foodIndex == -1) {
    //     user.listOfTrackedFoods.push([foodId, 1, new Date()]);
    // }
    // else {
    //     user.listOfTrackedFoods[foodIndex][1]+=req.body.quantity;
    // }
    await user.save();
    res.json({
        message: "Food added to tracked list successfully",
    });
});

const randomTip = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const tips = await Tips.find();
    // console.log(tips.length);
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    res.json({
        message: "Random tip generated successfully",
        randomTip,
    });
});

const addAIGeneratedPlan = handleServerError(async (req, res, next) => {
    let userId = req.currentUser?.user?.id;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized user" });
    }
    const user = await User.findById(userId);

    const details = req.body.details;

    const targetWeight = req.body.targetWeight;
    const duration = req.body.duration;
    const activityLevel = req.body.activityLevel;
    const goal = req.body.goal;
    const dailyCalory = req.body.dailyCalory;
    const dailyProtean = req.body.dailyProtean;
    const dailyCarbohydrates = req.body.dailyCarbohydrates;
    const dailyFats = req.body.dailyFats;


    user.listOfPlans.push({
        goals: {
            targetWeight: targetWeight,
            duration: duration,
            activityLevel: activityLevel,
            goal: goal,
            dailyCalory: dailyCalory,
            dailyProtean: dailyProtean,
            dailyCarbohydrates: dailyCarbohydrates,
            dailyFats: dailyFats
        },
        details: details,
    });

    user.save();
    res.json({
        message: "added to database successfully",
    });
});

module.exports = {
    getUserId,
    getProfile,
    updateProfile,
    getPlans,
    getPlan,
    setPlan,
    getRandomPlans,
    deletePlan,
    getAllFoods,
    getFood,
    calculateBMI,
    createPlan,
    getFoodById,
    getTrackedFoodById,
    setTrackedFood,
    randomTip,
    addAIGeneratedPlan
};