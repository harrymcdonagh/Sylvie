"use client";
import { Reveal } from "@/components/utils/Reveal";

const NeedHelp = () => (
  <Reveal>
    <div className="bg-white p-8 rounded-lg shadow-md mb-20">
      <h2 className="text-black text-2xl md:text-3xl font-bold mb-6">
        Still Need Help<span className="text-orange-400">?</span>
      </h2>
      <p className="text-neutral-700 text-lg mb-6">
        If you're experiencing issues that aren't covered here, or if you need additional
        assistance, our support team is ready to help.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-100 p-6 rounded-lg">
          <h3 className="text-black text-xl font-semibold mb-3">Email Support</h3>
          <p className="text-neutral-600 mb-2">
            Send us an email and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:support@sylvie.edu"
            className="text-orange-500 font-medium hover:underline"
          >
            support@sylvie.edu
          </a>
        </div>
        <div className="bg-neutral-100 p-6 rounded-lg">
          <h3 className="text-black text-xl font-semibold mb-3">Live Chat</h3>
          <p className="text-neutral-600 mb-2">
            Chat with our support team during business hours.
          </p>
          <p className="text-neutral-600">Monday-Friday: 9am-5pm EST</p>
        </div>
      </div>
    </div>
  </Reveal>
);

export default NeedHelp;
