export const ToCurrency = (amount: any) => {
  if (parseFloat(amount) > 0) {
    return parseFloat(amount).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "R$ " + amount;
  }
};
