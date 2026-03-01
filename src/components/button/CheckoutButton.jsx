import { Wallet } from "@mercadopago/sdk-react";
import { useState } from "react";
import axios from "axios";

function CheckoutButton() {
  const [preferenceId, setPreferenceId] = useState(null);

  const createPreference = async () => {
    const response = await axios.post(
      "http://localhost:7256/api/payments/create-preference",
      {
        title: "Juego Digital",
        price: 5000,
      },
    );

    setPreferenceId(response.data.id);
  };

  return (
    <div>
      <button onClick={createPreference}>Pagar</button>

      {preferenceId && (
        <Wallet initialization={{ preferenceId: preferenceId }} />
      )}
    </div>
  );
}

export default CheckoutButton;
