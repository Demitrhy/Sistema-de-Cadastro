export function downloadFile(response: any, fileName: string, extension: string) {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.target = "_blank";
  link.setAttribute('download', fileName + extension); //or any other extension
  document.body.appendChild(link);
  link.click();
}