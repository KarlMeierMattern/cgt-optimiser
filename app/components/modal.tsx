import React, { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export const ModalDialog = ({ children, onClose }: ModalProps) => {
  return (
    <>
      <div className="background-modal fixed" onClick={onClose}></div>
      <div className="dialog flex flex-col justify-between p-6 rounded-lg shadow-lg overflow-y-auto">
        {children}
        <button className=" bg-slate-400 rounded-md p-2 mt-8" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};

export const DialogHeader = () => {
  return (
    <>
      <div className="text-4xl text-white pt-4 pb-4 text-center font-bold">
        How this tool helps
      </div>
      <p>
        This tool helps you determine which stocks to sell in your portfolio in
        order to fully utilise your R40k{" "}
        <a
          href="https://www.sars.gov.za/tax-rates/income-tax/capital-gains-tax-cgt/"
          className="underline text-pink-200"
          target="_blank"
          rel="noreferrer noopener"
        >
          Capital Gains Tax (CGT)
        </a>{" "}
        exclusion. It does this by ranking stocks by the highest gain per
        transaction. It suggests selling shares in that order until your CGT
        exclusion is fully utilised. It calculates the exact number of shares to
        sell, ensuring maximum tax-free profit.
      </p>
    </>
  );
};

export const DialogContent = () => {
  return (
    <div>
      <p className="text-2xl font-bold pt-4 pb-4">
        But what is the CGT annual exclusion?
      </p>
      <p>
        As a natural person in South Africa you are entitled to an annual
        exclusion on your capital gains of R40k. This mean if you buy 10 shares
        of Company X for R10k per share and sell them for R14k per share your
        gain would be calculated as 10 shares x (14k - 10k) = 40k. This would be
        tax free. If the share price was R15k instead, then your total gain
        would be 10 shares x (15k - 10k) = 50k. The first 40k would be tax free
        and the remaining 10k would be taxed.
      </p>
      <p className="text-2xl font-bold pt-4 pb-4">What the tool does</p>
      <ul>
        <li>• Ranks stocks by highest gain per transaction.</li>
        <li>
          • Suggests selling shares in that order until the R40k CGT exclusion
          is used up.
        </li>
        <li>
          • Calculates the exact number of shares to sell, ensuring maximum
          tax-free profit.
        </li>
      </ul>
      <p className="text-2xl font-bold pt-4 pb-4">Why this is important</p>
      <p>
        By focusing on the highest percentage gain first, you ensure you’re
        locking in the most profit, while strategically using your R40k
        exclusion across multiple stock sales. This method helps you optimise
        your portfolio for tax efficiency, reducing the amount you owe in CGT.
      </p>
      <p className="text-2xl font-bold pt-4 pb-4">Example</p>
      <p>
        1. Company A • Bought 10 shares @ R5,000, current price is R5,500, total
        gain = R5,000
      </p>
      <p>
        2. Company B • Bought 10 shares @ R7,000, current price is R10,000,
        total gain = R30,000
      </p>
      <p>
        3. Company C • Bought 10 shares @ R1,000, now R1,800, total gain =
        R8,000
      </p>
      <p className="pt-4">
        The tool will rank these transactions in descending order by the total
        gain, meaning transaction 2 (Company B) will be first, followed by
        transaction 3, and then transaction 1. The tool will then suggest
        selling all 10 shares of Company B and all 10 shares of Company C. This
        will consume R38k of your annual exclusion. The tool will then suggest a
        partial sale of your Company A position of 4 shares in order to fully
        utilise your R40k annual exclusion.
      </p>
    </div>
  );
};
