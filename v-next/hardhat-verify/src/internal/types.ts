import type { Dispatcher } from "@nomicfoundation/hardhat-utils/request";
import type {
  BlockExplorerConfig,
  BlockscoutConfig,
  EtherscanConfig,
} from "hardhat/types/config";

export interface VerificationStatusResponse {
  isPending(): boolean;
  isFailure(): boolean;
  isSuccess(): boolean;
  isAlreadyVerified(): boolean;
  isOk(): boolean;
}

export interface VerificationResponse {
  isBytecodeMissingInNetworkError(): boolean;
  isAlreadyVerified(): boolean;
  isOk(): boolean;
}

export interface CreateBlockscoutOptions {
  blockExplorerConfig: BlockExplorerConfig;
  dispatcher?: Dispatcher;
}

export interface CreateEtherscanOptions {
  blockExplorerConfig: BlockExplorerConfig;
  verificationProviderConfig: EtherscanConfig;
  chainId: number;
  dispatcher?: Dispatcher;
}

// Superset that works for all providers used in the factory
export interface CreateProviderOptions<T = EtherscanConfig | BlockscoutConfig> {
  blockExplorerConfig: BlockExplorerConfig;
  verificationProviderConfig: T;
  chainId: number;
  dispatcher?: Dispatcher;
}

export interface VerificationProviderStatic {
  create(options: CreateProviderOptions): Promise<VerificationProvider>;
}

export interface VerificationProvider {
  name: string;
  url: string;
  apiUrl: string;

  getContractUrl(address: string): string;

  isVerified(address: string): Promise<boolean>;

  verify(
    contractAddress: string,
    sourceCode: string,
    contractName: string,
    compilerVersion: string,
    constructorArguments: string,
  ): Promise<string>;

  pollVerificationStatus(
    guid: string,
    contractAddress: string,
    contractName: string,
  ): Promise<{
    success: boolean;
    message: string;
  }>;
}
