"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { useState } from "react";
import "../../scss/Dashboards.scss";

export default function CategoryDashboard() {
  const supabase = createClientComponentClient();
  const [name, setName] = useState("");
  const [valid, setValid] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = { name };
    try {
      const res = await fetch("http://localhost:3000/Backend/api/Category", {
        method: "POST",
        body: JSON.stringify(submitData),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        console.log("Yeai!");
        setError("");
        setValid("Category was added");
      } else {
        console.log("Oops! Something is wrong.");
        setValid("");
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setName("");
  };

  return (
    <main className="DashboardContent">
      <div className="DashboardForm" id="AddCategoryForm">
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            className="inputField"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          {valid != "" ? <span style={{ color: "green" }}>{valid}</span> : ""}
          {error != "" ? <span style={{ color: "red" }}>{error}</span> : ""}
          <br />
          <button className="buttonField" type="submit">
            Add Category
          </button>
        </form>
      </div>
      {/* <div id="ViewCategories"></div> */}
    </main>
  );
}
