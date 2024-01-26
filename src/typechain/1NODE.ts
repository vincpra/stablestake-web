/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type AddedLiquidity = ContractEventLog<{
  ondAmount: string;
  oneAmount: string;
  0: string;
  1: string;
}>;
export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type RoleAdminChanged = ContractEventLog<{
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleGranted = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleRevoked = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type SwappedSafeFeeBalance = ContractEventLog<{
  amount: string;
  0: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface NODE extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): NODE;
  clone(): NODE;
  methods: {
    DAO(): NonPayableTransactionObject<string>;

    DEFAULT_ADMIN_ROLE(): NonPayableTransactionObject<string>;

    _automatedMarketMakerPairs(
      arg0: string
    ): NonPayableTransactionObject<boolean>;

    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    blacklistDAO(
      _user: string,
      _state: boolean
    ): NonPayableTransactionObject<void>;

    burnDAO(
      _from: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    buyingFee(): NonPayableTransactionObject<string>;

    changeDAO(_newDAO: string): NonPayableTransactionObject<void>;

    decimals(): NonPayableTransactionObject<string>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    enableSwappingDAO(): NonPayableTransactionObject<void>;

    excludeFromFeesDAO(
      _account: string,
      _state: boolean
    ): NonPayableTransactionObject<void>;

    feeSafe(): NonPayableTransactionObject<string>;

    getRoleAdmin(role: string | number[]): NonPayableTransactionObject<string>;

    grantRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    hasRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<boolean>;

    increaseAllowance(
      spender: string,
      addedValue: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    initialSupply(): NonPayableTransactionObject<string>;

    isBlacklisted(_user: string): NonPayableTransactionObject<boolean>;

    liquidityFeeBalance(): NonPayableTransactionObject<string>;

    manualLiquifyDAO(): NonPayableTransactionObject<void>;

    manualSafeFeeSwapDAO(): NonPayableTransactionObject<void>;

    minimumLiquidityFeeBalanceToSwap(): NonPayableTransactionObject<string>;

    minimumSafeFeeBalanceToSwap(): NonPayableTransactionObject<string>;

    mintDAO(
      _to: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    name(): NonPayableTransactionObject<string>;

    oneNodeDAO(): NonPayableTransactionObject<string>;

    owner(): NonPayableTransactionObject<string>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    renounceRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    revokeDAO(_DaoToRevoke: string): NonPayableTransactionObject<void>;

    revokeRole(
      role: string | number[],
      account: string
    ): NonPayableTransactionObject<void>;

    safeFeeBalance(): NonPayableTransactionObject<string>;

    safeFeePercentage(): NonPayableTransactionObject<string>;

    sellingFee(): NonPayableTransactionObject<string>;

    setAutomatedMarketMakerPairDAO(
      _pair: string,
      _value: boolean
    ): NonPayableTransactionObject<void>;

    setBuyingFeeDAO(
      _buyingFee: number | string | BN
    ): NonPayableTransactionObject<void>;

    setFeeSafeDAO(_feeSafe: string): NonPayableTransactionObject<void>;

    setMinimumLiquidityFeeBalanceToSwapDAO(
      _minimumLiquidityFeeBalanceToSwap: number | string | BN
    ): NonPayableTransactionObject<void>;

    setMinimumSafeFeeBalanceToSwapDAO(
      _minimumSafeFeeBalanceToSwap: number | string | BN
    ): NonPayableTransactionObject<void>;

    setSafeFeePercentageDAO(
      _safeFeePercentage: number | string | BN
    ): NonPayableTransactionObject<void>;

    setSellingFeeDAO(
      _sellingFee: number | string | BN
    ): NonPayableTransactionObject<void>;

    stopSwappingDAO(): NonPayableTransactionObject<void>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    sushiOndOnePair(): NonPayableTransactionObject<string>;

    sushiRouter(): NonPayableTransactionObject<string>;

    swapEnabled(): NonPayableTransactionObject<boolean>;

    symbol(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;

    transfer(
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    withdrawDAO(
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;

    withdrawERC20DAO(
      _erc20: string,
      _amount: number | string | BN
    ): NonPayableTransactionObject<void>;
  };
  events: {
    AddedLiquidity(cb?: Callback<AddedLiquidity>): EventEmitter;
    AddedLiquidity(
      options?: EventOptions,
      cb?: Callback<AddedLiquidity>
    ): EventEmitter;

    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    RoleAdminChanged(cb?: Callback<RoleAdminChanged>): EventEmitter;
    RoleAdminChanged(
      options?: EventOptions,
      cb?: Callback<RoleAdminChanged>
    ): EventEmitter;

    RoleGranted(cb?: Callback<RoleGranted>): EventEmitter;
    RoleGranted(
      options?: EventOptions,
      cb?: Callback<RoleGranted>
    ): EventEmitter;

    RoleRevoked(cb?: Callback<RoleRevoked>): EventEmitter;
    RoleRevoked(
      options?: EventOptions,
      cb?: Callback<RoleRevoked>
    ): EventEmitter;

    SwappedSafeFeeBalance(cb?: Callback<SwappedSafeFeeBalance>): EventEmitter;
    SwappedSafeFeeBalance(
      options?: EventOptions,
      cb?: Callback<SwappedSafeFeeBalance>
    ): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "AddedLiquidity", cb: Callback<AddedLiquidity>): void;
  once(
    event: "AddedLiquidity",
    options: EventOptions,
    cb: Callback<AddedLiquidity>
  ): void;

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "RoleAdminChanged", cb: Callback<RoleAdminChanged>): void;
  once(
    event: "RoleAdminChanged",
    options: EventOptions,
    cb: Callback<RoleAdminChanged>
  ): void;

  once(event: "RoleGranted", cb: Callback<RoleGranted>): void;
  once(
    event: "RoleGranted",
    options: EventOptions,
    cb: Callback<RoleGranted>
  ): void;

  once(event: "RoleRevoked", cb: Callback<RoleRevoked>): void;
  once(
    event: "RoleRevoked",
    options: EventOptions,
    cb: Callback<RoleRevoked>
  ): void;

  once(
    event: "SwappedSafeFeeBalance",
    cb: Callback<SwappedSafeFeeBalance>
  ): void;
  once(
    event: "SwappedSafeFeeBalance",
    options: EventOptions,
    cb: Callback<SwappedSafeFeeBalance>
  ): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
