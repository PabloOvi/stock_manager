import type { CreateSupply, Supply } from "../types/supply";

export async function getSupplies(): Promise<Supply[]> {
	const suppliesResponse = await fetch(`/api/supplies/`);

	if (!suppliesResponse.ok) {
		throw new Error("Error obteniendo los insumos");
	}

	const suppliesData: Supply[] = await suppliesResponse.json();

	return suppliesData;
}

export async function createNewSupply(supply: CreateSupply, image: File | null): Promise<Supply>
{
	const formData = new FormData();

	// Al tener una imagen no la puedo pasar simplemente por body asiq lo paso por aca.
	formData.append("name", supply.name);
	formData.append("brand", supply.brand);
	formData.append("mainCategory", supply.mainCategory);
	formData.append("amount", String(supply.amount));
	formData.append("dateToExpire", supply.dateToExpire);

	if (image !== null) {
		formData.append("image", image);
	}

	const suppliesResponse = await fetch(`/api/createSupply/`, {
		method: "POST",
		body: formData
	});

	if (!suppliesResponse.ok) {
		throw new Error("Error actualizando el insumo");
	}

	const supplyData: Supply = await suppliesResponse.json();

	return supplyData;
}