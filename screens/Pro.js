import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
import Moment from 'moment'

class Pro extends React.Component {
  render() {
    const { navigation } = this.props;
    const name = navigation.getParam('name');
    const description = navigation.getParam('description');
    const quantity = navigation.getParam('quantity');
    const image = navigation.getParam('image');
    const category = navigation.getParam('category');
    const dateAdded = navigation.getParam('dateAdded');
    const dateUpdated = navigation.getParam('dateUpdated');
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: image}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{name}</Text>
                <Block row space="between">
                  <Block row>
                    <Text color="white" size={16} muted style={styles.seller}>{category}</Text>
                    <Text size={16} color={materialTheme.COLORS.WARNING}>
                      4.8 <Icon name="shape-star" family="GalioExtra" size={14} />
                    </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{Moment(dateAdded).format('d MMM YYYY')}</Text>
                <Text muted size={12}>Date Added</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{quantity}</Text>
                <Text muted size={12}>Quantity</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{Moment(dateUpdated).format('d MMM YYYY')}</Text>
                <Text muted size={12}>Date Updated</Text>
              </Block>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Product description</Text>
            </Block>
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }} >
                <Text size={12} color={theme.COLORS.PRIMARY} onPress={() => this.props.navigation.navigate('Home')}>{description}</Text>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

export default withNavigation(Pro);

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});
