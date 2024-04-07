"use client";
import "../../../scss/Dashboards.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<
    { id: number; name: string; createdAt: Date }[]
  >([]);
  const searchParams = useSearchParams();
  const ctfilter = searchParams.get("ctfilter");
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/Backend/api/Category", {
          method: "GET",
        });
        if (res.ok) {
          res.json().then((result) => {
            if (ctfilter) {
              const filteredCategories = result.categories.filter(
                (x: any) => x.name === ctfilter
              );
              setCategories(filteredCategories);
            } else setCategories(result.categories);
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
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    cursor: "pointer",
                  }}
                  href={`./ViewItems?ctfilter=${encodeURIComponent(item.name)}`}
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
