/**
 * todo base64 转 Blob
 * @param dataUrl
 * @param filename
 */
export const dataURLtoFile = (
  dataUrl: string | undefined,
  filename: string,
): File | undefined => {
  if (dataUrl) {
    let arr = dataUrl.split(',');
    // @ts-ignore
    let mime = arr[0].match(/:(.*?);/)[1];
    let bStr = atob(arr[1]);
    let n = bStr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bStr.charCodeAt(n);
    }
    //转换成file对象
    return new File([u8arr], filename, { type: mime });
    //转换成成blob对象
    //return new Blob([u8arr],{type:mime});
  }
  return undefined;
};
