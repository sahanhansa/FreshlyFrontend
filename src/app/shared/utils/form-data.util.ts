// src/app/shared/utils/form-data.util.ts
export type FormDataInput = Record<string, unknown>;

export function objectToFormData(
  obj: FormDataInput,
  files?: Record<string, File | File[]>
): FormData {
  const formData = new FormData();

  // Append simple fields (casts non-Blob values to string)
  Object.entries(obj ?? {}).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else {
      formData.append(key, String(value));
    }
  });

  // Append files (supports single File or File[])
  if (files) {
    Object.entries(files).forEach(([key, fileOrFiles]) => {
      if (Array.isArray(fileOrFiles)) {
        fileOrFiles.forEach(f => f && formData.append(key, f));
      } else if (fileOrFiles) {
        formData.append(key, fileOrFiles);
      }
    });
  }

  return formData;
}

/*
Usage (inside a component/service method, not at top-level of this file):

import { objectToFormData } from 'src/app/shared/utils/form-data.util';

const fd = objectToFormData(
  {
    firstName: this.newDriver.firstName,
    lastName: this.newDriver.lastName,
    phone: this.newDriver.phone,
  },
  { profileImage: this.profileImageFile } // or { gallery: [file1, file2] }
);
*/