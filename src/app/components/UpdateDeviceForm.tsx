"use client";
import { Autocomplete, TextField } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import "@/app/scss/AddItemForm.scss";
export default function UpdateDeviceForm({
  formData,
  setFormData,
}: {
  formData: any;
  setFormData: any;
}) {
  const [categories, setCategories] = useState<
    { id: number; name: string; createdAt: Date }[]
  >([]);
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
  const updateDevice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/Backend/api/Device", {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        const responseBody = await res.json();
        console.log(responseBody.error);
        if (responseBody.error) {
          setError(responseBody.error);
          // Handle the error as needed
        } else {
          setError("");
          setValid("Device was updated");
        }
      } else {
        setValid("");
        setError("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <form onSubmit={updateDevice} className="AddItemForm">
      <h1>Update Device</h1>
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
          formData.sale_start ? format(formData.sale_start, "yyyy-MM-dd") : ""
        }
        onChange={(e) => {
          const newDate = e.target.value ? new Date(e.target.value) : null;
          setFormData({
            ...formData,
            sale_start: newDate,
          });
        }}
      />{" "}
      <br />
      <label htmlFor="saleEndDate">End Date</label> <br />
      <input
        className="inputField"
        id="saleEndtDate"
        type="date"
        value={formData.sale_end ? format(formData.sale_end, "yyyy-MM-dd") : ""}
        onChange={(e) => {
          const newDate = e.target.value ? new Date(e.target.value) : null;
          setFormData({
            ...formData,
            sale_end: newDate,
          });
        }}
      />{" "}
      <br />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={categories}
        value={categories.find(
          (category) => category.id == formData.category_id
        )}
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
      {error != "" ? <span style={{ color: "red" }}>{error}</span> : ""} <br />
      <br />
      <button type="submit" className="buttonField">
        Update Device
      </button>{" "}
      <br /> <br />
    </form>
  );
}
