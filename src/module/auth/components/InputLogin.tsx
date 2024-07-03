import { Icon } from '@rneui/base';
import React, { memo, useState } from 'react';
import { StyleSheet, TextInputProps, View, TextInput, Pressable, StyleProp, ViewStyle } from 'react-native';
import { normalize } from '@rneui/themed';
import { Colors } from '@styles/theme';

type InputProps = TextInputProps & {
    containerStyle?: StyleProp<ViewStyle>;

    isPassword?: boolean;
};

const InputLogin = ({ containerStyle, style, ...rest }: InputProps) => {
    const [showPass, setShowPass] = useState(false);
    const iconPass = showPass ? 'visibility-off' : 'visibility';
    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput style={[styles.textInput, style]} secureTextEntry={showPass} {...rest} />
            {rest.isPassword && (
                <Pressable style={styles.rightIcon} onPress={() => setShowPass(prev => !prev)}>
                    <Icon type="material-icon" name={iconPass} size={22} color={Colors.Gray} />
                </Pressable>
            )}
        </View>
    );
};

export default memo(InputLogin);

const styles = StyleSheet.create({
    container: {
        height: 64,
        width: 240,
        flexDirection: 'row',
        marginTop: normalize(16),
        borderRadius: 32,
        borderWidth: 0.5,
        borderColor: Colors.Gray_Border,
        elevation: 5,
    },
    textInput: {
        fontSize: normalize(16),
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        borderRadius: 32,
        textAlign: 'center',
    },
    rightIcon: {
        position: 'absolute',
        alignSelf: 'center',
        right: 18,
    },
});
