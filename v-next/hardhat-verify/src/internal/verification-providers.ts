import type { VerificationProviderStatic } from "./types.js";
import type { VerificationProvidersConfig } from "hardhat/types/config";

import { Blockscout } from "./blockscout.js";
import { Etherscan } from "./etherscan.js";

export const VERIFICATION_PROVIDERS: Record<
  keyof VerificationProvidersConfig,
  VerificationProviderStatic
> = {
  etherscan: Etherscan,
  blockscout: Blockscout,
};
