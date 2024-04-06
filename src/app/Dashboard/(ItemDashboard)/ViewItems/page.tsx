"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { parseISO, format } from "date-fns";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { lt } from "date-fns/locale";

export default function CategoryDashboard() {
  const supabase = createClientComponentClient();
  const [devices, setDevices] = useState<
    {
      id: number;
      name: string;
      createdAt: Date;
      Category: { name: string };
      price: number;
      sale_start: Date;
      sale_end: Date;
      sale_deduct: number;
    }[]
  >([]);
  const [categories, setCategories] = useState<
    { id: number; name: string; createdAt: Date }[]
  >([]);
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
  const getData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/Backend/api/Device?name=${name}&priceeq=${eqPrice}&pricelt=${ltPrice}&pricegt=${gtPrice}&onsale=${onSale}&ctname=${categoryName}`,
        {
          method: "GET",
        }
      );
      console.log(res);
      if (res.ok) {
        res.json().then((result) => {
          console.log(result.Devices);
          setDevices(result.Devices);
        });
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getCategories();
  }, []);
  const [eqPrice, setEqPrice] = useState("");
  const [gtPrice, setGtPrice] = useState("");
  const [ltPrice, setLtPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [name, setName] = useState("");
  const [onSale, setOnSale] = useState(false);

  return (
    <main className="DashboardContent">
      <h1>Devices</h1>
      <div id="ViewItemsFilter">
        <h2>Filter</h2>
        <input
          className="inputField"
          id="filterByName"
          placeholder="Filter by name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          className="inputField"
          id="filterByEqToPrice"
          value={eqPrice}
          type="number"
          placeholder="Price Equal To"
          onChange={(e) => {
            if (parseFloat(e.target.value) > -1 || e.target.value === "")
              setEqPrice(e.target.value);
          }}
        ></input>
        <input
          className="inputField"
          placeholder="Price Greater than"
          id="filterByGtPrice"
          value={gtPrice}
          type="number"
          onChange={(e) => {
            if (parseFloat(e.target.value) > -1 || e.target.value === "")
              setGtPrice(e.target.value);
          }}
        ></input>
        <input
          className="inputField"
          id="filterByltPrice"
          placeholder="Price Less than"
          value={ltPrice}
          type="number"
          onChange={(e) => {
            if (parseFloat(e.target.value) > -1 || e.target.value === "")
              setLtPrice(e.target.value);
          }}
        ></input>
        <br />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={categories}
          onChange={(event, value) => {
            if (value) setCategoryName(value.name);
            else setCategoryName("");
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Category" />}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#24292e",
              color: "white",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFD700",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FFD700",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#FFD700 !important",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFD700 !important",
            },
            "& .MuiButtonBase-root": {
              color: "white",
            },
          }}
        />
        <br />
        <input
          type="checkbox"
          id="filterByOnSale"
          checked={onSale}
          onChange={(e) => {
            setOnSale(e.target.checked);
          }}
          className="CheckBoxField"
        ></input>
        <label style={{ cursor: "pointer" }} htmlFor="filterByOnSale">
          Is On Sale
        </label>
        <br /> <br /> <br />
        <button
          onClick={() => {
            getData();
          }}
          id="filterButton"
          className="buttonField"
        >
          Filter
        </button>
      </div>
      <div className="ContentTable">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sale</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.sale_deduct != null && item.sale_deduct != 0 ? (
                    <span>
                      {" "}
                      {item.price - item.sale_deduct} <i>was {item.price}</i>
                    </span>
                  ) : (
                    item.price
                  )}
                </td>
                <td>{item.Category.name}</td>
                <td>
                  {item.sale_start && item.sale_end != null ? (
                    <span>
                      {format(
                        parseISO(item.sale_start.toString()),
                        "dd-MM-yyyy"
                      )}
                      -{" "}
                      {format(parseISO(item.sale_end.toString()), "dd-MM-yyyy")}
                    </span>
                  ) : (
                    "null"
                  )}
                </td>
                <td>
                  <button onClick={() => {}} className="buttonField">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
