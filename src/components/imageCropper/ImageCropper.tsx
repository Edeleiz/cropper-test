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
        this.makeClientCrop = this.makeClientCrop.bind(this);
        
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

    private async makeClientCrop(crop: Crop): Promise<void> {
        if (this._imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this._imageRef,
                crop,
                "newFile.jpeg"
            );
            if (this.props.onCropChange) {
                this.props.onCropChange(croppedImageUrl);
            }
        }
    }

    private getCroppedImg(image: HTMLImageElement, crop: ReactCrop.Crop, fileName: string): Promise<string> {
        const {y = 0, height = 0, width = 0, x = 0} = crop;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = width ? width : 0;
        canvas.height = height ? height : 0;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return Promise.resolve('');
        }
        
        ctx.drawImage(
            image,
            x * scaleX,
            y * scaleY,
            width * scaleX,
            height * scaleY,
            0,
            0,
            width,
            height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob: Blob | null) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                window.URL.revokeObjectURL(this._savedCropUrl);
                this._savedCropUrl = window.URL.createObjectURL(blob);
                console.error(this._savedCropUrl);
                resolve(this._savedCropUrl);
            }, "image/jpeg");
        });
    }

    private onCropChange(crop: Crop, percentCrop: PercentCrop): void {
        this.setState({ crop });
    }

    private onCropComplete(crop: Crop, percentCrop: PercentCrop): void {
        this.makeClientCrop(crop);
    }

    private onImageLoaded(target: HTMLImageElement): void {
        if (target) {
            this._imageRef = target;
        }
    }
}

interface IImageCropperProps {
    sourceImageUrl: string;
    onCropChange?: (imageUrl: string) => void;
}

interface IImageCropperState {
    crop: Crop;
}