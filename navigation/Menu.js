import React, {useEffect, useState} from "react";
import { DrawerItems } from 'react-navigation';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Dimensions, Image, AsyncStorage } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Icon } from '../components/';
import { Images, materialTheme } from "../constants/";

const { width } = Dimensions.get('screen');
AsyncStorage.getItem('name').then(value => setName(value))
const Drawer = (props) => {
	const [name, setName] = useState('');

	AsyncStorage.getItem('name').then(value => setName(value))

  return (
    <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <Block flex={0.2} style={styles.header}>
        <TouchableWithoutFeedback>
          <Block style={styles.profile}>
            <Image source={{ uri: props.profile.avatar}} style={styles.avatar} />
            <Text h5 color="white">Hello, {name}</Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <DrawerItems {...props} />
        </ScrollView>
      </Block>
    </Block>
  )
  
};

const profile = {
  avatar: Images.Profile,
  name: 'raka',
  type: 'Owner'
};

const Menu = {
  contentComponent: props => <Drawer {...props} profile={profile} />,
  drawerBackgroundColor: 'white',
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#000',
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal',
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#4B1958',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

export default Menu;
