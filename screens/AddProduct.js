import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  View,
  Picker,
  TextInput,
  Keyboard,
  Animated, 
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { materialTheme, products, Images } from '../constants/';
import { Select, Icon, Header, Product, Switch } from '../components/';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import axios from 'axios';
import HomeScreen from './Home';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Ionicons, Foundation, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

export default class AddProduct extends React.Component {
    state={
        'pName': '',
        'pDesc': '',
        'pImage': '',
        'idCategory': '1',
        'pQty': '',
        'pDateAdded': new Date(),
        'pDateUpdated': new Date()
      }
    
      componentWillMount () {
       if (Platform.OS=='ios'){
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
       }else{
        this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
       }
    
      }
    
      componentWillUnmount() {
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
      }

      handlerSubmit = () => {
        axios
        .post('http://192.168.43.24:8000/products', this.state)
        .then(function (response) {
          alert('new data added');
        })
        .catch(function (error) {
          alert(error);
        }); 
      }

    render() {
        return(
            <View style={{flex:1,backgroundColor:'#4c69a5',alignItems:'center'}}>
            <ScrollView style={{flex: 1}}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                    enabled
                >
                        <React.Fragment>
                            <Block>
                                <Text bold size={16} style={styles.text}>Add new product</Text>
                            </Block>
                            <Block flex style={styles.group}>
                                <Text bold size={16} style={styles.title}>Product name</Text>
                                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                                    <Input
                                        right
                                        color="black"
                                        placeholder="Enter product name"
                                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                                        onChangeText={(pName) => this.setState({pName})}
                                    />
                                </Block>
                            </Block>
                            <Block flex style={styles.group}>
                                <Text bold size={16} style={styles.title}>Description</Text>
                                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                                    <Input
                                        right
                                        color="black"
                                        placeholder="Enter product description"
                                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                                        onChangeText={(pDesc) => this.setState({pDesc})}
                                    />
                                </Block>
                            </Block>
                            <Block flex style={styles.group}>
                                <Text bold size={16} style={styles.title}>Image</Text>
                                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                                    <Input
                                        right
                                        color="black"
                                        placeholder="Enter product image (URL)"
                                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT, color: 'red' }}
                                        onChangeText={(pImage) => this.setState({pImage})}
                                    />
                                </Block>
                            </Block>
                            <Block flex style={styles.group}>
                                <Text bold size={16} style={styles.title}>Select Category</Text>
                                <Picker
                                    selectedValue={this.state.idCategory}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({idCategory: itemValue})
                                    }
                                    style={{width: 200}}
                                    >
                                    <Picker.Item label="Daily needs" value="1"  />
                                    <Picker.Item label="Electronic" value="2" />   
                                    <Picker.Item label="Food & Drink" value="3" />   
                                    <Picker.Item label="Automotive" value="4" />   
                                </Picker>
                            </Block> 
                            <Block flex style={styles.group}>
                                <Text bold size={16} style={styles.title}>Quantity</Text>
                                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                                <Input
                                    right
                                    type="numeric"
                                    color="black"
                                    placeholder="Enter product quantity"
                                    placeholderTextColor={materialTheme.COLORS.DEFAULT}
                                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                                    onChangeText={(pQty) => this.setState({pQty})}
                                />
                                </Block>
                            </Block>  
                            <Button onPress={this.handlerSubmit.bind(this)}>Add data</Button>
                        </React.Fragment>
                    <KeyboardSpacer />
                </KeyboardAvoidingView>
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 10,
        },
    inputStyle: {
        flex: 1,
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 50,
    },
    title: {
        margin: 20,
    },
    scroll: {
        width: width - theme.SIZES.BASE * 2,
        paddingVertical: theme.SIZES.BASE * 2,
        textAlign: 'center',
    },
    container: {
        backgroundColor: 'lightblue',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    input: {
        height: 50,
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginVertical: 5,
        // paddingVertical: 5,
        // paddingHorizontal: 15,
        width: width - 30,
      },
      register:{
        marginBottom:20, 
        width:width -100,
        alignItems:'center',
        justifyContent:'center',
        height:50,
        backgroundColor: '#ffae',
    },  
});
