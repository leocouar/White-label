const imageResizer = (event) => {
    return new Promise((resolve) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (upload) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Set the new width and height for the image
                const sides = 368;

                // Draw the image with the new dimensions
                canvas.width = sides;
                canvas.height = sides;
                ctx.drawImage(img, 0, 0, sides, sides);

                // Convert the canvas to a Blob
                canvas.toBlob((blob) => {
                    const type = file.type === 'image/jpeg' ? 'image/jpeg' : 'image/png';
                    const resizedImageFile = new File([blob], file.name, {
                        type: type,
                        lastModified: Date.now(),
                    });

                    // Convert Blob to data URL
                    const imageUrl = URL.createObjectURL(blob);

                    // Resolve the promise with the result
                    resolve({ fileData: resizedImageFile, returnedURL: imageUrl });
                }, 'image/jpeg');
            };
            img.src = upload.target.result;
        };
        reader.readAsDataURL(file);
    });
};

export default imageResizer;
