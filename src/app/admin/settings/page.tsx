import Link from "next/link";
import { title } from "process";
import React from "react";

function Settings() {
  const SettingData = [
    {
      title: "Update Profile",
      description: "Update your profile information",
      buttonTitle: "Update",
      href: "/admin/settings/update-profile",
    },
    {
      title: "Change Password",
      description: "Change your Password",
      buttonTitle: "Change",
      href: "/admin/settings/change-password",
    },
  ];
  return (
    <div className=" p-3 ">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className=" flex w-full flex-col gap-4 justify-center items-center ">
        {SettingData.map((item, index) => {
          return (
            <div
              key={index}
              className=" flex w-full p-3 mt-3 justify-between items-center rounded-lg shadow-md "
            >
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-[16px]">{item.description}</p>
              </div>
              <Link href={`${item.href}`}>
                <div className=" p-2 border border-blue-400 text-blue-400 rounded-lg  ">
                  {item.buttonTitle}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Settings;
