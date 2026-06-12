"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { fireConfetti } from "@/lib/confetti";

const AMOUNTS = [3000, 5000, 10000, 30000, 50000];

type Scene = "intro" | "reveal" | "form" | "done";

export default function Donate() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  const [scene, setScene] = useState<Scene>("intro");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const [loading, setLoading] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";

  const finalAmount = customAmount ? Number(customAmount) : amount || 0;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!revealRef.current) return;

    gsap.fromTo(
      revealRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    );
  }, []);

  const handlePay = () => {
    if (!name || !email || !finalAmount) {
      alert("Please complete all required fields");
      return;
    }

    setLoading(true);

    const handler = window.PaystackPop.setup({
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

      callback: () => {
        setLoading(false);
        setScene("done");

        fireConfetti();
      },

      onClose: () => {
        setLoading(false);
      },
    });

    handler.openIframe();
  };

  return (
    <section ref={sectionRef} className="donate-cinematic">
      <div className="donate-glow" />

      <div ref={revealRef} className="donate-reveal">
        {/* INTRO */}
        {scene === "intro" && (
          <div className="donate-intro">
            <h2 className="donate-title">A Moment Of Giving</h2>

            <p className="donate-subtitle">
              Your presence is already our greatest gift.
            </p>

            <button
              className="donate-intro-btn"
              onClick={() => setScene("reveal")}
            >
              Yes, I want to
            </button>
          </div>
        )}

        {/* REVEAL */}
        {scene === "reveal" && (
          <div className="donate-reveal-stage">
            <h2 className="fade-in">With Gratitude</h2>

            <p className="fade-in delay">
              If you wish to support us in this journey, we are truly thankful.
            </p>

            <button
              className="donate-intro-btn"
              onClick={() => setScene("form")}
            >
              Continue
            </button>
          </div>
        )}

        {/* FORM */}
        {scene === "form" && (
          <div className="donate-form cinematic">
            <input
              placeholder="Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email *"
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
                  className={amount === a ? "amount active" : "amount"}
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
              {loading ? "Opening Payment..." : "Make Donation"}
            </button>

            <div className="paystack-trust">
              <img src="/images/paystack_icon.svg" alt="Secured by Paystack" />

              <span>Payments are securely processed by Paystack</span>
            </div>
          </div>
        )}

        {/* DONE */}
        {scene === "done" && (
          <div className="donate-thankyou">
            <div className="thankyou-inner">
              <h3>Thank You 🥰</h3>

              <p>Your generosity means the world to us.🥳</p>

              <span className="thankyou-sub">
                With love & gratitudegratitude😊
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
