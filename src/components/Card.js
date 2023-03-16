import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/theme/colors';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../redux/appSlice';

const Card = ({name, id, price, image, stock, rarity}) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const selectHandler = () => {
    if (selected) {
      setSelected(false);
      dispatch(removeFromCart(id));
    } else {
      setSelected(true);
      dispatch(
        addToCart({
          name: name,
          price: price,
          quantity: 1,
          id: id,
          image: image,
          stock,
        }),
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rarity}>{rarity}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.price}>{stock} left</Text>
        </View>
        <Pressable
          style={[
            styles.selectBtn,
            {backgroundColor: selected ? '#ddd' : colors.secondary},
          ]}
          onPress={selectHandler}>
          <Text style={styles.selectBtnText}>Select card</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default React.memo(Card);
const styles = StyleSheet.create({
  container: {
    marginTop: 250,
    marginBottom: 40,
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    width: '70%',
    maxWidth: 360,

    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 40,
  },
  name: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  rarity: {
    color: colors.primary,
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  priceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 5,
  },
  price: {
    color: colors.label,
  },
  selectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: colors.secondary,
    width: '60%',
    borderRadius: 20,
    marginTop: 20,
    position: 'absolute',
    bottom: -20,
  },
  selectBtnText: {
    fontWeight: 'bold',
    color: 'black',
  },
  imageContainer: {
    position: 'absolute',
    top: -210,
    width: 170,
    height: 240,
    borderRadius: 5,
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
