import { useState, useEffect, useContext } from "react";
import "./Account.css";
import { useTranslate } from "../../../hooks/useTranslate";
import { confirmDialog, errorAlert, okAlert } from "../../../utils/SweetAlert";
import axiosInstance from "../../../config/axiosInstance";
import { API_ENDPOINTS } from "../../../config/api.config";
import { AuthContext } from "../../../contexts/auth/AuthContext";

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState("");
  const [lastName, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const { token } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("theFrog-user"));
  const userId = user?.id;
  const translate = useTranslate();

  useEffect(() => {
    const loadAccount = async () => {
      try {
        console.log("👤 Loading account for userId:", userId);
        const res = await axiosInstance.get(API_ENDPOINTS.USER_BY_ID(userId), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        console.log("👤 Account data:", data);
        setUserData(data);
        setAddress(data.address || data.Address || "");
        setLastname(data.lastName || data.LastName || data.lastname || "");
        setCity(data.city || data.City || "");
        setProvince(
          data.province || data.Province || data.state || data.State || "",
        );
        setCountry(data.country || data.Country || "");
      } catch (err) {
        console.error("Error al cargar datos del usuario:", err);
      }
    };
    if (userId) loadAccount();
  }, [userId, token]);

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
      await axiosInstance.patch(API_ENDPOINTS.USER_BY_ID(userId), body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      okAlert({
        title: translate("Confirmed"),
        text: translate("Changes_confirmed"),
      });
    } catch (err) {
      console.error("Error:", err);
      errorAlert({ title: "Error", text: translate("Changes_failed") });
    }
  };

  return (
    <section className="containerAccount">
      <h1>{translate("My_Account")}</h1>

      {userData && (
        <div className="account-user-info">
          <p>
            <strong>{translate("Name")}:</strong>{" "}
            {userData.completeName || userData.name || userData.userName || "-"}
          </p>
          <p>
            <strong>Email:</strong> {userData.email || "-"}
          </p>
          {userData.birthDate && (
            <p>
              <strong>
                {translate("Birth_date") || "Fecha de nacimiento"}:
              </strong>{" "}
              {new Date(userData.birthDate).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      <form className="formAccount" onSubmit={handleSubmit}>
        <label>
          {translate("Address")}:
          <input
            name="direction"
            type="text"
            placeholder={translate("Address")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          {translate("City")}:
          <input
            name="city"
            type="text"
            placeholder={translate("City")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          {translate("State")}:
          <input
            name="state"
            type="text"
            placeholder={translate("State")}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </label>
        <label>
          {translate("Country")}:
          <input
            name="from"
            type="text"
            placeholder={translate("Country")}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <label>
          {translate("Last_name")}:
          <input
            name="last_name"
            type="text"
            placeholder={translate("Placeholder_lastname")}
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
