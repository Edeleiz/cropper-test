import React, {useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Cropper} from "./components/cropper/Cropper";
import {ImageCropper} from "./components/imageCropper/ImageCropper";
import {CropViewer} from "./components/cropViewer/CropViewer";
import {CropsList} from "./components/cropsList/CropsList";

const App: React.FC = () => {
    const [cropUrl, setCropUrl] = useState('');
    const [crops, setCrops] = useState(Array<string>());

    const onCropChangeCallback = (cropUrl: string): void => {
        setCropUrl(cropUrl);
    };

    const onCropSaveCallback = (cropUrl: string): void => {
        if (crops.indexOf(cropUrl) >= 0) {
            return;
        }
        
        let newArr = crops.slice();
        newArr.push(cropUrl);
        setCrops(newArr);
    };

    const onCropDeleteCallback = (cropUrl: string): void => {
        let newArr = crops.filter(element => element !== cropUrl);
        setCrops(newArr);
    };

    return (
        <div className="App">
            <body>
            <Cropper/>
            <ImageCropper
                sourceImageUrl={require('./resources/image.png')}
                onCropChange={onCropChangeCallback}/>
            <CropViewer
                newCropUrl={cropUrl}
                onSaveCallback={onCropSaveCallback}/>
            <CropsList 
                cropsUrls={crops} 
                onCropDeleteCallback={onCropDeleteCallback}/>
            </body>
        </div>
    );
};

export default App;
