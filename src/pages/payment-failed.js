import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function PaymentFailure() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/order-request");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div>
      <Head>
        <title>City Logistics - Payment Failure</title>
        <meta
          name="description"
          content="Providing exceptional delivery services that exceed your expectations!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="success-container failure">
          <div className="icon success-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-12 text-rose-300"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <p className="success-h1 text-rose-300">Payment Failed</p>
          <p className="success-p">
            We encountered an issue processing your payment. Please try again.
          </p>
          <Link href="/sign-up" className="button">
            Retry Payment
          </Link>
        </div>
      </main>
    </div>
  );
}
