import { FC} from "react";
import './FeaturesListStyles.scss'
import { TrashIcon } from "../../assets/icons";
import { FeaturesListProps } from "./FeaturesListProps";

export const FeaturesList: FC<FeaturesListProps> = props => {
    const {
        featuresList,
        onDelete
    } = props;

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id);
    }

    return (
        <div className="feature-list">
            {featuresList.map(feature => {
                return (
                <div key={feature.id} className="feature-list__item">
                    <div className="feature-list__item-descr">
                        <span className="feature-list__item-descr-title">
                            {feature.featureName}
                        </span>
                        <span className="feature-list__item-descr-description">
                            {feature.description}
                        </span>
                    </div>
                    <div className="feature-list__item-actions">
                        <TrashIcon width={16} height={16} onClick={() => {deleteHandler(feature.id)}}/>
                    </div>   
                </div>)
            })}
        </div>
    );
}