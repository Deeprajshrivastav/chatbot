import React  from "react";
  
import SideBar from "./Sidebar";
 


export default function Layout({ children }) {
   

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
           
          {children}
          
        </div>
      </div>
    </>
  );
}