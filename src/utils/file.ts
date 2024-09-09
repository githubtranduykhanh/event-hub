import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "~/configs/firebaseConfig ";


export class FileHelper {
    static uploadImageToFirebase = async (fileUri: string,onProgress: (progress: number) => void): Promise<string | null> => {
        try {
            // Create a blob from the file URI
            const response = await fetch(fileUri);
            const blob = await response.blob();

            // Generate a unique name for the file
            const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1);
            const storageRef = ref(storage, `images/${fileName}`);

            // Start the file upload
            const uploadTask = uploadBytesResumable(storageRef, blob);

            // Return a promise that resolves with the download URL
            return new Promise<string | null>((resolve, reject) => {
                // Monitor the upload progress
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        onProgress(progress); // Update progress using the callback
                    },
                    (error) => {
                        console.error('Upload failed:', error);
                        reject(null);  // Reject the promise on failure
                    },
                    async () => {
                        try {
                            // Get the download URL after upload completes
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            console.log('File available at', downloadURL);
                            resolve(downloadURL);  // Resolve the promise with the download URL
                        } catch (error) {
                            console.error("Error getting download URL: ", error);
                            reject(null);  // Reject if there's an error getting the download URL
                        }
                    }
                );
            });
        } catch (error) {
            console.error("Error uploading image: ", error);
            return null;  // Return null in case of error
        }
    };
}
