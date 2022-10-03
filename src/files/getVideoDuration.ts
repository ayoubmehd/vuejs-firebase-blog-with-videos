export function getVideoDuration(file: File | ArrayBuffer) {
  const convertadFile = file instanceof ArrayBuffer ? new Blob([file]) : file;

  const video = document.createElement("video");
  video.preload = "metadata";

  video.src = URL.createObjectURL(convertadFile);
  return new Promise((resolve, reject) => {
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);

      resolve(video.duration);
    };

    video.onerror = (err) => {
      reject("Video format is not suported");
    };
  });
}
