import { StyleSheet } from "react-native";
import colors from "./colors";
import appInfo from "./appInfo";
import typography from "./typography";



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
          
    },
    text:{
        fontFamily:typography.fontFamily.regular,
        fontSize:typography.fontSizeSmall,
        color:colors.text
    },
    button:{
        flexDirection:'row',
        borderRadius:12,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.white,
        padding:16,
        minHeight:56,
    }
})

export default globalStyles