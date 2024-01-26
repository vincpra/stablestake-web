import { useEffect, useState } from "react";
import { calcRem } from "../utils/styles";
import { useDepositsContext } from "context/DepositsContext";
import classNames from "classnames";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";
import {
  DEPOSIT_LOCK_TIME_PER_DEPOSIT_TYPE,
  IS_PAUSED,
} from "./const/constants";
import { useDepositInterfaceContext } from "context/DepositInterfaceContext";

interface StakingInterestProps {
  className?: string;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

export function StakingInterest({
  className,
  isModalOpen,
  setIsModalOpen,
}: StakingInterestProps) {
  const {
    deposits,
    depositedValue,
    availableRewards,
    isAccountUnlocked,
    affiliateRewardsAvailability,
    affiliateRewardsAvailabile,
    nextTimeUntilReward,
    nextRewards,
  } = useDepositsContext();
  const {
    cashoutAndCompoundAll,
    cashoutAllDeposits,
    compoundAffiliateRewards,
    cashoutAllRewards,
  } = useDepositInterfaceContext();
  const [isLoading, setIsLoading] = useState(false);
  // Related to buttons
  // Popovers: buttons with 2 steps; they are used either to make "exit" CTAs harder or to show not-allowed warnings/explanations
  const [showWithdrawDepositsPopover, setShowWithdrawDepositsPopover] =
    useState(false);
  const [showWithdrawRewardsPopover, setShowWithdrawRewardsPopover] =
    useState(false);
  const [
    showUnavailableWithdrawDepositsPopover,
    setShowUnavailableWithdrawDepositsPopover,
  ] = useState(false);
  const [
    showUnavailableWithdrawRewardsPopover,
    setShowUnavailableWithdrawRewardsPopover,
  ] = useState(false);
  const [nextRewardTime, setNextRewardTime] = useState<number>(
    nextTimeUntilReward.toNumber()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchedNextRewardTime = nextTimeUntilReward.toNumber();
      // By doing this, we can avoid having to query everything again
      // if (fetchedNextRewardTime == 0) deposit.reward += REWARD_INTERVAL_PER_DEPOSIT_TYPE[0] * 10 ** 18

      setNextRewardTime(fetchedNextRewardTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [deposits, nextRewards, nextTimeUntilReward]);

  const toTwoDigits = (time: any) => ("0" + time).slice(-2);

  // const getTime = (time: any) => {
  //   const h = Math.floor(time / 3600)
  //   const m = Math.floor((time % 3600) / 60)
  //   const s = Math.floor((time % 3600) % 60)

  //   const hDisplay = h > 0 ? toTwoDigits(h) + 'h' : ''
  //   const mDisplay = h > 0 || m > 0 ? toTwoDigits(m) + 'm' : ''
  //   const sDisplay = h > 0 || m > 0 || s > 0 ? toTwoDigits(s) + 's' : ''
  //   return hDisplay + mDisplay + sDisplay || '00s'
  // }

  const getDateAndTime = (time: any) => {
    const d = new Date(Date.now() + time * 1000).toDateString();
    // const h = Math.floor(time / 3600)
    // const m = Math.floor((time % 3600) / 60)
    // const s = Math.floor((time % 3600) % 60)

    // const hDisplay = h > 0 ? toTwoDigits(h) + 'h' : ''
    // const mDisplay = h > 0 || m > 0 ? toTwoDigits(m) + 'm' : ''
    // const sDisplay = h > 0 || m > 0 || s > 0 ? toTwoDigits(s) + 's' : ''
    // return d + ' ' + hDisplay + mDisplay + sDisplay || '00s'
    return d || "00s";
  };
  const getDaysAndTime = (time: any) => {
    const d = Math.floor(time / 24 / 3600);
    const h = Math.floor((time / 3600) % 24);
    const m = Math.floor((time % 3600) / 60);
    // const s = Math.floor((time % 3600) % 60)

    const dDisplay = d > 0 ? d + " days " : "";
    const hDisplay = h > 0 ? toTwoDigits(h) + "h" : "";
    const mDisplay = h > 0 || m > 0 ? toTwoDigits(m) + "m" : "";
    // const sDisplay = h > 0 || m > 0 || s > 0 ? toTwoDigits(s) + 's' : ''
    return dDisplay + hDisplay + mDisplay || "00s";
    // return d.toDateString() || '00s'
  };

  const getDepositUnlockDate = () => {
    const now = Date.now() / 1000;
    // console.log(time_)
    if (deposits.length > 0)
      return getDateAndTime(
        -now +
          parseInt(deposits[0].creationTime) +
          DEPOSIT_LOCK_TIME_PER_DEPOSIT_TYPE[0]
      );
    else return "00s";
  };

  // HOVER WARNINGS

  const HoverInfoDeposit = () => {
    return (
      <div
        style={{ maxWidth: calcRem(250) }}
        className="p-3 rounded-xl bg-blue-main1 border border-white border-opacity-30"
      >
        Deposit funds to earn interest
      </div>
    );
  };
  const HoverInfoReinvestInterests = () => {
    return (
      <div
        style={{ maxWidth: calcRem(250) }}
        className="p-3 rounded-xl bg-blue-main1 border border-white border-opacity-30"
      >
        Reinvest your earnings in your staking balance to stake up to +247%/year
      </div>
    );
  };
  const HoverInfoReinvestCommissions = () => {
    return (
      <div
        style={{ maxWidth: calcRem(250) }}
        className="p-3 rounded-xl bg-blue-main1 border border-white border-opacity-30"
      >
        Reinvest your affiliate commissions in your staking balance to increase
        your interest!
      </div>
    );
  };

  const WithdrawDepositsPopover = () => {
    return (
      <div
        // style={{ minWidth: calcRem(300) }}
        className={classNames(
          depositedValue.toNumber() == 0 && "hidden",
          "w-60 desktop:w-60",
          "p-3 absolute rounded-xl bg-blue-main1 border border-white border-opacity-30"
        )}
      >
        Are you sure you want to withdraw your staking?
        <br />
        By withdrawing now you give up on{" "}
        {((depositedValue.toNumber() * 1.1) ^ 24).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}{" "}
        of total staking in 2 years.
        <br />
        We advise you to withdraw your interest rather than your staking in
        order to continue to receive passive income.
        <br />
        ⚠️As a reminder: you will be charged a 5% fee for your withdrawal.⚠️
        <br />
        <WithdrawDepositsButton />
        {/* <ClaimAllButton /> */}
        <CloseButton interests={false} />
      </div>
    );
  };

  const UnavailableWithdrawDepositsPopover = () => {
    return (
      <div
        style={{ maxWidth: calcRem(250) }}
        className={classNames(
          showUnavailableWithdrawDepositsPopover ? "scale-100" : "scale-0",
          "transition-all duration-150",
          "p-3 rounded-xl bg-blue-main1 border border-white border-opacity-30"
        )}
      >
        In order for you to earn your first interest, your deposits are locked
        in for the first 30 days after your first deposit. After that, your
        deposits will no longer be locked.
        <br />
        Your{" "}
        {depositedValue
          .toNumber()
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
          .slice(0, -3)}{" "}
        is locked in until {getDepositUnlockDate()}. After this date you can
        withdraw{" "}
        {depositedValue
          .toNumber()
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
          .slice(0, -3)}{" "}
        whenever you want.
        <br />
        PS: Reinvestments of your interest are not subject to this lock period.
        <CloseButton interests={false} />
      </div>
    );
  };

  const UnavailableWithdrawRewardsTooltip = () => {
    return (
      <div
        style={{ maxWidth: calcRem(250) }}
        className="p-3 rounded-xl bg-blue-main1 border border-white border-opacity-30"
      >
        No rewards available yet. Please come back later.
        <CloseButton interests={true} />
      </div>
    );
  };

  const WithdrawRewardsTooltip = () => {
    return (
      <div
        style={{ maxWidth: calcRem(250) }}
        className="p-3 rounded-xl bg-blue-main1 border border-white border-opacity-30"
      >
        Are you sure that you want to withdraw your rewards?
        <br />
        <WithdrawRewardsButton />
        <CloseButton interests={true} />
      </div>
    );
  };

  const ClaimAllButton = () => {
    return (
      <button
        onClick={() => cashoutAllRewards()}
        className={classNames(
          availableRewards.eq(0)
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer",
          "button-transition cursor-pointer flex rounded-xl bg-green w-full tablet:w-48 mt-4 font-bold px-5 py-3 text-center"
        )}
        style={{ fontSize: calcRem(13) }}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div
              style={{
                borderTopColor: "transparent",
                width: calcRem(20),
                height: calcRem(20),
              }}
              className="border-2 rounded-full animate-spin"
            ></div>
          </div>
        ) : (
          <p>Claim all tokens</p>
        )}
      </button>
    );
  };

