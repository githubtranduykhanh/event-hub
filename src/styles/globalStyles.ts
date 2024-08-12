import { StyleSheet } from "react-native";
import colors from "./colors";
import appInfo from "./appInfo";



const globalStyles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white
    },
    imageOnboarding:{
        flex:1,
        width:appInfo.size.WIDTH,
        height:appInfo.size.HEIGHT,
        resizeMode:'cover'
    },
    arrowsText:{
        position:'absolute',
        bottom:20,
        paddingHorizontal:20,
        paddingVertical:5,          
    }
})

export default globalStyles