/*
  Mobile numbers for the enquiry form, shared by the browser and the API route.

  Indian numbers are stored as the bare 10 digits (typed with or without +91 / 0).
  Anything else must carry its country code and is stored as +<digits>, so overseas
  buyers can reach us too.
*/

export function normaliseMobile(input: string): string {
  const raw = input.trim();
  const intl = raw.startsWith("+") || raw.startsWith("00");
  let digits = raw.replace(/\D/g, "");
  if (raw.startsWith("00")) digits = digits.slice(2);

  const indian = digits.replace(/^(91|0)(?=\d{10}$)/, "");
  if (/^[6-9]\d{9}$/.test(indian) && (!intl || digits.startsWith("91"))) return indian;

  return intl ? `+${digits}` : digits;
}

export const isValidMobile = (m: string) => /^[6-9]\d{9}$/.test(m) || /^\+(?!91)[1-9]\d{7,14}$/.test(m);

/** "+91 98765 43210"-style display value and a dialable tel: target. */
export const mobileDisplay = (m: string) => (m.startsWith("+") ? m : `+91 ${m}`);
export const mobileTel = (m: string) => (m.startsWith("+") ? m : `+91${m}`);
