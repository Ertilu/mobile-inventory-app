import React, { Component } from 'react';
import {Modal, ScrollView, StyleSheet, KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage } from 'react-native';
import Axios from 'axios';
import {ListItem, Avatar, ButtonGroup, SearchBar, Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import {getProducts, addProduct} from '../../publics/actions/Products'
import {getCategory} from '../../publics/actions/Categories'
import { connect } from 'react-redux'
import Card from './Card'
import Footer from '../Footer'

class GetProducts extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalVisible: false,
      query : {
        search: '',
        sortBy: 'date_updated',
        sort: 'asc',
        page: 1,
        limit: 6,
      },
      queryCategory : {
        search: '',
        sortBy: 'category',
        sort: 'asc',
        page: 1,
        limit: 1000,
      },
      formAdd : {
        name: '',
        description: '',
        image: '',
        quantity: 0,
      },
      jwt: '',
      category: '',
      search: ''


    }
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({jwt:token})
    await this.props.dispatch(getCategory(this.state.queryCategory))
    await this.props.dispatch(getProducts(this.state.query))
      // await Axios.get(`http://192.168.1.4:8080/products`)
      //   .then(res => {
      //     this.setState({items:res.data.data})
      //   })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  handleChange = (name, value) => {
    let newFormData = {...this.state.formAdd}
    newFormData[name] = value
    this.setState({
        formAdd: newFormData
    })
  }
  handleSubmit = async () =>{
    const data = {
      name: this.state.formAdd.name,
      description: this.state.formAdd.description,
      image: this.state.formAdd.image,
      category: this.state.category,
      quantity: this.state.formAdd.quantity,
    }
    const headers = {
      'authorization': this.state.jwt
    }
    await this.props.dispatch(addProduct(data, headers))
        .then( res => {
          console.log('ok')
          Alert.alert('Success', 'Success to add product',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},)
        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Failed', 'Failed to add product',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},)

        })
  }

  updateSearch = (name, value) => {
    let newSearch = {...this.state.query.search}
    newSearch[name] = value
    this.setState({
      query : newSearch
    })
  }


  render() {
    const { navigation } = this.props;
    const { isLoading, products, isRejected} = this.props.product
    const {categories} = this.props.category
    return(
      <React.Fragment>
      <NavigationEvents onDidFocus={() => this.componentDidMount()}/>
      <View style={styles.searchContainer}>
      <TouchableOpacity onPress={() => this.setModalVisible(!this.state.modalVisible)} style={styles.buttonAdd}>
        <Icon
          name='ios-add-circle'
          type='ionicon'
          color='#51A2DA'
          size={50}
          />
      </TouchableOpacity>
      <SearchBar
        placeholder="Type Here..."
        lightTheme={true}
        //onChangeText={(text) => this.handleChange( 'search', text )}
        containerStyle={{
          borderRadius:100,
          width: '60%',
        }}
        inputContainerStyle={{
          borderRadius:25,
        }}
        //   placeholderTextColor={'#ffffff'}

      />
      </View>


      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.',
            [
              {text: 'OK', onPress: () => this.setModalVisible(!this.state.modalVisible)},
            ],
            {cancelable: false},)
          }}>

          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Text style={styles.logoText}>Add Product</Text>
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Name product"
            placeholderTextColor = "#51A2DA"
            selectionColor="#fff"
            onChangeText={(text) => this.handleChange( 'name', text )}
            onSubmitEditing={()=> this.description.focus()}
            />
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Description"
            placeholderTextColor = "#51A2DA"
            onChangeText={(text) => this.handleChange( 'description', text )}
            onSubmitEditing={()=> this.image.focus()}
            ref={(input) => this.description = input}
            />
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Image url"
            placeholderTextColor = "#51A2DA"
            onChangeText={(text) => this.handleChange( 'image', text )}
            onSubmitEditing={()=> this.category.focus()}
            ref={(input) => this.image = input}
            />
            <View style={styles.border}>
            <Picker
              selectedValue={this.state.category}
              style={{fontSize:16, color:'#51A2DA', width:280,}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({category: itemValue})
              }>
              <Picker.Item label='Select category' />
              {
                categories.map((data) => {
                  return <Picker.Item label={data.category} value={data.id} key={data.id} />
                })
              }
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
            </View>
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Quantity"
            placeholderTextColor = "#51A2DA"
            onChangeText={(number) => this.handleChange( 'quantity', number )}
            ref={(input) => this.quantity = input}
            />
            <TouchableOpacity type='submit'  onPress={this.handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={{marginTop: 22}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Icon
                  name='ios-close-circle'
                  type='ionicon'
                  color='#51A2DA'
                  size={50}
                  />
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      <ScrollView >

      <View style={styles.cardContainer}>
      {
        (!isLoading && products.length > 0 ) ? products.map(data => {
          return (
          <TouchableOpacity
          style={styles.card}
            onPress={() => {
              this.props.navigation.navigate('DetailProduct', {
                itemId: data.id
              });
            }}
          >
            <Card
              product={data}
              key={data.id}
            />
          </TouchableOpacity>
          );
        }) :  <ActivityIndicator size="large" color="#51A2DA" />
      }
      </View>
      </ScrollView>
      <Footer goDashboard={() => this.props.navigation.navigate('HomePage')} goProduct={() => this.props.navigation.navigate('GetProducts')} goCategory={() => this.props.navigation.navigate('GetCategories')}/>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
    return{
      product: state.product,
      category: state.category
    }
  }

export default connect(mapStateToProps)(GetProducts);


const styles = StyleSheet.create({

  card: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginBottom: 10,
    marginLeft:'2%',
    marginRight: '2%',
    width: '45%',
    borderWidth: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    justifyContent:'center',
    alignItems: 'center',
    elevation: 1
  },
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  border:{
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#51A2DA',
    paddingHorizontal:16,
    color:'#51A2DA',
    marginVertical: 10,
  },

  inputBox: {
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#51A2DA',
    paddingHorizontal:16,
    fontSize:16,
    color:'#51A2DA',
    marginVertical: 10,
    paddingVertical: 13
  },

  button: {
    width:300,
    backgroundColor:'#51A2DA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonAdd: {
    width:50,
    borderRadius: 100,
    paddingVertical: 13,
    marginLeft: '3%',
    marginRight: '3%',
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonTextAdd: {
    fontSize:25,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign:'center'
  },

  logoText : {
    marginVertical: 15,
    fontSize:18,
    color:'#51A2DA'
  },
  cardContainer : {
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexGrow: 2,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchContainer : {
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },

});
