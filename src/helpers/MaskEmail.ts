export const emailMasking = (email: string): string => {
  if (!email.includes("@")) return email;

  const [name, domain] = email.split("@");

  if (name.length <= 6) {
    return `${name.slice(0, 1)}****${name.slice(-1)}@${domain}`;
  }

  const first = name.slice(0, 3);
  const last = name.slice(-3);

  return `${first}*****${last}@${domain}`;
};
