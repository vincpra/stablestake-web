import classNames from "classnames";
import Head from "next/head";
import styles from "../styles/Page.module.css";
import React, { ReactNode } from "react";
import { Footer } from "components/Footer";
import { NAME } from "./const/constants";
interface PageProps {
  children: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  className?: string;
}

export function Page({
  children,
  isModalOpen,
  setIsModalOpen,
  className,
}: PageProps) {
  return (
    <div className={classNames(styles.container, "w-full", className)}>
      <Head>
        <title>Home | {NAME}</title>
        <meta
          name="description"
          content="Earn passive rewards in USDT monthly!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta name="facebook-domain-verification" content="" /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>
      {children}
      <Footer className={classNames("")} />
    </div>
  );
}
