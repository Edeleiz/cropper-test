import * as React from 'react';

export class Cropper extends React.PureComponent {
    public render(): React.ReactNode {
        return (
          <div className="cropper-container">
              <div className="top-left-corner" />
              <div className="top-right-corner" />
              <div className="bottom-left-corner" />
              <div className="bottom-right-corner" />
              <div className="cropper-body" />
          </div>  
        );
    }
}