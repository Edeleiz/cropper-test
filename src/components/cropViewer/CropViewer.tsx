import React from "react";

export class CropViewer extends React.PureComponent<ICropViewerProps> {
    constructor(props: ICropViewerProps, context: any) {
        super(props, context);
        
        this.onSaveClick = this.onSaveClick.bind(this);
    }


    public render(): React.ReactNode {
        return (
            <div className="crop-viewer">
                {this.props.newCropUrl && (
                    <div className="content">
                        <img alt="Crop" style={{ maxWidth: "100%" }} src={this.props.newCropUrl} />
                        <button className="save-button" onClick={this.onSaveClick}>
                            <span>Save</span>
                        </button>
                    </div>
                )}
            </div>
        );
    }
    
    private onSaveClick(): void {
        if (this.props.onSaveCallback) {
            this.props.onSaveCallback(this.props.newCropUrl);
        }
    }
}

interface ICropViewerProps {
    newCropUrl: string;
    onSaveCallback?: (cropUrl: string) => void;
}