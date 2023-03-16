import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {decreaseQuanity, increaseQuanity} from '../redux/appSlice';

const CartList = ({item, index}) => {
  const dispatch = useDispatch();
  const increaseHandler = () => {
    dispatch(increaseQuanity(index));
  };
  const decreaseHandler = () => {
    dispatch(decreaseQuanity(index));
  };
  return (
    <View style={styles.container}>
      <Image source={{uri: item.image}} style={{height: '100%', width: 88}} />
      <View style={styles.innerContainer}>
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.perPrice}>${item.price} per card</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.primary}>{item.quantity}</Text>
            <View style={{paddingLeft: 5}}>
              {item.quantity !== item.stock ? (
                <AntDesign
                  onPress={increaseHandler}
                  name="up"
                  color={colors.primary}
                  size={18}
                />
              ) : (
                <Entypo name="cross" color={colors.error} size={18} />
              )}
              {item.quantity > 1 ? (
                <AntDesign
                  onPress={decreaseHandler}
                  name="down"
                  color={colors.primary}
                  size={18}
                />
              ) : (
                <Entypo name="cross" color={colors.error} size={18} />
              )}
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text>
            <Text style={styles.left}>{item.stock}</Text>
            <Text style={styles.label}> card left</Text>
          </Text>
          <View>
            <Text style={styles.totalPrice}>price</Text>
            <Text style={styles.primary}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 120,
    marginVertical: 10,
  },
  name: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  left: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {color: colors.label},
  totalPrice: {color: 'black', textAlign: 'right', fontWeight: '700'},
  primary: {color: colors.primary},
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    justifyContent: 'space-between',
    height: '100%',
    padding: 10,
    flexGrow: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
