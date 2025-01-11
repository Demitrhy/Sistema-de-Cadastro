export default function useNumberFormatter() {
  // Internationalization API Specification (ECMA402)

  var locale =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    "pt-BR";

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const { format: formatPrice } = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "BRL",
  });

  const { format: formatNumber } = new Intl.NumberFormat(locale, {
    style: "decimal",
    currency: "BRL",
    currencyDisplay: undefined,
    minimumFractionDigits: 0,
  });

  const { format: formatPercent } = new Intl.NumberFormat(locale, {
    style: "percent",
    currency: "BRL",
    currencyDisplay: undefined,
  });

  return {formatter, formatPrice, formatNumber, formatPercent};
}
