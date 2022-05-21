import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("FullName is a required field"),
  savingsTier: yup.string().required("Please select a savings plan is"),
  contributionAmount: yup.string().required("Contribution amount is required"),
});

const tierLimits = {
  "Tier 1": 10000,
  "Tier 2": 20000,
  "Tier 3": 30000,
};

export const RegistrationForm = ({ setMembers, members }) => {
  const [amtValidationErr, setAmtValidationError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (validateAmount(data?.contributionAmount, data.savingsTier)) {
      setMembers([
        ...members,
        {
          ...data,
          potentialEarning: calcPotentialEarning(
            data?.savingsTier,
            data?.contributionAmount
          ),
        },
      ]);
      reset();
      setAmtValidationError("");
    } else {
      setAmtValidationError(
        `You cannot save more than ${tierLimits[data?.savingsTier]} for ${
          data?.savingsTier
        }`
      );
    }
  };

  const validateAmount = (amount, tier) => {
    return amount <= tierLimits[tier];
  };

  const interest = (amount, percentage) => {
    return (percentage / 100) * amount;
  };

  const calcPotentialEarning = (tier, amount) => {
    let earning = 0;

    switch (tier) {
      case "Tier 1":
        earning = parseFloat(amount) + interest(amount, 7);
        break;

      case "Tier 2":
        earning = parseFloat(amount) + interest(amount, 12);
        break;

      case "Tier 3":
        earning = parseFloat(amount) + interest(amount, 25);
        break;

      default:
        earning = 0;
    }
    return earning;
  };

  const currentValues = watch();

  return (
    <form className="mt-10 sm:mt-0" onSubmit={handleSubmit(onSubmit)}>
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Registration Form
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Please enter the required information below
          </p>
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-6 mt-12">
        <div className="mt-5 md:mt-0 col-span-1">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="w-full">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    {...register("fullName")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-red-600">
                    {errors?.fullName?.message}
                  </p>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Savings Tier
                  </label>
                  <select
                    id="savingsTier"
                    name="savingsTier"
                    {...register("savingsTier")}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                    <option value="Tier 3">Tier 3</option>
                  </select>
                  <p className="text-xs text-red-600">
                    {errors?.savingsTier?.message}
                  </p>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contribution Amount
                  </label>
                  <input
                    type="text"
                    name="contributionAmount"
                    id="contributionAmount"
                    {...register("contributionAmount")}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <p className="text-xs text-red-600">
                    {errors?.contributionAmount?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
            {amtValidationErr && (
              <p className="text-xs p-4 text-red-600">{amtValidationErr}</p>
            )}
          </div>
        </div>
        {isDirty && (
          <div className="mt-5 md:mt-0 col-span-1 p-6">
            <h3 className="text-center mb-4 text-2xl">Savings Preview</h3>
            <div className="flex justify-between">
              <div className="font-bold">Name</div>
              <div>{currentValues?.fullName}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Tier</div>
              <div>{currentValues?.savingsTier}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Contribution Amount</div>
              <div>{currentValues?.contributionAmount}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Potential Earning</div>
              <div>
                {currentValues.contributionAmount &&
                  calcPotentialEarning(
                    currentValues.savingsTier,
                    currentValues.contributionAmount
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
