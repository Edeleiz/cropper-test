import React from "react";
import {CropRenderer} from "./CropRenderer";

export class CropsList extends React.PureComponent<ICropsList> {
    constructor(props: ICropsList, context: any) {
        super(props, context);
        
        this.onCropDelete = this.onCropDelete.bind(this);
    }


    public render(): React.ReactNode {
        if (!this.props.cropsUrls)
            return undefined;
        return (
            <div className="crops-list">
                {this.props.cropsUrls.map(cropUrl => 
                    <CropRenderer 
                        imageUrl={cropUrl} 
                        onDeleteCallback={this.onCropDelete}/>
                )}
            </div>
        );
    }
    
    private onCropDelete(cropUrl: string): void {
        if (this.props.onCropDeleteCallback) {
            this.props.onCropDeleteCallback(cropUrl);
        }
    }
}

interface ICropsList {
    cropsUrls?: string[];
    onCropDeleteCallback?: (cropUrl: string) => void;
}