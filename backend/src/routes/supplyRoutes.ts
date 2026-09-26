import { Router } from "express";
import multer from "multer";
import path from "path";
import { getSupplies, getSupply, createSupplyController, getCategoriesController, updateAmountController, updateSupplyController } from "../controllers/supplyController.js";

const router = Router();
const storage = multer.diskStorage({
	destination: "uploads/supplies/",
	filename: (_req, file, callback) => {
		const extension = path.extname(file.originalname);
		const filename = `${_req.body.name.trim().toLowerCase().replace(/ /g, "")}-${_req.body.brand.trim().toLowerCase().replace(/ /g, "")}${extension}`;

		callback(null, filename);
	}
});

const upload = multer({
	storage,
	limits: {
		fileSize: 5 * 1024 * 1024
	},
	fileFilter: (_req, file, callback) => {
		if (file.mimetype.startsWith("image/")) {
			callback(null, true);
			return;
		}

		callback(new Error("El archivo debe ser una imagen"));
	}
});

router.get("/supplies", getSupplies);
router.get("/supply/:id", getSupply);
router.post("/createSupply", upload.single("image"), createSupplyController);
router.get("/categories", getCategoriesController);
router.patch("/updateAmount/:id", updateAmountController);
router.patch("/updateSupply/:id", upload.single("image"), updateSupplyController);

export default router;
