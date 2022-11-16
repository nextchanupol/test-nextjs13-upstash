"use client";
import React from "react";


function LogoutButton() {
  return (
    <div>
      <button onClick={()=>console.log('sign out')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Out
      </button>
    </div>
  );
}

export default LogoutButton;
