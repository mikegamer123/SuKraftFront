export const uploadImage = async (id, image) => {
    const formData = new FormData();

    formData.append("mediaUpload", image);
    return fetch(`https://270e-109-92-139-170.eu.ngrok.io/api/media/products/${id}`, {
            method: "POST",
            mode: "cors",
            headers: {

            },
            body: formData
        }
    ).then(x => x);
}