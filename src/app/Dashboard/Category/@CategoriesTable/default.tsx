"use client";
import Link from "next/link";
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
            setCategories(result.categories);
          });
        } else {
          throw new Error("Something went wrong getting categories");
        }
      } catch (error) {
        console.log(error);
      }
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
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <Link
                  style={{ cursor: "pointer" }}
                  href={`./Dashboard/ViewItems?ctfilter=${encodeURIComponent(
                    item.name
                  )}`}
                >
                  {item.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
