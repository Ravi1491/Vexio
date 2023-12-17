import { useState } from "react";
import mail from "../assets/mail.png";
import send from "../assets/send.png";
import SendRequest from "../components/SendRequestModal";

export default function Reviews() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-between items-center">
        <span className="text-[30px] text-[#012970] font-medium">
          Reviews Overview
        </span>
        <div
          className="bg-[#FF4495] px-4 py-3 rounded-full cursor-pointer hover:bg-opacity-70"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <span className="text-white">+ New Request</span>
        </div>
      </div>
      <div className="-mt-2">
        <span className="text-sm text-gray-500">
          Get reviews overview at one place
        </span>
      </div>
      <div>
        <table className="rounded mt-10 w-full">
          <tr className="bg-[#FF4495] bg-opacity-20">
            <th className="md:px-10 px-5 py-5 text-left text-gray-500 ">
              Order Id
            </th>
            <th className="md:px-10 px-5 py-5 text-left text-gray-500">
              Product
            </th>
            <th className="md:px-10 px-5 py-5 text-left text-gray-500">
              Customer Email
            </th>
            <th className="md:px-10 px-5 py-5 text-left text-gray-500">
              Action
            </th>
          </tr>
          <tr className="bg-gray-300 bg-opacity-30 text-sm text-gray-500">
            <td className="md:p-10 sm:p-5 p-1">4523</td>
            <td className="md:p-10 sm:p-5 p-1 line-clamp-1">
              ADIDAS | CLASSIC BACKPACK | LEGEND INK MULTICOLOUR
            </td>
            <td className="md:p-10 sm:p-5 p-1 text-blue-700">
              <div className="flex items-center gap-2">
                <img src={mail} alt="mail" width={20} height={20} />
                ishitaarora382@gmail.com
              </div>
            </td>
            <td className="md:p-10 sm:p-5 p-1">
              <div className="flex items-center gap-2">
                <img src={send} alt="mail" width={20} height={20} />
                Send
              </div>
            </td>
          </tr>
          <tr className="bg-gray-300 bg-opacity-30 text-sm text-gray-500">
            <td className="md:p-10 sm:p-5 p-1">4523</td>
            <td className="md:p-10 sm:p-5 p-1 line-clamp-1">
              ADIDAS | CLASSIC BACKPACK | LEGEND INK MULTICOLOUR
            </td>
            <td className="md:p-10 sm:p-5 p-1 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <img src={mail} alt="mail" width={20} height={20} />
                ishitaarora382@gmail.com
              </div>
            </td>
            <td className="md:p-10 sm:p-5 p-1">
              <div className="flex items-center gap-2">
                <img src={send} alt="mail" width={20} height={20} />
                Send
              </div>
            </td>
          </tr>
          <tr className="bg-gray-300 bg-opacity-30 text-sm text-gray-500">
            <td className="md:p-10 sm:p-5 p-1">4523</td>
            <td className="md:p-10 sm:p-5 p-1 line-clamp-1">
              ADIDAS | CLASSIC BACKPACK | LEGEND INK MULTICOLOUR
            </td>
            <td className="md:p-10 sm:p-5 p-1 text-sm text-blue-700">
              <div className="flex items-center gap-2">
                <img src={mail} alt="mail" width={20} height={20} />
                ishitaarora382@gmail.com
              </div>{" "}
            </td>
            <td className="md:p-10 sm:p-5 p-1">
              <div className="flex items-center gap-2">
                <img src={send} alt="mail" width={20} height={20} />
                Send
              </div>
            </td>
          </tr>
        </table>
      </div>
      <SendRequest isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
