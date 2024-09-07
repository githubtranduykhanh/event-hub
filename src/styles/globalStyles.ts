import { Platform, StyleSheet } from "react-native";
import colors from "./colors";
import appInfo from "./appInfo";
import typography from "./typography";



const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    imageOnboarding: {
        flex: 1,
        width: appInfo.size.WIDTH,
        height: appInfo.size.HEIGHT,
        resizeMode: 'cover'
    },
    arrowsText: {
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,

    },
    text: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSizeSmall,
        color: colors.text
    },
    button: {
        flexDirection: 'row',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 17,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
        fontFamily: typography.fontFamily.regular
    },
    section: {
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    shadow: {
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6
    },
    shadowBtn: {
        // Các thuộc tính shadow
        shadowColor: 'rgba(211, 212, 226, 0.25)', // Màu sắc của bóng
        shadowOffset: { width: 15, height: 0 }, // Kích thước của bóng
        shadowOpacity: 0.25, // Độ mờ của bóng
        shadowRadius: 30, // Độ lan tỏa của bóng
        elevation: 5, // Đối với Android
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    inputVerication: {
        height: 55,
        width: 55,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.gray2,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: typography.fontSizeExtraLarge,
        fontFamily: typography.fontFamily.bold,
        textAlign: 'center',
    },
    tag: {
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 9,
    },
    shadowBox: {
        shadowColor: 'rgba(46, 46, 79, 0.12)', // Màu của shadow
        shadowOffset: { width: 0, height: 6 }, // Vị trí của shadow
        shadowOpacity: 1, // Độ mờ của shadow
        shadowRadius: 20, // Bán kính của shadow
        elevation: 10, // Độ cao của shadow trên Android
    },
    card: {
        borderRadius: 12,
        backgroundColor: colors.white,
        padding: 9,
        margin: 8,
        marginBottom: 16
    },
    shadowCard: {
        shadowColor: Platform.OS === 'ios' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },
    shadowBottom: {
        shadowColor: 'rgba(90, 90, 90, 0.10)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 20, // Chỉ dành cho Android
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Phần nền transparent
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default globalStyles