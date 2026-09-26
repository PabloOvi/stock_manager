interface SupplyFiltersProps {
	search: string;
	category: string;
	categories: string[];
	onSearchChange: (value: string) => void;
	onCategoryChange: (value: string) => void;
}

function SupplyFilters({ search, category, categories, onSearchChange, onCategoryChange }: SupplyFiltersProps) {
	return (
		<div className="supply-filters">

			<div className="search-wrapper">
				<span className="search-icon">⌕</span>

				<input
					type="text"
					placeholder="Buscar insumo..."
					value={search}
					onChange={(event) => onSearchChange(event.target.value)}
				/>
			</div>

			<select
				value={category}
				onChange={(event) => onCategoryChange(event.target.value)}
			>
				<option value="">Todas las categorías</option>

				{categories.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>

		</div>

	);
}

export default SupplyFilters;