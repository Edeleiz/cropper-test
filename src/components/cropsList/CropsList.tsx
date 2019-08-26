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
                <span className="crops-title">Saved</span>
                {
                    this.props.cropsUrls.length > 0 ?
                    this.props.cropsUrls.map(cropUrl => 
                    <CropRenderer
                        key={cropUrl}    
                        imageUrl={cropUrl} 
                        onDeleteCallback={this.onCropDelete}/>
                    ) : <span className="no-crops-title">Nothing saved yet</span>
                }
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