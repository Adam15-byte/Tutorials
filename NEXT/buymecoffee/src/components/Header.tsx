"use client";

import React, { FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faUser } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

interface Props {
  session: Session | null;
}

const Header: FC<Props> = ({ session }) => {
  const name = session?.user?.name || "";
  return (
    <header className="bg-white">
      <div className="flex justify-between max-w-4xl mx-auto px-4 py-4">
        <Link href={"/"} className="gap-1 inline-flex">
          <FontAwesomeIcon className="h-8" icon={faMugHot} />
          <span className="mt-2">Buy me a coffee</span>
        </Link>
        <nav className="mt-2">
          <ul className="flex gap-4 items-center">
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/FAQ"}>FAQ</Link>
            </li>
            <li>
              <Link href={"/contact"}>Contact</Link>
            </li>
            {!!session && (
              <Link
                href={`/profile`}
                className="flex gap-2 items-center mr-2 rounded-full border-yellow-300 border-2 px-4 py-2"
              >
                <Image
                  src={session.user?.image || ""}
                  alt="avatar"
                  width="24"
                  height="24"
                  className="rounded-full"
                />
                <span>{name}</span>
              </Link>
            )}
            {!!session && (
              <li>
                <button
                  onClick={() => signOut()}
                  className="bg-yellow-300 rounded-full px-4 py-2"
                >
                  Logout
                </button>
              </li>
            )}
            {!session && (
              <li className="ml-4">
                <button
                  onClick={() => signIn()}
                  className="border-2 rounded-full px-4 py-2"
                >
                  Login
                </button>
              </li>
            )}
            {!session && (
              <li>
                <button className="bg-yellow-300 rounded-full px-4 py-2">
                  Sign up
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
