const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");
const authenticateToken = require("../middleware/authenticateToken");
const { check } = require("express-validator");
const { registerAuthentication } = require("../middleware/registerAuthentication");
const { uploadImage } = require("../middleware/multerConfig");
const imageToAVIF = require("../middleware/imageToAVIF");

router.get(
    "/getUserId",
    bodyParser.json(),
    authenticateToken,
    userController.getUserId
)

router.get(
    "/profile",
    bodyParser.json(),
    authenticateToken,
    userController.getProfile
);

router.patch(
    "/updateProfile",
    bodyParser.json(),
    authenticateToken,
    uploadImage.single("profilePicture"),
    imageToAVIF,
    userController.updateProfile
);

router.get(
    "/plans",
    bodyParser.json(),
    authenticateToken,
    userController.getPlans
);

router.get(
    "/plan",
    bodyParser.json(),
    authenticateToken,
    userController.getPlan
)

router.post(
    "/plan",
    bodyParser.json(),
    authenticateToken,
    userController.setPlan
)

router.delete(
    "/plan",
    bodyParser.json(),
    authenticateToken,
    userController.deletePlan
)

router.get(
    "/foods/page/:pageNum",
    bodyParser.json(),
    authenticateToken,
    userController.getAllFoods
)

router.get(
    "/food/:foodName",
    bodyParser.json(),
    authenticateToken,
    userController.getFood
)
router.get(
    "/foodById/:foodId",
    bodyParser.json(),
    authenticateToken,
    userController.getFoodById
)

router.get(
    "/calculateBMI",
    bodyParser.json(),
    authenticateToken,
    userController.calculateBMI
)

router.post(
    "/plans/createplan",
    bodyParser.json(),
    authenticateToken,
    userController.createPlan
)

router.get(
    "/trackedFood",
    bodyParser.json(),
    authenticateToken,
    userController.getTrackedFoodById
)

router.post(
    "/trackedFood",
    bodyParser.json(),
    authenticateToken,
    userController.setTrackedFood
)

router.get(
    "/randomTip",
    bodyParser.json(),
    authenticateToken,
    userController.randomTip
)

router.post(
    "/aiPlan",
    bodyParser.json(),
    authenticateToken,
    userController.addAIGeneratedPlan
)

module.exports = router;