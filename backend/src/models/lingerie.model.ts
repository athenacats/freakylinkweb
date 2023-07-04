import { Schema, model } from "mongoose";

export interface Lingerie {
  id: string;
  name: string;
  price: number;
  tags: string[];
  favorite: boolean;
  stars: number;
  imageUrl: string;
  description: string;
  color: string;
}

export const LingerieSchema = new Schema<Lingerie>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true, //this makes the id to be converted to mongoose _id
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const LingerieModel = model<Lingerie>("lingerie", LingerieSchema);
