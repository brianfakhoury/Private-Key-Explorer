export const abbreviateAddress = (address: string): string =>
  `${address.substring(0, 6)}...${address.substring(38)}`;

export const validateHex = (hex: string): boolean =>
  new RegExp(/^(0x|0X)?[a-fA-F0-9]+$/g).test(hex);

export const validatePkLength = (key: string): boolean => key.length === 66;

export const validatePkOrder = (key: string): boolean => {
  if (key === "0x" || !validateHex(key)) return false;

  const keyBigInt = BigInt(key);

  const maxAllowedValue = BigInt(
    "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141"
  );

  return keyBigInt < maxAllowedValue;
};

export const validatePkNotZero = (key: string): boolean => !/^0x0+$/.test(key);
