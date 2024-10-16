export const deleteImage = async (deleteHash: string) => {
  console.log("Delete image");

  const response = await fetch(`https://api.imgur.com/3/image/${deleteHash}`, {
    method: "DELETE",
    headers: {
      Authorization: "Client-ID 2a29c21f25e14a1", // Replace with your Imgur Client ID
    },
  });

  if (response.ok) {
    console.log("Old image deleted successfully");
  } else {
    console.error("Failed to delete the old image");
  }
};

export const uploadImage = async (imageFile: File) => {
  console.log("Uploading Image...");

  const formData = new FormData();
  formData.append("image", imageFile);

  await fetch("https://api.imgur.com/3/image", {
    method: "post",
    headers: {
      Authorization: "Client-ID e164135f03d6197", // Ensure Client-ID is used here
    },
    body: formData,
  })
    .then(async (data) => await data.json())
    .then((data) => console.log(data.data.link))
    .catch((err) => console.log(err));
};
