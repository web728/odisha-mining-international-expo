"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

type CountryData = { dialCode?: string; countryCode?: string; name?: string };

/** UI combines country dial code + number; submitted form has two separate values. */
export function PhoneField({ required = true }: { required?: boolean }) {
  const [dial, setDial] = useState("91");
  const [nationalNumber, setNationalNumber] = useState("");

  const full = dial + nationalNumber;
  return (
    <div className="block sm:col-span-1">
      <label className="text-[11px] font-extrabold uppercase tracking-[.08em] text-zinc-700" htmlFor="ome-phone">
        Mobile / WhatsApp Number {required && <span className="text-brand-dark">*</span>}
      </label>
      <div className="mt-2">
        <PhoneInput
          country="in"
          enableSearch
          countryCodeEditable={false}
          autoFormat={false}
          value={full}
          onChange={(value: string, country: CountryData) => {
            const selectedDial = country.dialCode?.replace(/\D/g, "") || dial;
            const digits = value.replace(/\D/g, "");
            setDial(selectedDial);
            setNationalNumber(digits.startsWith(selectedDial) ? digits.slice(selectedDial.length) : digits);
          }}
          inputProps={{ id: "ome-phone", required, autoComplete: "tel", "aria-label": "Mobile or WhatsApp number" }}
          containerStyle={{ width: "100%" }}
          inputStyle={{ width: "100%", height: "49px", background: "white", borderRadius: 0, border: "1px solid #d4d4d8", fontSize: "14px" }}
          buttonStyle={{ borderRadius: 0, background: "white", border: "1px solid #d4d4d8" }}
          dropdownStyle={{ maxWidth: "min(320px, 90vw)" }}
          searchStyle={{ width: "90%" }}
        />
      </div>
      <input type="hidden" name="countryCode" value={`+${dial}`} />
      <input type="hidden" name="phone" value={nationalNumber} />
      <p className="mt-1 text-xs text-zinc-500">Search a country or calling code. India (+91) is selected by default.</p>
    </div>
  );
}
