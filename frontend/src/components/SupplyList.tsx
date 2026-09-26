import type { Supply } from "../types/supply";
import SupplyCard from "./SupplyCard";

interface SupplyListProps {
	supplies: Supply[];
	onIncrease: (id: number, amount: number) => void;
	onDecrease: (id: number, amount: number) => void;
	editSupply: (supply: Supply) => void;
}

function SupplyList({ supplies, onIncrease, onDecrease, editSupply }: SupplyListProps) {
	
	return (
		<div className="supply-list">
			{/* Como el componente espera un solo supply, puedo iterarlo usando map para obtener todos en el front */}
			{ supplies.map((supply) => ( <SupplyCard key={supply.id} supply={supply} onDecrease={onDecrease} onIncrease={onIncrease} editSupply={editSupply} /> )) }
		</div>
	);
}

export default SupplyList;