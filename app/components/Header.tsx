import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <ul className="flex justify-center gap-10">
      <li>
        <Link href="/">home</Link>
      </li>
      <li>
        <Link href="/cart">cart</Link>
      </li>
      <li>
        <Link href="/checkout">checkout</Link>
      </li>
      <li>
        <Link href="/dashboard">dashboard</Link>
      </li>
      <li>
        <Link href="/login">login</Link>
      </li>
      <li>
        <Link href="/signup">signup</Link>
      </li>
      <li>
        <Link href="/products">products</Link>
      </li>
    </ul>
  );
}
