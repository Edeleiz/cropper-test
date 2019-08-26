import React from "react";
import ReactCrop, {Crop, PercentCrop} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export class ImageCropper extends React.PureComponent<IImageCropperProps, IImageCropperState> {
    private _imageRef: HTMLImageElement | undefined;
    private _savedCropUrl: string = '';

    constructor(props: IImageCropperProps, context: any) {
        super(props, context);
        
        this.onCropComplete = this.onCropComplete.bind(this);
        this.onCropChange = this.onCropChange.bind(this);
        this.onImageLoaded = this.onImageLoaded.bind(this);
        
        this.state = {crop: {
                unit: "%",
                width: 30,
                aspect: 16 / 9
            }};
    }


    public render(): React.ReactNode {
        return (
            <div className="image-cropper">
                <ReactCrop
                    src={this.props.sourceImageUrl}
                    crop={this.state.crop}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                />
            </div>
        );
    }

    private onCropChange(crop: Crop, percentCrop: PercentCrop): void {
        this.setState({ crop });
    }

    private onCropComplete(crop: Crop, percentCrop: PercentCrop): void {
        if (this.props.onCropChange && this._imageRef) {
            this.props.onCropChange(this._imageRef, crop);
        }
    }

    private onImageLoaded(target: HTMLImageElement): void {
        if (target) {
            this._imageRef = target;
        }
    }
}

interface IImageCropperProps {
    sourceImageUrl: string;
    onCropChange?: (imageRef: HTMLImageElement, cropRegion: Crop) => void;
}

interface IImageCropperState {
    crop: Crop;
}