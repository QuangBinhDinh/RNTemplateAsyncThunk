import { Platform, PixelRatio, Dimensions } from 'react-native';

/**
 * Kích thước chiều rộng màn hình của bản phác thảo (figma).
 *
 * Lấy độ dài này làm base để scale cho kích thước khác
 */
const BASE_WIDTH = 375;

/**
 * Normalize size trên các thiết bị khác nhau
 * @param size
 * @returns
 */
export function normalize(size: number) {
    // let checkTablet = DeviceInfo.isTablet();
    var newSize = size * (Dimensions.get('screen').width / BASE_WIDTH);
    // if (checkTablet) {
    //   if (Platform.OS === "ios") {
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize));
    //   } else {
    //     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    //   }
    // } else {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
    }
    // }
}
