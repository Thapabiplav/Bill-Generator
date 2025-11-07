
export const toNepaliNumber = (num) => {
  if (num === null || num === undefined) return "";
  const nepaliDigits = ["०","१","२","३","४","५","६","७","८","९"];
  return num.toString().split("").map(d => {
    if (d >= "0" && d <= "9") return nepaliDigits[d];
    return d; 
  }).join("");
};
