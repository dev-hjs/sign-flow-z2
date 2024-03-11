import Link from "next/link";
import PaymentForm from "@/components/PaymentForm";
import SignupForm from "../components/SignupForm";

export default function Home() {
  return (
    <>
      <SignupForm />
      <Link href="/payment">결제</Link>
    </>
  );
}
