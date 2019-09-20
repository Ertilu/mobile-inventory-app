import React from 'react';
import { StyleSheet, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

import { Icon, Product } from '../components/';

const { width } = Dimensions.get('screen');
import products from '../constants/products';
import axios from 'axios';
import FormExample from '../components/FormHandling';
import FormAdd from './AddProduct'; 
import { NavigationEvents } from 'react-navigation';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: true,
      errors: null,
      total: 0,
      page: '' || 1,
      tes: ''
    };
  }

  componentDidMount() {
    this.getProducts();
  }


  getProducts() {
    const queryView = 'http://192.168.43.24:8000/products?type=desc'
    axios 
    // .get("https://randomproduct.me/api/?results=5")
    .get(queryView)
    .then(response =>
      response.data.values.map(product => ({
        id: `${product.pId}`,
        name: `${product.pName}`,
        description: `${product.pDesc}`,
        quantity: `${product.pQty}`,
        image: `${product.pImage}`,
        idCategory: `${product.idCategory}`,
        category: `${product.category}`,
        dateAdded: `${product.pDateAdded}`,
        dateUpdated: `${product.pDateUpdated}`
      }))
    )
    .then(products => {
      this.setState({
        products,
        isLoading: false
      })
    })
 
    .catch(error => this.setState({ error, isLoading: false }));
  }

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
        <NavigationEvents
              onDidFocus={this.getProducts()}
        />
        {!this.state.isLoading ? (        
          this.state.products.map(product => { 
            return (
              <Product
                    key={product.id}
                    {...product}
                  full />
       
            );
          })
          ) : (
            <Text>Loading...</Text>
          )
        } 
        {/* {
          this.state.products.map(product => {         
            return (
              <Product
                    key={product.id}
                    {...product}
                  full />
            );
          })
        } */}
          {/* <Product product={products[0]} horizontal />
          <Block flex row>
            <Product product={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Product product={products[2]} />
          </Block>
          <Product product={products[3]} horizontal />
          <Product product={products[4]} full /> */}
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
