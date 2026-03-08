import { allergenMap } from "./ingredientKnowledge";
import { additiveDB } from "./additiveDB";

export type IngredientResult = {
  name:string;
  risk:"Safe"|"Caution"|"Avoid";
  reason:string;
};

export async function analyzeIngredients(text:string):Promise<IngredientResult[]>{

  if(!text) return [];

  const cleaned=text
    .replace(/ingredients:/i,"")
    .replace(/\(|\)/g,"")
    .toLowerCase();

  const ingredients=cleaned
    .split(/,|;/)
    .map(i=>i.trim());

  const results:IngredientResult[]=[];

  for(const ingredient of ingredients){

    let risk:"Safe"|"Caution"|"Avoid"="Safe";
    let reason="No major health risks detected.";

    for(const key in allergenMap){

      if(ingredient.includes(key)){
        risk="Avoid";
        reason=`Contains ${allergenMap[key]} allergen`;
        break;
      }

    }

    for(const key in additiveDB){

      if(ingredient.includes(key)){
        risk="Caution";
        reason=`Food additive detected (${additiveDB[key]})`;
      }

    }

    if(risk==="Safe"){

      try{

        const res=await fetch(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${ingredient}&search_simple=1&json=1`
        );

        const data=await res.json();

        if(!data.products || data.products.length===0){

          risk="Caution";
          reason="Ingredient not recognized in global database.";

        }

      }catch{

        risk="Caution";
        reason="Database lookup failed.";

      }

    }

    results.push({
      name:ingredient,
      risk,
      reason
    });

  }

  return results;

}
