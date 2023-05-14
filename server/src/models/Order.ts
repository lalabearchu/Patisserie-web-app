import mongoose from "mongoose";

export interface SingleItem {
  _id: string;
  amount: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "Cake" | "Tart" | "Macaron" | "Cookie";
  featured: boolean;
  user: string;
}

// export interface OrderInput {
//   total: number;
//   orderItems: SingleItem[];
//   orderDate: Date;
//   user: string;
// }

export interface OrderDocument extends mongoose.Document {
  total: number;
  orderItems: SingleItem[];
  user: string;
  status: string;
  clientSecret: string;
  paymentIntentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const SingleItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    ref: "product",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Cake", "Tart", "Macaron", "Cookie"],
  },
  featured: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleItemSchema],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // status: {
    //   type: String,
    //   enum: ["pending", "paid"],
    //   default: "pending",
    // },
    // clientSecret: {
    //   type: String,
    //   required: true,
    // },
    // paymentIntentId: {
    //   type: String,
    // },
    // orderDate: {
    //   type: Date,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<OrderDocument>("Order", OrderSchema);
