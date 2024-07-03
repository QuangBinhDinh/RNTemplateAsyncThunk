import { useAppDispatch } from '@store/hook';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { navigate } from '@navigation/service';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@styles/theme';
import { userLogin } from './service';
import { LoginParams } from './type';
import InputLogin from './components/InputLogin';
import { normalize } from '@styles/normalize';

const INPUT_WIDTH = normalize(300);
const INPUT_HEIGHT = normalize(64);

const LoginScreen = () => {
    const insets = useSafeAreaInsets();
    const [input, setInput] = useState<LoginParams>({
        username: '',
        password: '',
    });
    const [errorMsg, setError] = useState('');
    const changeInput = (name: string) => (value: string) => {
        setInput(prev => ({ ...prev, [name]: value }));
    };

    const dispatch = useAppDispatch();
    const toLogin = async () => {
        if (!!input.username && !!input.password) {
            let success = false;
            try {
                const user = await dispatch(userLogin({ params: input })).unwrap();
                success = true;
            } catch (e) {
            } finally {
                if (!success) {
                    // alert something
                } else navigate('HomeScreen');
            }
        }
    };

    const validate = () => {
        const errMsg = !input.username
            ? 'Vui lòng nhập tên đăng nhập'
            : !input.password
            ? 'Vui lòng nhập mật khẩu'
            : '';
        if (errMsg) {
            setError(errMsg);
            return false;
        } else {
            setError(errMsg);
            return true;
        }
    };
    const submitLogin = () => {
        if (!validate()) return;

        // do some axios call
    };

    return (
        <View style={styles.container}>
            <View style={{ height: 150 }} />
            <InputLogin
                value={input.username}
                onChangeText={changeInput('username')}
                containerStyle={{ width: INPUT_WIDTH, height: INPUT_HEIGHT }}
                placeholder="Tên đăng nhập"
            />
            <InputLogin
                value={input.password}
                onChangeText={changeInput('password')}
                isPassword
                containerStyle={{ width: INPUT_WIDTH, height: INPUT_HEIGHT }}
                placeholder="Mật khẩu"
            />
            <Text style={styles.isError}>{errorMsg}</Text>
            <Pressable style={styles.loginButton} onPress={submitLogin}>
                <Text style={styles.buttonTitle}>{'Đăng nhập'}</Text>
            </Pressable>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    isError: {
        fontSize: normalize(13),
        color: Colors.Error,
        marginTop: normalize(30),
    },

    loginButton: {
        height: INPUT_HEIGHT,
        width: INPUT_WIDTH,
        marginTop: normalize(80),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Primary,
    },
    buttonTitle: {
        fontSize: normalize(18),
        color: 'white',
        fontWeight: '700',
    },
});
