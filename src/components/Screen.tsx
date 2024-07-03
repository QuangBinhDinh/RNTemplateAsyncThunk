import { APP_COLOR } from '@styles/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Screen = ({ children, title }: { children: JSX.Element; title?: string }) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 5 + insets.top / 2, backgroundColor: APP_COLOR }} />
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            {children}
        </View>
    );
};

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        backgroundColor: APP_COLOR,
    },
    title: {
        color: 'azure',
        fontWeight: '700',
        fontSize: 15,
    },
});
