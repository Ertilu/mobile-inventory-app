import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, AsyncStorage, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import { Block, Input, Button } from 'galio-framework';

import { registerUser } from '../public/actions/userActions';

const Register = props => {
  const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async () => {
		const data = { name, username, email, password }
    await props.registerUser(data);
    alert('Congratulation you accoun has been created');
    props.navigation.navigate('LoginScreen');
	}

	return(
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' enabled>
            <ScrollView>
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <View style={styles.header}>
                <Text style={styles.title}>Create account</Text>
              </View>
              <Block>
                  <Input value={name} onChangeText={value => setName(value)} placeholder="Enter your Full name" color="black" rounded/>
              </Block>
              <Block>
                  <Input value={username} onChangeText={value => setUsername(value)} placeholder="Enter your username" color="black" rounded/>
              </Block>
              <Block>
                  <Input value={email} onChangeText={value => setEmail(value)} placeholder="Enter your email" color="black" rounded/>
              </Block>
              <Block>
                  <Input value={password} onChangeText={value => setPassword(value)} placeholder="Enter your password" password color="black" rounded/>
              </Block>
              <Button style={{width: 100, alignItems: 'center', justifyContent: 'center'}} onPress={login}>
                <Text style={{fontSize: 20, color: 'white'}}>Register</Text>
              </Button>
              <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center'}} onPress={() => props.navigation.navigate('LoginScreen')} success>
		          	<Text style={{fontSize: 12, marginTop: 50}}>Already have account ? Login here</Text>
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

export default connect(mapStateToProps, {registerUser})(Register);