  const WithdrawDepositsButton = () => {
    return (
      <button
        onClick={() => !IS_PAUSED && cashoutAllDeposits()}
        className={classNames(
          IS_PAUSED ? "cursor-not-allowed bg-red-error" : "bg-green",
          depositedValue.eq(0)
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer",
          "button-transition cursor-pointer flex rounded-xl font-semibold mx-auto w-24 mt-4 px-5 py-3 text-center justify-center"
        )}
        style={{ fontSize: calcRem(15) }}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div
              style={{
                borderTopColor: "transparent",
                width: calcRem(20),
                height: calcRem(20),
              }}
              className="border-2 rounded-full animate-spin"
            ></div>
          </div>
        ) : (
          <p>Withdraw</p>
        )}
      </button>
    );
  };

  const WithdrawRewardsButton = () => {
    return (
      <button
        onClick={() => !IS_PAUSED && cashoutAllRewards()}
        className={classNames(
          IS_PAUSED ? "bg-red-error cursor-not-allowed" : "bg-green",
          availableRewards.eq(0)
            ? "opacity-40 cursor-not-allowed"
            : "cursor-pointer",
          "button-transition cursor-pointer flex rounded-xl font-semibold mx-auto w-24 mt-4 px-5 py-3 text-center justify-center"
        )}
        style={{ fontSize: calcRem(15) }}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div
              style={{
                borderTopColor: "transparent",
                width: calcRem(20),
                height: calcRem(20),
              }}
              className="border-2 rounded-full animate-spin"
            ></div>
          </div>
        ) : (
          <p>Withdraw</p>
        )}
      </button>
    );
  };

  interface CloseButtonProps {
    interests: boolean;
  }

  const CloseButton = ({ interests }: CloseButtonProps) => {
    return (
      <button
        onClick={() =>
          interests
            ? () => {
                setShowWithdrawRewardsPopover(false);
                setShowUnavailableWithdrawRewardsPopover(false);
              }
            : () => {
                setShowWithdrawDepositsPopover(false);
                setShowUnavailableWithdrawDepositsPopover(false);
              }
        }
        className={classNames(
          "cursor-pointer",
          "cursor-pointer flex rounded-xl bg-red-error font-semibold mx-auto w-24 mt-4 px-5 py-3 text-center justify-center"
        )}
        style={{ fontSize: calcRem(15) }}
      >
        <p>Close</p>
      </button>
    );
  };

  // Buttons

  const DepositButton = () => {
    return (
      <div className="group">
        <div
          style={{ height: calcRem(56) }}
          className={classNames(
            IS_PAUSED ? " bg-red-error cursor-not-allowed" : "bg-green",
            "w-full cursor-pointer flex rounded-xl"
          )}
          onClick={() => !IS_PAUSED && setIsModalOpen(true)}
        >
          <div
            className={classNames(
              IS_PAUSED ? " bg-black bg-opacity-20" : "bg-green-dark",
              "hidden tablet:flex rounded-l-xl py-5 px-5"
            )}
          >
            <img
              style={{ height: calcRem(20), width: calcRem(34) }}
              src="/icons/deposit-icon.png"
              alt="Deposit"
            ></img>
          </div>
          <div
            style={{ fontSize: calcRem(19) }}
            className="flex w-full space-x-1 mx-auto justify-center items-center"
          >
            Deposit
            <AiFillInfoCircle
              style={{ height: calcRem(17), opacity: 0.7, marginLeft: 5 }}
            />
          </div>
        </div>
        <div
          className={classNames(
            "absolute scale-0 group-hover:scale-100 transition-all duration-150 origin-top -mt-2 laptop:ml-10 desktop:ml-16 ml-4"
          )}
        >
          <HoverInfoDeposit />
        </div>
      </div>
    );
  };

  const ReinvestStakingRewardsButton = () => {
    return (
      <div className="group">
        <div
          style={{ height: calcRem(56) }}
          className={classNames(
            "w-full flex rounded-xl",
            IS_PAUSED ? "bg-red-error cursor-not-allowed" : "bg-green",
            availableRewards.toNumber() > 0 && isAccountUnlocked
              ? "cursor-pointer"
              : "cursor-not-allowed"
          )}
          onClick={() =>
            !IS_PAUSED &&
            availableRewards.toNumber() > 0 &&
            isAccountUnlocked &&
            cashoutAndCompoundAll()
          }
        >
          <div
            className={classNames(
              IS_PAUSED ? "bg-black bg-opacity-20" : "bg-green-dark",
              "hidden tablet:flex rounded-l-xl py-5 px-5"
            )}
          >
            <img
              style={{ height: calcRem(16), width: calcRem(22) }}
              src="/icons/reinvest-icon.png"
              alt="Reinvest interest"
            ></img>
          </div>
          <div
            style={{ fontSize: calcRem(19) }}
            className="flex w-full space-x-1 mx-auto justify-center items-center whitespace-nowrap"
          >
            <p className="hidden tablet:flex">Reinvest interest</p>
            <p className="tablet:hidden">Reinvest</p>
            <AiFillInfoCircle
              style={{ height: calcRem(17), opacity: 0.7, marginLeft: 5 }}
            />
          </div>
        </div>
        <div
          className={classNames(
            "absolute scale-0 group-hover:scale-100 transition-all duration-150 origin-top -mt-2 laptop:ml-10 desktop:ml-16 ml-4"
          )}
        >
          <HoverInfoReinvestInterests />
        </div>
      </div>
    );
  };

  const ReinvestAffiliateRewardsButton = () => {
    return (
      <div className="group">
        <div
          style={{ height: calcRem(56) }}
          className={classNames(
            affiliateRewardsAvailabile.toNumber() > 0 &&
              affiliateRewardsAvailability
              ? "cursor-pointer"
              : "cursor-not-allowed",
            IS_PAUSED ? "cursor-not-allowed bg-red-error" : "bg-green",
            "w-full flex rounded-xl"
          )}
          onClick={() =>
            !IS_PAUSED &&
            affiliateRewardsAvailabile.toNumber() > 0 &&
            affiliateRewardsAvailability &&
            compoundAffiliateRewards()
          }
        >
          <div
            className={classNames(
              IS_PAUSED ? "bg-black bg-opacity-20" : "bg-green-dark",
              "hidden tablet:flex rounded-l-xl py-5 px-5"
            )}
          >
            <img
              style={{ height: calcRem(16), width: calcRem(22) }}
              src="/icons/reinvest-icon.png"
              alt="Reinvest commissions"
            ></img>
          </div>
          <div
            style={{ fontSize: calcRem(19) }}
            className="flex w-full space-x-1 mx-auto justify-center items-center whitespace-nowrap"
          >
            <p className="hidden tablet:flex">Reinvest commissions</p>
            <p className="tablet:hidden">Reinvest</p>
            <AiFillInfoCircle
              style={{ height: calcRem(17), opacity: 0.7, marginLeft: 5 }}
            />
          </div>
        </div>
        <div
          className={classNames(
            "absolute scale-0 group-hover:scale-100 transition-all duration-150 origin-top -mt-2 laptop:ml-10 desktop:ml-16 ml-4"
          )}
        >
          <HoverInfoReinvestCommissions />
        </div>
      </div>
    );
  };

  const canCashoutDeposits =
    deposits.length > 0
      ? Math.round(Date.now() / 1000) - parseInt(deposits[0].creationTime) >
        DEPOSIT_LOCK_TIME_PER_DEPOSIT_TYPE[0]
      : false;
  const canCashoutRewards = !availableRewards.eq(0);

  const WithdrawButton = (rewards: boolean) => {
    return (
      <div
        style={{ height: calcRem(56) }}
        className={classNames(
          "w-full cursor-pointer tablet:w-2/5 flex rounded-xl opacity-70 border border-white border-opacity-40 bg-black bg-opacity-5",
          rewards
            ? canCashoutRewards
              ? "cursor-pointer"
              : "cursor-not-allowed"
            : canCashoutDeposits
            ? "cursor-pointer withdraw-staking group"
            : "cursor-not-allowed withdraw-staking group"
        )}
        onClick={() =>
          rewards
            ? canCashoutRewards
              ? // ? cashoutAllRewards()
                setShowWithdrawRewardsPopover(!showWithdrawRewardsPopover)
              : setShowUnavailableWithdrawRewardsPopover(
                  !showUnavailableWithdrawRewardsPopover
                )
            : canCashoutDeposits
            ? setShowWithdrawDepositsPopover(!showWithdrawDepositsPopover)
            : // setShowWithdrawDepositsTooltip(!showWithdrawDepositsTooltip)
              setShowUnavailableWithdrawDepositsPopover(
                !showUnavailableWithdrawDepositsPopover
              )
        }
      >
        <div
          style={{ fontSize: calcRem(19) }}
          className="flex w-full pl-4 space-x-1 mx-auto px-2 justify-center items-center"
        >
          Withdraw
          <AiOutlineInfoCircle
            style={{ height: calcRem(17), opacity: 0.7, marginLeft: 5 }}
          />
        </div>
        <div
          className={classNames(
            rewards
              ? canCashoutDeposits
                ? "opacity-100 scale-100"
                : "scale-0 opacity-0"
              : canCashoutDeposits
              ? ""
              : "",
            "absolute origin-top mt-10 -ml-12 desktop:ml-2"
          )}
        >
          {rewards
            ? canCashoutRewards
              ? // <></>
                showWithdrawRewardsPopover && WithdrawRewardsTooltip()
              : showUnavailableWithdrawRewardsPopover &&
                UnavailableWithdrawRewardsTooltip()
            : canCashoutDeposits
            ? showWithdrawDepositsPopover && WithdrawDepositsPopover()
            : showUnavailableWithdrawDepositsPopover &&
              UnavailableWithdrawDepositsPopover()}
        </div>
      </div>
    );
  };

  // Elements

  const YourStaking = () => {
    return (
      <div className="your-staking rounded-lg bg-white bg-opacity-5 border border-white border-opacity-25 text-white">
        <div
          style={{ height: calcRem(46), fontSize: calcRem(18) }}
          className="text-center font-semibold w-full py-2 bg-white bg-opacity-25 rounded-t-lg"
        >
          Your Staking
        </div>
        <div className="w-full h-full flex flex-col justify-between px-6 pt-4">
          <div className="px-6 py-8">
            <div
              style={{ fontSize: calcRem(28) }}
              className="w-full font-bold flex justify-between items-center"
            >
              <div>Total Stake</div>
              <div>
                {depositedValue
                  .toNumber()
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                  .slice(0, -3)}
              </div>
            </div>
          </div>
          <div className="tablet:flex tablet:space-x-6 space-y-4 tablet:space-y-0 mb-6">
            <div className="w-full">
              <DepositButton />
            </div>
            {WithdrawButton(false)}
          </div>
        </div>
        <style jsx>
          {`
            .your-staking {
            }
            @media (min-width: 1024px) {
              .your-staking {
                min-height: ${calcRem(200)};
              }
            }
          `}
        </style>
      </div>
    );
  };

  const YourNextInterestIn = () => {
    return (
      <div className="pl-1">{getDaysAndTime(nextRewardTime.toString())}</div>
    );
  };

  const YourInterest = () => {
    return (
      <div className="your-staking rounded-lg bg-white bg-opacity-5 border border-white border-opacity-25 text-white">
        <div
          style={{ height: calcRem(46), fontSize: calcRem(18) }}
          className="font-semibold mx-auto w-full py-2 bg-white bg-opacity-25 rounded-t-lg"
        >
          <div className="flex w-full justify-center">
            <p className="pr-1">Your Interest</p>
            <p className="opacity-50 hidden tablet:flex">
              (Every 30 days after each deposit)
            </p>
            <p className="opacity-50 tablet:hidden">(Every 30 days)</p>
          </div>
        </div>
        <div className="w-full h-full your-interest-content justify-between flex flex-col pt-4">
          <div className="py-6 px-12">
            {/* STAKING REWARDS */}
            <div className="w-full pt-4">
              <div
                style={{ fontSize: calcRem(22) }}
                className="w-full flex justify-between items-center"
              >
                <div>Your available staking interest</div>
                <div>
                  {availableRewards
                    .toNumber()
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    .slice(0, -3)}
                </div>
              </div>
              <div
                style={{ fontSize: calcRem(18) }}
                className="w-full tablet:flex mt-3 pt-3 border-t border-white border-opacity-50 opacity-50"
              >
                <div>
                  Your next staking interest (
                  {(nextRewards.toNumber() / 10).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                  ) in{" "}
                </div>
                <YourNextInterestIn />
              </div>
            </div>
          </div>
          <div className="pb-2 px-6 tablet:flex tablet:space-x-6 space-y-4 tablet:space-y-0 mb-6">
            <div className="w-full">
              <ReinvestStakingRewardsButton />
            </div>
            {WithdrawButton(true)}
          </div>
          {/* AFFILIATE REWARDS */}
          <div className="w-full border-t-2 border-white pt-6">
            <div
              style={{ fontSize: calcRem(22) }}
              className="w-full px-12 flex justify-between items-center"
            >
              <div>Your affiliate commissions</div>
              <div>${affiliateRewardsAvailabile.toNumber()}</div>
            </div>
          </div>
          <div className="pt-6 tablet:flex tablet:space-x-6 space-y-4 tablet:space-y-0 mb-6">
            <div className="w-full px-6">
              <ReinvestAffiliateRewardsButton />
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .your-staking {
            }
            @media (min-width: 1024px) {
              .your-staking {
                min-height: ${calcRem(320)};
              }
              .your-interest-content {
                min-height: ${calcRem(274)};
              }
            }
          `}
        </style>
      </div>
    );
  };

  return (
    <div
      className={classNames(
        "laptop:container mx-auto px-6 py-20 w-full grid grid-cols-1 laptop:grid-cols-2 gap-6 items-start justify-center",
        className
      )}
    >
      <YourStaking />
      <YourInterest />
    </div>
  );
}
