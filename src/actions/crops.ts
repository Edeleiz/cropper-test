import {action, ActionTypes} from "../constants/actions";
import {IAction, ICropActionPayload} from "../interfaces/actionInterfaces";
import ReactCrop, {Crop} from "react-image-crop";

export function saveCrop(cropUrl: string) {
    return action<ICropActionPayload>(ActionTypes.saveCrop, {cropUrl});
}

export function deleteCrop(cropUrl: string) {
    return action<ICropActionPayload>(ActionTypes.deleteCrop, {cropUrl});
}

export function changeCrop(cropUrl: string) {
    return action<ICropActionPayload>(ActionTypes.changeCrop, {cropUrl});
}

export function asyncUpdateCropPreview(imageRef: HTMLImageElement, crop: Crop) {
    return new Promise<IAction<ICropActionPayload>>(async (resolve) => {
        if (imageRef && crop.width && crop.height) {
            const cropUrl = await getCroppedImg(
                imageRef,
                crop,
                "newFile.jpeg"
            );
            resolve(changeCrop(cropUrl));
        }
    });
}

function getCroppedImg(image: HTMLImageElement, crop: ReactCrop.Crop, fileName: string): Promise<string> {
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
        resolve(canvas.toDataURL('image/jpeg'));
    });
}