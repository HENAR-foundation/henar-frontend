import axios from '../axios';

export const uploadPhotos = async (files: FileList) => {
  try {
    const uploaders: Promise<string>[] = [];
    for (let index = 0; index < files.length; index++) {
      var bodyFormData = new FormData();
      bodyFormData.append('file', files[index]);
      uploaders.push(axios.post('/files/upload', bodyFormData));
    }
    return Promise.all(uploaders).then((result) => {
      console.info(
        'UPLOADED',
        result.map(({ data }: any) => data.url)
      );
      return result.map(({ data }: any) => data.url);
    });
  } catch (error: any) {
    throw error.response;
  }
};
