"use server";

import { DonationModel } from "@/models/Donation";
import mongoose from "mongoose";

export async function createDonation(formdata: FormData) {
  // 1. save to our db
  const { amount, crypto, name, message } = Object.fromEntries(formdata);
  await mongoose.connect(process.env.MONGODB_URI as string);
  await DonationModel.create({
    amount,
    crypto,
    name,
    message,
  });
  return true;
}
