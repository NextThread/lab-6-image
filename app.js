// This function handles the photo upload
async function uploadPhoto() {
    const input = document.getElementById('photoInput');
    const file = input.files[0];

    if (!file) {
        alert('Please select a photo');
        return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
        // Send the photo to the server for storage
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
}
