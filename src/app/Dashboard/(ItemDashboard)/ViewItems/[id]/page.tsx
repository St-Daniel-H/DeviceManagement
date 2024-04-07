"use client";
import { useEffect, useState } from "react";
import api from "@/app/components/link";
import UpdateDeviceForm from "@/app/components/UpdateDeviceForm";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
interface FormData {
  name: string;
  price: number;
  sale_deduct: number | null;
  sale_start: Date | null;
  sale_end: Date | null;
  category_id: Number | null;
  id: Number | null;
}
export default function ViewItemWithId({ params }: { params: any }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 0,
    sale_deduct: null,
    sale_start: null,
    sale_end: null,
    category_id: null,
    id: params.id,
  });
  const router = useRouter();

  const [device, setDevice] = useState<{
    id: number;
    name: string;
    createdAt: Date;
    Category: { name: string };
    price: number;
    sale_start: Date;
    sale_end: Date;
    sale_deduct: number;
  }>();

  const getItemDetails = async () => {
    try {
      const result = await fetch(`${api}/Device/ById?id=${params.id}`, {
        method: "GET",
      });
      if (result.ok) {
        result.json().then((result) => {
          setDevice(result[0]);
          if (!result[0]) {
            router.push("/Dashboard/ViewItems");
          }
          setFormData({
            id: result[0].id,
            name: result[0].name,
            price: result[0].price,
            sale_deduct: result[0].sale_deduct,
            sale_start: result[0].sale_start,
            sale_end: result[0].sale_end,
            category_id: result[0].category_id,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async () => {
    try {
      const result = await fetch(`${api}/Device/ById?id=${params.id}`, {
        method: "DELETE",
      });
      if (result.ok) {
        result.json().then((result) => {
          if (!result.error) {
            router.push("/Dashboard/ViewItems");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getItemDetails();
  }, []);
  const [updateState, setUpdateState] = useState(false);
  return (
    <div className="DashboardContent">
      {!updateState ? (
        <div id="DeviceDetails" className="AddItemForm">
          <h1>Device Details</h1>
          <br />
          <div style={{ display: "flex", alignItems: "end" }}>
            <h3 style={{ margin: "0", marginRight: "5px" }}>Name:</h3>
            <span style={{ margin: "0" }}>{device?.name}</span>
          </div>{" "}
          <br />
          <div style={{ display: "flex", alignItems: "end" }}>
            <h3 style={{ margin: "0", marginRight: "5px" }}>Price:</h3>
            <span style={{ margin: "0" }}>{device?.price}</span>
          </div>{" "}
          <br />
          <div style={{ display: "flex", alignItems: "end" }}>
            <h3 style={{ margin: "0", marginRight: "5px" }}>Sale deduction:</h3>
            <span style={{ margin: "0" }}>
              {device?.sale_deduct != 0 && device?.sale_deduct != null
                ? device?.sale_deduct
                : "0"}
            </span>
          </div>
          <br />
          <div style={{ display: "flex", alignItems: "end" }}>
            {" "}
            <h3 style={{ margin: "0", marginRight: "5px" }}>Sale Period:</h3>
            {device?.sale_start != null && device?.sale_end != null ? (
              <span style={{ margin: "0" }}>
                {format(device.sale_start, "yyyy-MM-dd")} to&nbsp;
                {format(device.sale_end, "yyyy-MM-dd")}
              </span>
            ) : (
              <i>Not on sale</i>
            )}
          </div>{" "}
          <br />
          <div style={{ display: "flex", alignItems: "end" }}>
            <h3 style={{ margin: "0", marginRight: "5px" }}>Category: </h3>
            {device?.Category.name}
          </div>
        </div>
      ) : (
        <UpdateDeviceForm formData={formData} setFormData={setFormData} />
      )}
      <br />
      <div
        className="AddItemForm"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button
          onClick={() => {
            setUpdateState(!updateState);
          }}
          className="buttonField"
          id="UpdateButton"
        >
          {!updateState ? "Update" : "Cancel"}
        </button>
        <button
          onClick={() => {
            deleteItem();
          }}
          className="DeleteButton"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
