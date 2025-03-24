import { Feature } from "../../types/models";

export interface FeaturesListProps {
    featuresList: Array<Feature>;
    onDelete?: (id: number) => void;
}