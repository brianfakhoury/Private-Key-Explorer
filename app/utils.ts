export const abbreviateAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(38)}`;

export const validateHex = (address) =>
  new RegExp(/^(0x|0X)?[a-fA-F0-9]+$/g).test(address);

export const validatePkLength = (address) => address.length === 66;
