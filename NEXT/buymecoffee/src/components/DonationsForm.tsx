"use client";

import { createDonation } from "@/actions/createDonation";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DonationsForm = () => {
  const [numberInputValue, setNumberInputValue] = useState("");
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    if (numberInputValue) {
      const intValue = parseInt(numberInputValue);
      if (intValue > 5 && intValue <= 100) {
        setAmount(intValue);
      } else if (intValue === 1 || intValue === 3 || intValue === 5) {
        setAmount(intValue);
      } else {
        setAmount(1);
      }
    }
  }, [numberInputValue]);
  const [activeCrypto, setActiveCrypto] = useState<"BTC" | "ETH" | "LTC">(
    "BTC"
  );

  const handleFormSubmit = async (formData: FormData) => {
    formData.set("amount", amount.toString());
    formData.set("crypto", activeCrypto);
    await toast.promise(createDonation(formData), {
      loading: "Saving...",
      success: <b>Profile saved!</b>,
      error: <b>Could not save.</b>,
    });
  };
  return (
    <form action={handleFormSubmit}>
      <div className="border bg-yellow-50 border-yellow-300 rounded-xl p-4 gap-2 flex items-center">
        <FontAwesomeIcon icon={faCoffee} />
        <span>x</span>
        <button
          onClick={() => setNumberInputValue("1")}
          type="button"
          className={`amount ${amount === 1 ? "active" : ""}`}
        >
          1
        </button>
        <button
          onClick={() => setNumberInputValue("3")}
          type="button"
          className={`amount ${amount === 3 ? "active" : ""}`}
        >
          3
        </button>
        <button
          onClick={() => setNumberInputValue("5")}
          type="button"
          className={`amount ${amount === 5 ? "active" : ""}`}
        >
          5
        </button>
        <input
          className="w-12 h-12 border border-yellow-300 rounded-xl text-center"
          placeholder="10"
          type="number"
          value={numberInputValue}
          onChange={(e) => setNumberInputValue(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <input name="name" type="text" placeholder="Your name" />
        <textarea
          name="message"
          id=""
          placeholder="Say something nice"
        ></textarea>
      </div>
      <div className="mt-2">
        <h3 className="text-xs text-grey-500 mb-1">
          Pay with selected crypto or with cc
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => setActiveCrypto("BTC")}
            type="button"
            className={`crypto ${activeCrypto === "BTC" ? "active" : ""}`}
          >
            <span>BTC</span>
            <p>BITCOIN</p>
          </button>
          <button
            onClick={() => setActiveCrypto("ETH")}
            type="button"
            className={`crypto ${activeCrypto === "ETH" ? "active" : ""}`}
          >
            <span>ETH</span>
            <p>ETHEREUM</p>
          </button>
          <button
            onClick={() => setActiveCrypto("LTC")}
            type="button"
            className={`crypto ${activeCrypto === "LTC" ? "active" : ""}`}
          >
            <span>LTC</span>
            <p>LITECOIN</p>
          </button>
        </div>
      </div>
      <div className="mt-2">
        <button
          className="bg-yellow-300 rounded-xl w-full font-semibold py-2"
          type="submit"
        >
          Support ${amount * 5}
        </button>
      </div>
    </form>
  );
};

export default DonationsForm;
