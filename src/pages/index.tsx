import { Page } from "../components/Page";
import { useState } from "react";
import { DepositModal } from "../components/modals/createDepositModal/DepositModal";
import { StakingInterest } from "components/StakingInterest";
import { Header } from "components/Header";
import { BottomSection } from "components/BottomSection";
import { useWalletContext } from "context/WalletContext";
import { useDepositsContext } from "context/DepositsContext";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { connected } = useWalletContext();
  const { depositedValue } = useDepositsContext();
  return (
    <Page isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <DepositModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="w-full mx-auto justify-center bg-top">
        <Header className="mt-12" />
        <StakingInterest
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <style jsx>
          {`
            .bg-top {
              background-image: url("/bg/bg-top-dark.png");
              background-origin: center;
              background-size: cover;
            }
            @media (min-width: 1200px) {
              .bg-top {
                background-repeat: repeat;
                background-origin: center;
              }
            }
          `}
        </style>
      </div>
      {connected && depositedValue.toNumber() > 0 && (
        <div className="w-full mx-auto justify-center bg-bottom">
          <BottomSection />
          <style jsx>
            {`
              .bg-bottom {
                background-image: url("/bg/bg-bottom-dark.png");
                background-origin: center;
                background-size: cover;
              }
              @media (min-width: 1200px) {
                .bg-bottom {
                  background-repeat: repeat;
                  background-origin: center;
                }
              }
            `}
          </style>
        </div>
      )}
    </Page>
  );
}
