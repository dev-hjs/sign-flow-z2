import Link from "next/link";
import PaymentForm from "@/components/PaymentForm";
import SignupForm from "../components/SignupForm";

export default function Home() {
  return (
    <div className="max-w-md m-auto">
      <Link
        href="/payment"
        className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out font-semibold text-lg p-2 rounded-lg"
      >
        결제 페이지로 이동
      </Link>
      <SignupForm />
    </div>
  );
}
