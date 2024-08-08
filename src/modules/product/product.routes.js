import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./product.controller.js";
import { uploadMultipleFiles } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addProductValidation, deleteProductValidation, getProductByIdValidation, updateProductValidation } from "./product.validation.js";




export const productRouter=Router()

productRouter.use(protectedRoutes, allowedTo('admin'));


productRouter.post('/',uploadMultipleFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}]),validate(addProductValidation),addProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:id', validate(getProductByIdValidation),getProductById)
productRouter.put('/:id',uploadMultipleFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}]),validate(updateProductValidation),updateProduct)
productRouter.delete('/:id',validate(deleteProductValidation),deleteProduct)
