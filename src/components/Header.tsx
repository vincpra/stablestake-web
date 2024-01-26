import { useEffect, useState } from "react";
import { useDepositsContext } from "../context/DepositsContext";
import { useWalletContext } from "context/WalletContext";
import { calcRem } from "utils/styles";
import { METAMASK_LINK } from "./const/links";
import { NavbarButton } from "./utils/NavbarButton";
import { switchNetwork } from "blockchain/wallet";
import { NAME, NETWORK_NAME, TOKEN_SYMBOL } from "./const/constants";
import { shortenedAccount } from "utils/shorten";
import Link from "next/link";
import classNames from "classnames";

export interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const [switchingNetwork, setSwitchingNetwork] = useState(false);
  const [location, setLocation] = useState("");

  const { hasWallet, account, connected, requestConnection, isGoodChainId } =
    useWalletContext();
  const { usdcBalance } = useDepositsContext();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any)?.location)
      setLocation((window as any)?.location.pathname);
  }, [location]);

  const HeaderLogo = () => {
    return (
      <Link href="/" passHref>
        <div className="text-white flex items-center cursor-pointer">
          <img src="logo/ss-logo-header.png" alt="ss logo" width={"38px"} />
          <div className={classNames("tablet:flex items-baseline")}>
            <div
              className="pl-2 font-semibold"
              style={{ fontSize: calcRem(22) }}
            >
              {NAME}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const ConnectedNavbarActions = (): JSX.Element => {
    const balanceClassName = "items-center justify-center font-semibold block";
    const balanceStyle = {
      fontSize: calcRem(14),
    };
    return (
      <div className="flex flex-row items-center">
        <div
          className={classNames(balanceClassName, "text-white items-baseline")}
          style={balanceStyle}
        >
          <div className="hidden tablet:flex flex-row items-baseline">
            <div className="text-base font-bold">{shortenedBalance()}</div>
            <div className="ml-1 font-semibold text-xs opacity-60">
              ${TOKEN_SYMBOL}
            </div>
            {/* <p className="ml-1 text-base font-normal opacity-50" style={{ fontSize: calcRem(14) }}>
              {'(~' +
                (parseFloat(shortenedBalance()) * tokenPrice).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }) +
                ')'}
            </p> */}
          </div>
        </div>

        <div
          className={classNames(
            "button-transition flex justify-between items-center text-left rounded-md text-white pl-4 space-x-4"
          )}
        >
          <div>
            <div className="font-bold" style={{ fontSize: calcRem(16) }}>
              {shortenedAccount(account)}
            </div>
            {/* <div className="opacity-60 font-semibold" style={{ fontSize: calcRem(12) }}>
              CONNECTED
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const shortenedBalance = () => {
    return usdcBalance.toFixed(2);
  };

  return (
    <>
      {/* <div className="bg-blue-marine text-white w-full text-center px-2 py-1">
        New changes coming to {NAME}. Please check our{' '}
        <Link href={TELEGRAM_LINK} passHref>
          <a className="font-bold" target="_blank">
            Telegram announcement channel
          </a>
        </Link>.
      </div> */}
      <div className="w-full desktop:container mx-auto px-5">
        <div
          className={classNames(
            "justify-between px-5 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm w-full desktop:container text-white",
            "flex items-center",
            className
          )}
        >
          <div className="items-baseline flex w-full justify-between px-5 my-4">
            <div className="flex items-center my-auto">
              <div className="pr-4 my-auto">{<HeaderLogo />}</div>
            </div>
            <div className="flex my-auto gap-7">
              <>
                <div className="flex flex-row items-center space-x-4">
                  <>
                    {connected && !isGoodChainId && (
                      <NavbarButton
                        label={
                          switchingNetwork
                            ? "Switching network..."
                            : `Switch to ${NETWORK_NAME}`
                        }
                        onClick={async () => {
                          setSwitchingNetwork(true);
                          try {
                            await switchNetwork();
                          } catch (error: any) {
                            console.error(
                              "An error occurred in switchNetwork():",
                              error
                            );
                          } finally {
                            setSwitchingNetwork(false);
                          }
                        }}
                        className={classNames(
                          "unselectable-text button-transition text-white button-gradient hidden desktop:flex"
                        )}
                      />
                    )}

                    {connected ? (
                      <ConnectedNavbarActions />
                    ) : (
                      <NavbarButton
                        label={hasWallet ? `Connect` : "Install MetaMask"}
                        onClick={() => {
                          hasWallet
                            ? requestConnection()
                            : window.open(METAMASK_LINK, "_blank"); // TODO: add noopener noreferrer
                        }}
                        className={classNames(
                          "unselectable-text border-white text-white bg-green",
                          ""
                        )}
                      />
                    )}
                  </>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
