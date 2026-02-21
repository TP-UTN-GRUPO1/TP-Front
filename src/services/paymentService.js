export const createCheckout = async (orderData) => {
    const response = await fetch("http://localhost:3000/mp/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  
    if (!response.ok) {
      throw new Error("Error creando checkout");
    }
  
    return response.json();
  };
  