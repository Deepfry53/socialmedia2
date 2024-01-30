// export async function createPost(post: INewPost) {
//     try {
//       // Upload file to appwrite storage
//       const uploadedFile = await uploadFile(post.file[0]);
  
//       if (!uploadedFile) throw Error;
  
//       // Get file url
//       const fileUrl = getFilePreview(uploadedFile.$id);
//       if (!fileUrl) {
//         await deleteFile(uploadedFile.$id);
//         throw Error;
//       }
  
//       // Convert tags into array
//       const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
//       // Create post
//       const newPost = await databases.createDocument(
//         appwriteConfig.databaseId,
//         appwriteConfig.postCollectionId,
//         ID.unique(),
//         {
//           creator: post.userId,
//           caption: post.caption,
//           imageUrl: fileUrl,
//           imageId: uploadedFile.$id,
//           location: post.location,
//           tags: tags,
//         }
//       );
  
//       if (!newPost) {
//         await deleteFile(uploadedFile.$id);
//         throw Error;
//       }
  
//       return newPost;
//     } catch (error) {
//       console.log(error);
//     }
//   }      

//   export async function uploadFile(file:File){
//     try { 
//       const uploadedFile = await storage.createFile(
//         appwriteConfig.storageId,
//         ID.unique(),
//         file
//       ); 
//       return uploadedFile;           
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   export async function getFilePreview(fileId: string){
//     try {
//       const fileUrl  = storage.getFilePreview(
//         appwriteConfig.storageId,
//         fileId,
//         2000,
//         2000,
//         "top",
//         100,
//       )
//       return fileUrl;
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   export async function deleteFile(fileId: string){
//     try {
//       await storage.deleteFile(appwriteConfig.storageId ,fileId);
//       return {status: 'ok'}
//     } catch (error) {
//       console.log(error)
//     }
//   }
