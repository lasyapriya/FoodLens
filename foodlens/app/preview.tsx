import { View,Text,StyleSheet,Image,Pressable } from "react-native";
import { useLocalSearchParams,useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

const GOOGLE_VISION_KEY="YOUR_GOOGLE_VISION_API_KEY";

export default function PreviewScreen(){

  const {uri}=useLocalSearchParams();
  const router=useRouter();
  const [loading,setLoading]=useState(false);

  const scanImage=async()=>{

    setLoading(true);

    const base64=await FileSystem.readAsStringAsync(uri as string,{
      encoding:FileSystem.EncodingType.Base64
    });

    const response=await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_KEY}`,
      {
        method:"POST",
        body:JSON.stringify({
          requests:[{
            image:{content:base64},
            features:[{type:"TEXT_DETECTION"}]
          }]
        })
      }
    );

    const result=await response.json();

    const text=result.responses?.[0]?.fullTextAnnotation?.text || "";

    const lines=text.split("\n");

    let ingredientSection="";

    for(const line of lines){

      const l=line.toLowerCase();

      if(
        l.includes("ingredient") ||
        l.includes("ingredients") ||
        l.includes("ing:")
      ){

        ingredientSection=line;
        break;

      }

    }

    if(!ingredientSection){
      ingredientSection=lines.join(",");
    }

    router.push({
      pathname:"/ingredients",
      params:{ingredients:ingredientSection}
    });

  };

  return(

    <View style={styles.container}>

      <Image source={{uri:uri as string}} style={styles.image}/>

      <Pressable style={styles.button} onPress={scanImage}>
        <Text style={styles.buttonText}>
          {loading?"Scanning...":"Analyze Ingredients"}
        </Text>
      </Pressable>

    </View>

  );

}

const styles=StyleSheet.create({
  container:{flex:1,justifyContent:"center",alignItems:"center"},
  image:{width:"90%",height:300,resizeMode:"contain"},
  button:{backgroundColor:"#0284C7",padding:16,borderRadius:10,marginTop:20},
  buttonText:{color:"#fff",fontSize:16}
});
