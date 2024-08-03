const API_KEY = '839a1b30e98fe2c1c8074108a5b306b8';

export const uploadImage = async (imageFile: File): Promise<string> => {
    if (!imageFile) {
        throw new Error("No image file provided");
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error("Image upload failed: " + data.message);
        }

        return data.data.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
