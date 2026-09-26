import type { Supply } from "../types/supply";

export async function updateSupplyAmount(id: number, amount: number): Promise<Supply>
{
	const suppliesResponse = await fetch(`/api/updateAmount/${id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			amount: amount
		})
	});

	if (!suppliesResponse.ok) {
		throw new Error("Error actualizando el insumo");
	}

	const supplyData: Supply = await suppliesResponse.json();

	return supplyData;
}

export async function updateSupply(supply: Supply, image: File | null): Promise<Supply>
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

	const suppliesResponse = await fetch(`/api/updateSupply/${supply.id}`, {
		method: "PATCH",
		body: formData
	});

	if (!suppliesResponse.ok) {
		throw new Error("Error actualizando el insumo");
	}

	const supplyData: Supply = await suppliesResponse.json();

	return supplyData;
}