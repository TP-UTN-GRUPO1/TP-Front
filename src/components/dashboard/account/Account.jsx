import { useState } from "react";
import "./Account.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, errorAlert, okAlert } from "../../../utils/SweetAlert";

const Account = () => {
  const [address, setAddress] = useState("");
  const [lastName, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const translate = useTranslate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const confirmed = await confirmDialog({
          title: translate("Confirm_Changes"),
          text: translate("Are_you_sure"),
          confirmButtonText: translate("Yes_Confirm"),
          cancelButtonText: translate("Cancel"),
        });
    if (!confirmed) return;

    const body = { id: userId, address, lastName, city, province, country };

    try {
      const response = await fetch("http://localhost:3000/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
       okAlert({
      title: translate("Confirmed"),
      text: translate("Changes_confirmed"),
    })
    } catch (err) {
      console.error("Error:", err);
       errorAlert({ title: "Error", text: translate("Changes_failed") });
    }
  };

  return (
    <section className="containerAccount">
      <h1>{translate("My_Account")}</h1>
      <form className="formAccount" onSubmit={handleSubmit}>
        <label>
          {translate("Address")}:
          <input
            type="text"
            placeholder={translate("Address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          {translate("City")}:
          <input
            type="text"
            placeholder={translate("City")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          {translate("State")}:
          <input
            type="text"
            placeholder={translate("State")}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </label>

        <label>
          {translate("Country")}:
          <input
            type="text"
            placeholder={translate("Country")}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label>
          {translate("Last_name")}:
          <input
            type="text"
            placeholder={translate("Last_name")}
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <button type="submit" onClick={handleSubmit}>
          {translate("Save_Changes")}
        </button>
      </form>
    </section>
  );
};

export default Account;
