//@flow
export type Image = {
  url: string,
  filename: string,
  time: Date,
  size: number,
};

export type Images = Array<Image>;
