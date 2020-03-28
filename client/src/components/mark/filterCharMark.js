export default function(type) {
  switch (type) {
    case "A":
      return "green";
    case "B":
      return "blue";
    case "C":
      return "yellow";
    case "D":
      return "purple";
    case "F":
      return "red";
    default:
      return "black";
  }
}
