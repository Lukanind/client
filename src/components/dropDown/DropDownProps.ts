import { LabelWeight } from "../../types/commonTypes";

export interface DropDownItem {
    text: string;
    value: string;
}

export interface DropDownProps {
    items: Array<DropDownItem>;
    label?: string;
    lblWeight?: LabelWeight;
}