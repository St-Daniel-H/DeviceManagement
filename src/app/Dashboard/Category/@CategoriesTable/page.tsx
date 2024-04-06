"use client";
import "../../../scss/Dashboards.scss";

import { useEffect, useState } from "react";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<
    { id: number; name: string; createdAt: Date }[]
  >([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/Backend/api/Category", {
          method: "GET",
        });
        if (res.ok) {
          res.json().then((result) => {
            console.log(result);
            setCategories(result.categories);
          });
        } else {
          throw new Error("Something went wrong getting categories");
        }
      } catch (error) {
        console.log(error);
      }
      console.log(categories);
    };

    getCategories();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button className="buttonField" onClick={() => {}}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
