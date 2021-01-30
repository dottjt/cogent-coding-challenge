export type File = {
  filePath: string;
  fileName: string;
  imageBuffer: Buffer;
  isFolder: boolean;
}

export type ImageType = {
  ext: string;
  mime: string;
}

export type SimilarImage = {
  files: File[];
}
