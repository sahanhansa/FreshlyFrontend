// src/app/shared/utils/form-data.util.ts
export function objectToFormData(obj: any, files?: { [key: string]: File }): FormData {
  const formData = new FormData();
  
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null && obj[key] !== undefined) {
      formData.append(key, obj[key]);
    }
  });
  
  if (files) {
    Object.keys(files).forEach(key => {
      formData.append(key, files[key]);
    });
  }
  
  return formData;
}

// Usage
const formData = objectToFormData(this.newDriver, { profileImage: this.profileImageFile });