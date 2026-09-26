import type { Supply } from "../types/supply";
import { useState, type ChangeEvent } from 'react';

interface EditSupplyModalProps {
	onClose: () => void;
	onSave: (supply: Supply, image: File | null) => void;
	supply: Supply;
}

function EditSupplyModal({ onClose,onSave, supply }: EditSupplyModalProps) {

	function validateForm(): string | null
	{
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

	function handleSave(): void
	{
		const validationError = validateForm();

		if (validationError !== null) {
			setError( validationError )
			return;
		}

		onSave(form, image);
	}

	const [form, setForm] = useState(supply);
	const [error, setError] = useState<string | null>(null);
	const [image, setImage] = useState<File | null>(null);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setForm((prev) => ({
			...prev,
			[name]: name === "amount" ? Number(value) : value,
		}));
	};

	function handleImageChange(event: ChangeEvent<HTMLInputElement>): void
	{
		const file = event.target.files?.[0] ?? null;

		setImage(file);
	}


	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>Editar insumo</h2>
				{ error != null ? <p>{error}</p> : '' }
				<input type="file" accept="image/*" onChange={handleImageChange} />
				{image && ( <img src={URL.createObjectURL(image)} alt="Vista previa"/>)}
				
				<label>
					Nombre
					<input
						type="text"
						value={form.name}
						name="name"
						onChange={handleChange}
					/>
				</label>

				<label>
					Marca
					<input
						type="text"
						value={form.brand}
						name="brand"
						onChange={handleChange}
					/>
				</label>

				<label>
					Categoría
					<input
						type="text"
						value={form.mainCategory}
						name="mainCategory"
						onChange={handleChange}
					/>
				</label>

				<label>
					Fecha de vencimiento
					<input
						type="date"
						value={form.dateToExpire}
						name="dateToExpire"
						onChange={handleChange}
					/>
				</label>

				<label>
					Cantidad
					<input
						type="number"
						value={form.amount}
						name="amount"
						onChange={handleChange}
					/>
				</label>



				<div className="modal-actions">

					<button onClick={onClose}>
						Cerrar
					</button>

					<button onClick={handleSave}>
						Guardar
					</button>

				</div>

			</div>
		</div>
	);
}

export default EditSupplyModal;