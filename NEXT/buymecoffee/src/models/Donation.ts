import { Schema, model, models } from "mongoose";

export type Donation = {
  amount: number;
  name: string;
  message?: string;
  crypto: "BTC" | "ETH" | "LTC";
  paid: boolean;
};

const donationSchema = new Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  message: { type: String },
  crypto: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => ["BTC", "ETH", "LTC"].includes(v),
      message: "Invalid crypto",
    },
  },
  paid: { type: Boolean, default: false },
});

export const DonationModel =
  models?.Donation || model<Donation>("Donation", donationSchema);
