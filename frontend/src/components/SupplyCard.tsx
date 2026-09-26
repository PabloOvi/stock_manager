import type { Supply } from "../types/supply";
import { useState } from 'react';

interface SupplyCardProps {
	supply: Supply;
	onIncrease: (id: number, amount: number) => void;
	onDecrease: (id: number, amount: number) => void;
	editSupply: (supply: Supply) => void;
}

function SupplyCard({ supply, onIncrease, onDecrease, editSupply }: SupplyCardProps) {

	const [imageError, setImageError] = useState(false);

	return (
		<div className="supply-card">

			<div className="supply-card-image">
			
				<button className="supply-card-edit" onClick={() => editSupply( supply )}>
					✏️
			
				</button>
				<div>{!imageError ? (
    <img
        src={`/uploads/supplies/${supply.name.trim().toLowerCase().replace(/ /g, "")}-${supply.brand.trim().toLowerCase().replace(/ /g, "")}.png`}
        alt={supply.name}
		onError={() => setImageError(true)}
    />
) : (
    <p>Sin imagen</p>
)}</div>
			
			</div>

			<div className="supply-card-info">
			
				<h2>{supply.name}</h2>
				<p>Marca: {supply.brand}</p>
				<p>Categoría: {supply.mainCategory}</p>
				<p>{supply.dateToExpire}</p>
			
			</div>

			<div className="supply-card-amount">
			
				
				<button onClick={() => onIncrease(supply.id, supply.amount)}>+</button>
				<p>Cantidad: {supply.amount}</p>
				<button onClick={() => onDecrease(supply.id, supply.amount)}>-</button>
			
			</div>

		</div>

	);
}

export default SupplyCard;