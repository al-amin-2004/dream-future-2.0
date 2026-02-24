import AccountModel from "@/models/Account";

export const generateAccountNumber = async (): Promise<string> => {
  let accNumber = "";
  let exists = true;

  while (exists) {
    accNumber = Math.floor(
      100000000000 + Math.random() * 900000000000
    ).toString();

    const duplicate = await AccountModel.findOne({ accNumber });

    if (!duplicate) {
      exists = false;
    }
  }

  return accNumber;
};