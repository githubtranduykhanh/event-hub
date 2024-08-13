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
    },
    inputContainer:{
        flexDirection:'row',
        borderRadius:12,
        borderWidth:1,
        borderColor:colors.inputBorder,
        width:'100%',   
        paddingHorizontal:15,
        paddingVertical:17, 
        alignItems:'center',
        backgroundColor:colors.white,   
    },
    input:{
        padding:0,
        margin:0,
        flex:1,
        fontFamily:typography.fontFamily.regular
    },
    section:{       
        paddingHorizontal:16,
        paddingBottom:20
    },
    row:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    shadow:{
        shadowColor:'rgba(0,0,0,0.5)',
        shadowOffset:{
            width:0,
            height:4
        },
        shadowOpacity:0.25,
        shadowRadius:8,
        elevation:6
    },
    shadowBtn:{
        // Các thuộc tính shadow
        shadowColor: 'rgba(211, 212, 226, 0.25)', // Màu sắc của bóng
        shadowOffset: { width: 15, height: 0 }, // Kích thước của bóng
        shadowOpacity: 0.25, // Độ mờ của bóng
        shadowRadius: 30, // Độ lan tỏa của bóng
        elevation: 5, // Đối với Android
    }
})

export default globalStyles