import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
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
        <div className="success-container success">
          <div className="icon success-icon">
            <Image
              src="/images/successIcon.svg"
              alt="programs"
              width={100}
              height={50}
              className=""
            />
          </div>
          <p className="success-h1">Payment Successful!</p>
          <p className="success-p">
            Thank you for your purchase. Your payment has been processed
            successfully.
          </p>
          <Link href="/" className="button">
            Return to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
