import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface ProductInput {
  name: string;
  price: number;
  description: string;
  image: string;
  category: "Cake" | "Tart" | "Macaron" | "Cookie";
  featured: boolean;
  user: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 1000,
    },
    image: {
      type: String,
      default:
        "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
    },
    category: {
      type: String,
      required: true,
      enum: ["Cake", "Tart", "Macaron", "Cookie"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model<ProductDocument>(
  "Product",
  ProductSchema
);
