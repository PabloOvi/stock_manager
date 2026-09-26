import pool from "../config/database.js";
import type { RowDataPacket } from "mysql2";
import type { ResultSetHeader } from "mysql2";
import type { Supply, CreateSupply } from "../types/supply.js";

interface SupplyRow extends RowDataPacket {
	id: number;
	name: string;
	brand: string;
	main_category: string;
	subcategories: string | null;
	amount: number;
	date_to_expire: string;
	status: number;
}

interface CategoryRow extends RowDataPacket {
	main_category: string;
}

function mapSupply(row: SupplyRow): Supply {
return {
	id: row.id,
	name: row.name,
	brand: row.brand,
	mainCategory: row.main_category,
	subcategories: row.subcategories
	? JSON.parse(row.subcategories)
	: [],
	amount: row.amount,
	dateToExpire: new Date(row.date_to_expire).toISOString().split("T")[0]!,
	status: Boolean(row.status),
};
}

export async function getAllSupplies(): Promise<Supply[]> {
const [rows] = await pool.query<SupplyRow[]>(
	"SELECT id,name,brand,main_category,subcategories,amount,date_to_expire,status FROM supplies WHERE status = 1 AND amount > 0 AND date_to_expire > CURRENT_DATE()"
);

return rows.map(mapSupply);
}

export async function getSupplyById( id: number ): Promise<Supply | null> {
const [rows] = await pool.query<SupplyRow[]>(
	"SELECT id,name,brand,main_category,subcategories,amount,DATE(date_to_expire),status FROM supplies WHERE id= ?",
	[id]
);

if( rows.length === 0 ) return null;

return mapSupply( rows[0]! );
}

export async function createSupply( supply: CreateSupply ): Promise<Supply>
{
	const [result] = await pool.query<ResultSetHeader>
	(
		"INSERT INTO supplies (name, brand, main_category, amount, date_to_expire ) VALUES (?,?,?,?,?)",
		[supply.name, supply.brand,supply.mainCategory,supply.amount,supply.dateToExpire]
	);

	let id = result.insertId;

	const [row] = await pool.query<SupplyRow[]>
	(
		"SELECT id,name,brand,main_category,subcategories,amount,date_to_expire,status FROM supplies WHERE id= ?",
		[id]
	);

	return mapSupply( row[0]! );
}

export async function getCategories(): Promise<string[]> {
	const [rows] = await pool.query<CategoryRow[]>(
		"SELECT DISTINCT main_category FROM supplies"
	);

	return rows.map( (row) => (row.main_category));
}

export async function updateAmount( id: Number, amount: Number ): Promise<Supply>
{
	const [result] = await pool.query<ResultSetHeader>
	(
		"UPDATE supplies SET amount=? WHERE id=? LIMIT 1",
		[amount, id]
	);

	const [row] = await pool.query<SupplyRow[]>
	(
		"SELECT id,name,brand,main_category,subcategories,amount,date_to_expire,status FROM supplies WHERE id= ?",
		[id]
	);

	return mapSupply( row[0]! );
}

export async function updateSupply( supply: CreateSupply, id: number ): Promise<Supply>
{
	let query = `
		UPDATE supplies
		SET
			name = ?,
			brand = ?,
			main_category = ?,
			amount = ?,
			date_to_expire = ?
	`;

	const params: (string | number)[] = [
		supply.name,
		supply.brand,
		supply.mainCategory,
		supply.amount,
		supply.dateToExpire
	];

	query += ` WHERE id = ? LIMIT 1`;

	params.push(id);

	await pool.query(query, params);

	const [row] = await pool.query<SupplyRow[]>
	(
		"SELECT id,name,brand,main_category,subcategories,amount,date_to_expire,status FROM supplies WHERE id= ?",
		[id]
	);

	return mapSupply( row[0]! );
}

