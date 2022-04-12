export function formDataTransformation(data: any): FormData {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    // @ts-ignore
    formData.append(key, data[key]);
  })

  return formData
}
