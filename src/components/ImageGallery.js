import React, { useState } from 'react';
import imgIcon from '../images/icons8-image-24.png';
import tikIcon from '../images/icons8-tick-box-30.png';
import './ImageGallery.css';

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [dropIndex, setDropIndex] = useState(null);
    const [selectedCount, setSelectedCount] = useState(0);

    const noOfFiles = selectedCount > 1 ? 'Files' : 'File';

    const handleNewImage = (event) => {
        const files = event.target.files;
        const newImages = Array.from(files).map((file) => ({
            url: URL.createObjectURL(file),
            selected: false,
        }));
        setImages([...images, ...newImages]);
    };

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain');
        if (draggedIndex !== '' && draggedIndex !== dropIndex.toString()) {
            const updatedImages = images.slice();
            const [draggedImage] = updatedImages.splice(draggedIndex, 1);
            updatedImages.splice(dropIndex, 0, draggedImage);
            setImages(updatedImages);
        }
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDropIndex(index);
    };

    const handleSelect = (index) => {
        const updatedImages = [...images];
        updatedImages[index].selected = !updatedImages[index].selected;
        setImages(updatedImages);
        setSelectedCount(updatedImages.filter((img) => img.selected).length);
    };

    console.log(images);
    const handleDelete = () => {
        const updatedImages = images.filter((img) => !img.selected);
        setImages(updatedImages);
        setSelectedCount(0);
    };

    return (
        <div className="container">
            <div className="galleryHeading">
                {selectedCount > 0 ? (
                    <div className="deleteItems">
                        <div className="alignImage">
                            <img src={tikIcon} alt="" />
                            <p>
                                {selectedCount} {noOfFiles} Selected
                            </p>
                        </div>
                        <button onClick={handleDelete}>Delete {noOfFiles}</button>
                    </div>
                ) : (
                    'Gallery'
                )}
            </div>
            <div className="imageGrid">
                {images.map((image, index) => (
                    <div key={index} className={`image ${image.selected ? 'selected' : ''}`} draggable onDragStart={(e) => handleDragStart(e, index)} onDrop={handleDrop} onDragOver={(e) => handleDragOver(e, index)}>
                        <img src={image.url} alt={`${index}`} onClick={() => handleSelect(index)} />
                        <input type="checkbox" className="imageCheckbox" checked={image.selected} onChange={() => handleSelect(index)} />
                    </div>
                ))}
                <label htmlFor="fileInput" className="addImage">
                    <img src={imgIcon} alt="Icon" />
                    Add Image
                    <input type="file" id="fileInput" onChange={handleNewImage} multiple />
                </label>
            </div>
        </div>
    );
};

export default ImageGallery;
