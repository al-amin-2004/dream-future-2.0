import UserModel from "@/models/User";

const createBaseUsername = (firstName: string, lastName?: string) => {
  const clean = (str: string) => str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  return clean(firstName) + (lastName ? clean(lastName) : "");
};

export const generateUniqueUsername = async (
  firstName: string,
  lastName?: string,
): Promise<string> => {
  const base = createBaseUsername(firstName, lastName);

  let username: string = "";
  let exist:boolean = true;

  while (exist) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000);

    username = `${base}@${randomNumber}`;

    const existUser = await UserModel.findOne({ username });

    if (!existUser) {
      exist = false;
    }
  }

  return username;
};
