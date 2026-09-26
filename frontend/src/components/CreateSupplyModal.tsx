import type { CreateSupply } from "../types/supply";
import { useState, type ChangeEvent } from "react";

interface CreateSupplyModalProps {
	onClose: () => void;
	onSave: (supply: CreateSupply, image: File | null) => void;
}

function CreateSupplyModal({ onClose, onSave }: CreateSupplyModalProps) {
	const [form, setForm] = useState<CreateSupply>({
		name: "",
		brand: "",
		mainCategory: "",
		amount: 0,
		dateToExpire: "",
	});

	const [error, setError] = useState<string | null>(null);
	const [image, setImage] = useState<File | null>(null);

	function validateForm(): string | null {
		if (form.name.trim() === "") {
			return "El nombre es obligatorio";
		}

		if (form.brand.trim() === "") {
			return "La marca es obligatoria";
		}

		if (form.mainCategory.trim() === "") {
			return "La categoría es obligatoria";
		}

		if (!Number.isInteger(form.amount) || form.amount < 0) {
			return "La cantidad debe ser un número entero mayor o igual a 0";
		}

		if (form.dateToExpire === "") {
			return "La fecha de vencimiento es obligatoria";
		}

		return null;
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;

		setForm((prev) => ({
			...prev,
			[name]: name === "amount" ? Number(value) : value,
		}));

		setError(null);
	}

	function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0] ?? null;
		setImage(file);
	}

	function handleSave() {
		const validationError = validateForm();

		if (validationError !== null) {
			setError(validationError);
			return;
		}

		onSave(form, image);
	}

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>Crear insumo</h2>

				{error && <p>{error}</p>}

				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
				/>

				{image && (
					<img
						src={URL.createObjectURL(image)}
						alt="Vista previa"
					/>
				)}

				<label>
					Nombre
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
					/>
				</label>

				<label>
					Marca
					<input
						type="text"
						name="brand"
						value={form.brand}
						onChange={handleChange}
					/>
				</label>

				<label>
					Categoría
					<input
						type="text"
						name="mainCategory"
						value={form.mainCategory}
						onChange={handleChange}
					/>
				</label>

				<label>
					Fecha de vencimiento
					<input
						type="date"
						name="dateToExpire"
						value={form.dateToExpire}
						onChange={handleChange}
					/>
				</label>

				<label>
					Cantidad
					<input
						type="number"
						name="amount"
						value={form.amount}
						onChange={handleChange}
					/>
				</label>

				<div className="modal-actions">
					<button onClick={onClose}>
						Cerrar
					</button>

					<button onClick={handleSave}>
						Crear
					</button>
				</div>
			</div>
		</div>
	);
}

export default CreateSupplyModal;
