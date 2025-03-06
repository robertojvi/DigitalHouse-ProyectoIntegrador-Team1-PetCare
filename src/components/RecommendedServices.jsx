import "react";
import { TitleComponent } from "./shared/TitleComponent";
import { GridComponent } from "./GridComponent";

export const RecommendedServices = ({ services }) => {
	return (
		<div>
			<TitleComponent title={"Recomendados"} />
			<GridComponent services={services} />
		</div>
	);
};
