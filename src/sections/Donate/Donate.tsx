"use client";

import { useEffect, useRef, useState } from "react";
//@ts-ignore
// import PaystackPop from "@paystack/inline-js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AMOUNTS = [3000, 5000, 10000, 30000, 50000];

export default function Donate() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const publicKey =
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const getAmount = () => {
    if (customAmount) return Number(customAmount);
    return amount || 0;
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePay = async () => {
    const finalAmount = getAmount();

    if (!name || !email || !finalAmount) {
      alert("Please complete the form");
      return;
    }

    setLoading(true);

    const PaystackModule = await import("@paystack/inline-js");
    const PaystackPop = (PaystackModule as any).default;
    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: publicKey,
      email,
      amount: finalAmount * 100,

      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: name,
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: phone,
          },
        ],
      },

      onSuccess: () => {
        setLoading(false);
        setDone(true);
      },

      onCancel: () => {
        setLoading(false);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="donate-cinematic"
    >
      <div className="donate-glow" />

      <div ref={revealRef} className="donate-reveal">

        {!done && (
          <>
            <h2 className="donate-title">
              A Moment Of Giving
            </h2>

            <p className="donate-subtitle">
              Your presence is already our greatest gift.
              <br />
              If you wish to contribute, you may do so here.
            </p>

            {!open && (
              <button
                className="donate-intro-btn"
                onClick={() => setOpen(true)}
              >
                Continue
              </button>
            )}
          </>
        )}

        {done && (
          <div className="donate-thankyou">
            <h3>Thank You ♥</h3>
            <p>Your love and support mean everything.</p>
          </div>
        )}

        {open && !done && (
          <div className="donate-form cinematic">

            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="amount-grid">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  className={
                    amount === a
                      ? "amount active"
                      : "amount"
                  }
                  onClick={() => {
                    setAmount(a);
                    setCustomAmount("");
                  }}
                >
                  ₦{a.toLocaleString()}
                </button>
              ))}
            </div>

            <input
              placeholder="Custom Amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setAmount(null);
              }}
            />

            <button
              className="donate-pay"
              onClick={handlePay}
              disabled={loading}
            >
              {loading
                ? "Opening Payment..."
                : "Make Donation"}
            </button>

          </div>
        )}

      </div>
    </section>
  );
}
