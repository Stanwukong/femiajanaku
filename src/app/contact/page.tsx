import Link from "next/link";
import React from "react";
import { FaCalendarDay } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="flex flex-col py-16 space-y-8 items-center h-screen">
      <h1 className="text-5xl">Contact</h1>
      <div className="flex flex-col space-y-4 max-w-screen-md">
        <h2 className="text-xl">Book a quick call?</h2>
        <Link
          href={"https://cal.com/femiajanaku/book"}
          target="_blank"
          className="flex p-4 w-full border border-black hover:scale-[1.03] transition-all items-center"
        >
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl">1 on 1 Session</h3>
              <span>
                <FaCalendarDay size={25}/>
              </span>
            </div>

            <div>
              Let's find some time to chat! Whether about a project, a query, or
              just for a casual conversation, It&apos;s just one click away!
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
