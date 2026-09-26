import type { Request, Response } from "express";
import { getAllSupplies, getSupplyById, createSupply, getCategories, updateAmount, updateSupply } from "../models/supplyModel.js";
import type { CreateSupply, Supply } from "../types/supply.js";

export async function getSupplies( _req: Request, res: Response ): Promise<void>
{
	try
	{
		const supplies = await getAllSupplies();

		res.json(supplies);
	}
	catch( error )
	{
			console.error( error );

			res.status(500).json({
			message: "Error obteniendo los productos",
			});
		}
	}

export async function getSupply(req: Request, res: Response): Promise <void>
{
	try
	{
		let id = Number( req.params.id );
		const supply = await getSupplyById( id );

		if( !supply )
		{
			res.status( 404 ).json({ message: "Producto no encontrado" });
			return;
		}
		res.json(supply);
	}
	catch (error)
	{
		console.error(error);

		res.status(500).json({ message: "Error obteniendo el producto", });
	}
}

export async function createSupplyController(req: Request, res: Response): Promise <void>
{
	console.log(req);


	let temp = req.body;
	temp.amount = Number(temp.amount);
	let valid = validateSupply( temp );
	
	if( !valid )
		{
			res.status(400).json({ message: "Datos de insumo invalidos", });
			return;
		}
	try
	{
		let supplyData : CreateSupply = temp;

		let supply = await createSupply( supplyData );

		res.status(201).json(supply);
	}
	catch (error)
	{
		console.error(error);

		res.status(500).json({ message: "Error actualizando el producto", });
	}
}

export async function getCategoriesController(req: Request, res: Response): Promise <void>
{
	try
	{
		let categories = await getCategories();

		res.status(201).json(categories);
	}
	catch (error)
	{
		console.error(error);

		res.status(500).json({ message: "Error obteniendo las categorias", });
	}
}

export async function updateAmountController(req: Request, res: Response): Promise <void>
{
	console.log(req.body);
	
	try
	{
		let id = Number( req.params.id );
		let amount = Number( req.body.amount) ;

		let supply = await updateAmount( id, amount );

		res.status(201).json(supply);
	}
	catch (error)
	{
		console.error(error);

		res.status(500).json({ message: "Error actualizando el producto", });
	}
}

export async function updateSupplyController(req: Request, res: Response): Promise <void>
{
	let temp = req.body;
	temp.amount = Number(temp.amount);
	let valid = validateSupply( temp );


	if( !valid )
		{
			res.status(400).json({ message: "Datos de insumo invalidos", });
			return;
		}
	try
	{
		let supplyData : Supply = temp;
		let id : number = Number(req.params.id);

		let supply = await updateSupply( supplyData, id );

		res.status(201).json(supply);
	}
	catch (error)
	{
		console.error(error);

		res.status(500).json({ message: "Error actualizando el producto", });
	}
}

function validateSupply( supply: CreateSupply): boolean
{
	if (
		typeof supply.name !== "string" || supply.name.trim() === "" ||
		typeof supply.brand !== "string" || supply.brand.trim() === "" ||
		typeof supply.mainCategory !== "string" || supply.mainCategory.trim() === "" ||
		!Number.isInteger(supply.amount) || supply.amount < 0 ||
		typeof supply.dateToExpire !== "string" || supply.dateToExpire === ""
	)
	{
		return false;
	}

	return true;
}