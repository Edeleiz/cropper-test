import React from "react";

export class CropRenderer extends React.PureComponent<ICropRendererProps> {
    constructor(props: ICropRendererProps, context: any) {
        super(props, context);
        
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }


    public render(): React.ReactNode {
        return (
            <div className="crop-renderer">
                <img className="saved-crop-image" alt="Saved crop" src={this.props.imageUrl} />
                <button onClick={this.onDeleteClick}>
                    <span>Delete</span>
                </button>
            </div>
        );
    }
    
    private onDeleteClick(): void {
        if (this.props.onDeleteCallback) {
            this.props.onDeleteCallback(this.props.imageUrl);
        }
    }
}

interface ICropRendererProps {
    imageUrl: string;
    onDeleteCallback?: (imageUrl: string) => void;
}