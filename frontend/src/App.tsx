import { useEffect, useState } from "react";
import SupplyList from "./components/SupplyList";
import SupplyFilters from "./components/SupplyFilters";
import EditSupplyModal from "./components/EditSupplyModal";
import CreateSupplyModal from "./components/CreateSupplyModal";
import Toast from "./components/Toast";
import { getCategories } from "./services/categoryService";
import { getSupplies, createNewSupply } from "./services/supplyService";
import { updateSupplyAmount, updateSupply } from "./services/updateSupply";
import type { CreateSupply, Supply } from "./types/supply";

function App() {
	const [supplies, setSupplies] = useState<Supply[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [category, setCategory] = useState("");
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editingSupply, setEditingSupply] = useState<Supply | null>(null);
	const [createSupply, setCreateSupply] = useState(false);

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const [suppliesData, categoriesData] = await Promise.all([
					getSupplies(),
					getCategories()
				]);

				setSupplies(suppliesData);
				setCategories(categoriesData);
			} catch (error) {
				setError(
					error instanceof Error
						? error.message
						: "Ocurrió un error inesperado"
				);
			} finally {
				setIsLoading(false);
			}
		};

		loadInitialData();
	}, []);

	const updateSupplyInState = (updatedSupply: Supply) => {
		setSupplies((currentSupplies) =>
			currentSupplies.map((supply) =>
				supply.id === updatedSupply.id
					? updatedSupply
					: supply
			)
		);
	};

	const onIncrease = async (id: number, amount: number) => {
		try {
			const updatedSupply = await updateSupplyAmount(id, amount + 1);
			updateSupplyInState(updatedSupply);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "No se pudo actualizar el stock"
			);
		}
	};

	const onDecrease = async (id: number, amount: number) => {
		try {
			const newAmount = Math.max(0, amount - 1);

			const updatedSupply = await updateSupplyAmount(id, newAmount);
			updateSupplyInState(updatedSupply);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "No se pudo actualizar el stock"
			);
		}
	};

	const saveNewSupply = async (supply: CreateSupply, image: File | null) => {
		try {
			const newSupply = await createNewSupply(supply, image);

			setSupplies([...supplies, newSupply])
			setCreateSupply(false);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "No se pudo crear el insumo"
			);
		}
	};

	const onSaveSupply = async (supply: Supply, image: File | null) => {
		try {
			const updatedSupply = await updateSupply(supply, image);

			updateSupplyInState(updatedSupply);
			setEditingSupply(null);
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "No se pudo actualizar el insumo"
			);
		}
	};

	const normalizedSearch = search.toLowerCase();

	const filteredSupplies = supplies.filter((supply) => {
		const matchesName = supply.name
			.toLowerCase()
			.includes(normalizedSearch);

		const matchesCategory =
			category === "" || supply.mainCategory === category;

		return matchesName && matchesCategory;
	});

	if (isLoading) {
		return <p>Cargando insumos...</p>;
	}

	return (
		<div className="container">
			<h1>Stock Manager</h1>

			{error !== null && (
				<Toast
					message={error}
					onClose={() => setError(null)}
				/>
			)}

			<SupplyFilters
				search={search}
				category={category}
				categories={categories}
				onSearchChange={setSearch}
				onCategoryChange={setCategory}
			/>

			{filteredSupplies.length === 0 ? (
				<p>No se encontraron insumos.</p>
			) : (
				<SupplyList
					supplies={filteredSupplies}
					onDecrease={onDecrease}
					onIncrease={onIncrease}
					editSupply={setEditingSupply}
				/>
			)}

			{editingSupply !== null && (
				<EditSupplyModal
					onClose={() => setEditingSupply(null)}
					onSave={onSaveSupply}
					supply={editingSupply}
				/>
			)}

			{createSupply !== false && (
				<CreateSupplyModal
					onClose={() => setCreateSupply(false)}
					onSave={saveNewSupply}
				/>
			)}

			<div className="newSupply">

				<button className="newSupplyBtn" onClick={() => setCreateSupply(true)}>+</button>

			</div>
		</div>
	);
}

export default App;
