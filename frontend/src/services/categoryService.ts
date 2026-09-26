export async function getCategories(): Promise<string[]> {
	const categoriesResponse = await fetch(`/api/categories`);

	if (!categoriesResponse.ok) {
		throw new Error("Error obteniendo las categorias");
	}

	const categoriesData: string[] = await categoriesResponse.json();

	return categoriesData;
}