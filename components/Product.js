import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, View, Modal, TouchableHighlight, Alert, ScrollView, KeyboardAvoidingView, Picker, TextInput, TouchableOpacity } from 'react-native';
import { Block, Text, theme, Button, Input } from 'galio-framework';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import materialTheme from '../constants/Theme';
import axios from 'axios';

const { width } = Dimensions.get('screen');

class Product extends React.Component {
  state = {
    modalVisible: false,
    pId: this.props.id,
    pName: this.props.name,
    pDesc: this.props.description,
    pImage: this.props.image,
    idCategory: this.props.idCategory,
    pQty: this.props.quantity,
    pDateAdded: new Date(),
    pDateUpdated: new Date()
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handlerSubmit = () => {
    axios
    .put('http://192.168.43.24:8000/products/' + this.state.pId, this.state)
    .then(function (response) {
      alert('data updated');
    })
    .catch(function (error) {
      alert(error);
    });
    this.setState({modalVisible: false});
  }

  deleteProduct = (id) => {
		axios.delete('http://192.168.43.24:8000/products/'+id)
		.then(function(response) {
			const data = response.data;
			alert('data deleted');
		})
		.catch(function(err) {
			alert(err)
		})
	};

	showAlert = () => {
		Alert.alert(
			'Delete Confirmation',
			'Are you sure want to delete this product "'+this.props.name+'" ?',
			[
				{text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
				{text: 'Delete', onPress: () => this.deleteProduct(this.props.id)},
			]
		)
	};

  render() {
    const { id, name, description, quantity, onDelete, image, category, dateAdded, dateUpdated } = this.props;
    const { navigation, product, horizontal, full, style, priceColor, imageStyle } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    
   return ( 
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]} key={id}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { ...this.props })}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { ...this.props })}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{name}</Text>
            <Text size={12} muted={!priceColor} color={priceColor}>Quantity: {quantity}</Text>
          </Block>
        </TouchableWithoutFeedback>
        <View>
          <View style={styles.fixToText}>
            <Button left style={{width: 100}} color="info" onPress={() => {
              this.setModalVisible(true);
            }}>Edit data</Button>
            <Button right style={{width:100}} color="error" onPress={this.showAlert}>Delete data</Button>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.state.modalVisible}}>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Text style={styles.logoText}>Edit Product</Text>
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Product name"
            placeholderTextColor = "#51A2DA"
            selectionColor="#fff"
            onChangeText={(pName) => this.setState({pName})}
            onSubmitEditing={()=> this.description.focus()}
            value={this.state.pName}
            />
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Description"
            placeholderTextColor = "#51A2DA"
            onChangeText={(pDesc) => this.setState({pDesc})}
            value={this.state.pDesc}
            onSubmitEditing={()=> this.image.focus()}
            ref={(input) => this.description = input}
            />
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Image url"
            placeholderTextColor = "#51A2DA"
            onChangeText={(pImage) => this.setState({pImage})}
            value={this.state.pImage}
            onSubmitEditing={()=> this.category.focus()}
            ref={(input) => this.image = input}
            /> 
            <View style={styles.border}>
            <Picker
              selectedValue={this.state.idCategory}
              style={{fontSize:16, color:'#51A2DA', width:280,}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({idCategory: itemValue})
              }>
              <Picker.Item label="Daily needs" value="1"  />
              <Picker.Item label="Electronic" value="2" />   
              <Picker.Item label="Food & Drink" value="3" />   
              <Picker.Item label="Automotive" value="4" />   
            </Picker>
            </View>
            <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Quantity"
            placeholderTextColor = "#51A2DA"
            onChangeText={(pQty) => this.setState({pQty})}
            value={this.state.pQty}
            ref={(input) => this.quantity = input}
            />
            <View>
              <View style={styles.fixToText}>
                <Button left style={{width: 100, marginRight: 10}} color="primary" onPress={this.handlerSubmit}>Edit data</Button>
                <Button right style={{width:100}} color="error" onPress={() => {
              this.setModalVisible(!this.state.modalVisible);}}>Cancel</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </Block>
      
    );
  }
}

export default withNavigation(Product);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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