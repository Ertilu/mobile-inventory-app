import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, AsyncStorage, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { Block, Input, Button } from 'galio-framework';

import { loginUser } from '../public/actions/userActions';

const Login = props => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		const data = { username, password }
		await props.loginUser(data);
	}

	useEffect(() => {
		if ( !props.user.token && props.user.isLogged === true ) {
      alert('wrong username/password');
		} else if (props.user.token && props.user.isLogged === true) {
      const {token, name, username, email} = props.user;
      AsyncStorage.setItem('token', token);
      AsyncStorage.setItem('name', name);
			AsyncStorage.setItem('username', username);
			AsyncStorage.setItem('email', email);
      props.navigation.navigate('App');
    }
	}, [props.user.isLogged])

	return(
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' enabled>
            <ScrollView>
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <View style={styles.header}>
                <Text style={styles.title}>Login Here</Text>
              </View>
              <Block>
                  <Input value={username} onChangeText={value => setUsername(value)} placeholder="Enter your username" color="black" rounded/>
              </Block>
              <Block>
                  <Input value={password} onChangeText={value => setPassword(value)} placeholder="Enter your password" password color="black" rounded/>
              </Block>
              <Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={login}>
                <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
              </Button>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.navigate('RegisterScreen')} success>
		          	<Text style={{fontSize: 12, marginTop: 50}}>Dont have account ? Register here</Text>
		          </TouchableOpacity>
            </View>
            </ScrollView>
        </KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
    description: {
      fontSize: 14,
      color: 'white',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    input: {
      margin: 20,
      marginBottom: 0,
      height: 34,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: '#ccc',
      borderWidth: 1,
      fontSize: 16,
    },
})

const mapStateToProps = state => ({
	user: state.user,
})


export default connect(mapStateToProps, {loginUser})(Login);