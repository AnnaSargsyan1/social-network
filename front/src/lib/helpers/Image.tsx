import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
export const Image: React.FC<ImageProps> = ({ src, ...rest }) => {
    return (
        <img 
            src={ src ? import.meta.env.VITE_BASE + src : import.meta.env.VITE_DEFAULT_PIC } 
            { ...rest }
        />
    );
}