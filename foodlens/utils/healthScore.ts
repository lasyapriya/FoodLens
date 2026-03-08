import { IngredientResult } from "./analyzeIngredients";

export function calculateHealthScore(data:IngredientResult[]) {

  let avoid=data.filter(i=>i.risk==="Avoid").length;
  let caution=data.filter(i=>i.risk==="Caution").length;

  if(avoid>0){

    return {
      rating:"RED",
      color:"#EF4444",
      message:"This product contains potentially harmful ingredients."
    };

  }

  if(caution>2){

    return {
      rating:"YELLOW",
      color:"#FACC15",
      message:"Moderate health concerns detected."
    };

  }

  return {

    rating:"GREEN",
    color:"#22C55E",
    message:"This product appears safe for most individuals."

  };

}
