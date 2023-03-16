import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import CartList from '../components/CartList';
import {clearCart} from '../redux/appSlice';
import Overlay from '../components/Overlay';

const Cart = ({navigation}) => {
  const {cart} = useSelector(state => state.app);
  const dispatch = useDispatch();

  let totalPrice = 0;
  let totalCard = 0;
  cart.forEach(item => {
    totalPrice += item.price * item.quantity;
    totalCard += item.quantity;
  });

  const renderItem = ({item, index}) => {
    return <CartList item={item} index={index} />;
  };
  const removeHandler = () => {
    dispatch(clearCart());
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.cartListContainer}>
          <FlatList
            data={cart}
            renderItem={renderItem}
            initialNumToRender={4}
            windowSize={4}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
          />
          <Overlay />
        </View>
        <View style={styles.payContainer}>
          {cart.length > 0 && (
            <Pressable onPress={removeHandler}>
              <Text
                style={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                remove all
              </Text>
            </Pressable>
          )}
          <View style={styles.flxRowBetween}>
            <Text style={styles.TotalCard}>Total cards</Text>
            <Text style={styles.num}>{totalCard}</Text>
          </View>
          <View style={styles.flxRowBetween}>
            <Text style={styles.totalPrice}>Total price</Text>
            <Text style={styles.num}>{totalPrice.toFixed(2)}$</Text>
          </View>
          <Pressable style={styles.payBtn}>
            <Text style={styles.payText}>Pay now</Text>
          </Pressable>
        </View>
        <Pressable style={styles.cancelBtn} onPress={navigation.goBack}>
          <Entypo name="cross" color="white" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
  innerContainer: {
    backgroundColor: 'white',
    width: '95%',
    height: '70%',
    borderRadius: 10,
    padding: 15
  },
  cancelBtn: {
    backgroundColor: colors.error,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: -30,
    borderRadius: 10,
  },
  num: {
    color: colors.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
  TotalCard: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingRight: 15,
  },
  payBtn: {
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  payText: {color: 'white', fontSize: 16},
  flxRowBetween: {flexDirection: 'row', justifyContent: 'space-between'},
  payContainer: {
    alignSelf: 'center',
    width: '50%',
    padding: 10,
    marginVertical: 15,
  },
  cartListContainer: {height: '60%'},
});
