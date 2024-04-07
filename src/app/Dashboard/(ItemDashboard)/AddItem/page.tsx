"use client";
import "../../../scss/AddItemForm.scss";

import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
interface FormData {
  name: string;
  price: number;
  sale_deduct: number | null;
  sale_start: Date | null;
  sale_end: Date | null;
  category_id: Number | null;
}

export default function AddItem() {
  const [categories, setCategories] = useState<
    { id: number; name: string; createdAt: Date }[]
  >([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    sale_deduct: null,
    sale_start: null,
    sale_end: null,
    category_id: null,
  });
  const [error, setError] = useState("");
  const [valid, setValid] = useState("");
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
  const submitAddDevice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/Backend/api/Device", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        setError("");
        setValid("Category was added");
      } else {
        setValid("");
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
    setFormData({
      name: "",
      price: 0,
      sale_deduct: null,
      sale_end: null,
      sale_start: null,
      category_id: null,
    });
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <main className="DashboardContent">
      <div id="AddItemForm">
        <h1>Add Device</h1>
        <label htmlFor="name"> Name</label> <br />
        <input
          style={{ width: "100%" }}
          id="name"
          className="inputField"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />{" "}
        <br />
        <label htmlFor="price">Price</label> <br />
        <input
          id="price"
          className="inputField"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
        />
        <form onSubmit={submitAddDevice} id="AddItemFormSale">
          <h2>Sale</h2>
          <label htmlFor="saleDeductPrice">Deduct from price</label>
          <br />
          <input
            className="inputField"
            id="saleDeductPrice"
            value={formData.sale_deduct || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                sale_deduct: parseFloat(e.target.value),
              })
            }
          />{" "}
          <br />
          <label htmlFor="saleStartDate">Start Date</label> <br />
          <input
            className="inputField"
            id="saleStartDate"
            type="date"
            value={
              formData.sale_start
                ? formData.sale_start.toISOString().substring(0, 10)
                : ""
            }
            onChange={(e) =>
              setFormData({ ...formData, sale_start: new Date(e.target.value) })
            }
          />{" "}
          <br />
          <label htmlFor="saleEndDate">End Date</label> <br />
          <input
            className="inputField"
            id="saleEndDate"
            type="date"
            value={
              formData.sale_end
                ? formData.sale_end.toISOString().substring(0, 10)
                : ""
            }
            onChange={(e) =>
              setFormData({ ...formData, sale_end: new Date(e.target.value) })
            }
          />{" "}
          <br />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={categories}
            onChange={(event, value) => {
              if (value) setFormData({ ...formData, category_id: value.id });
              else setFormData({ ...formData, category_id: null });
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
          <br />{" "}
          {valid != "" ? <span style={{ color: "green" }}>{valid}</span> : ""}
          {error != "" ? (
            <span style={{ color: "red" }}>{error}</span>
          ) : (
            ""
          )}{" "}
          <br />
          <br />
          <button type="submit" className="buttonField">
            Add Device
          </button>{" "}
        </form>
      </div>
    </main>
  );
}
