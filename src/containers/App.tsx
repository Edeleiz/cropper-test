import React, {useContext} from 'react';
import './App.scss';
import {ImageCropper} from "../components/imageCropper/ImageCropper";
import {CropViewer} from "../components/cropViewer/CropViewer";
import {CropsList} from "../components/cropsList/CropsList";
import {IStore, Store} from "../store";
import {deleteCrop, saveCrop, asyncUpdateCropPreview} from "../actions/crops";
import {Crop} from "react-image-crop";

const App: React.FC = () => {
    const {state, dispatch} = useContext<IStore>(Store);

    const onCropChangeCallback = async (imageRef: HTMLImageElement, cropRegion: Crop): Promise<void> => {
        dispatch(await asyncUpdateCropPreview(imageRef, cropRegion));
    };

    const onCropSaveCallback = (cropUrl: string): void => {
        dispatch(saveCrop(cropUrl));
    };

    const onCropDeleteCallback = (cropUrl: string): void => {
        dispatch(deleteCrop(cropUrl));
    };

    return (
        <div className="App">
            <ImageCropper
                sourceImageUrl={require('../resources/image.png')}
                onCropChange={onCropChangeCallback}/>
            <div className="crop-menu">
                <CropViewer
                    newCropUrl={state.currentCropUrl}
                    onSaveCallback={onCropSaveCallback}/>
                <CropsList
                    cropsUrls={state.savedCrops}
                    onCropDeleteCallback={onCropDeleteCallback}/>
            </div>
        </div>
    );
};

export default App;
