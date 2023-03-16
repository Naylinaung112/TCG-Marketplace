import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
  RefreshControl,
  BackHandler,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getData} from '../redux/appSlice';
import Card from '../components/Card';
import colors from '../utils/theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import CardFliter from '../components/CardFliter';
import Overlay from '../components/Overlay';
import AntDesign from 'react-native-vector-icons/AntDesign';

const listHeaderComponent = () => <CardFliter />;
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {cart, data, loading, search} = useSelector(state => state.app);
  const [showToTopBtn, setShowToTopBtn] = useState(false);
  const [showCartBtn, setShowCartBtn] = useState(true);
  const list = useRef();

  const scrollHandler = e => {
    if (e.nativeEvent.contentOffset.y > 250) {
      if (!showToTopBtn) setShowToTopBtn(true);
    } else {
      if (showToTopBtn) setShowToTopBtn(false);
    }
  };
  const toTopHandler = () => {
    list.current.scrollToIndex({
      index: 0,
      animated: true,
    });
  };
  useEffect(() => {
    if (loading == 'idle' || data?.data.length == 0) {
      loadMore();
    }
  }, []);

  useEffect(() => {
    const backSubscribe = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (showToTopBtn) {
          toTopHandler();
        } else {
          BackHandler.exitApp();
        }
        return true;
      },
    );
    const keyboardShowSubscribe = Keyboard.addListener('keyboardDidShow', e => {
      setShowCartBtn(false);
    });
    const keyboardHideSubscribe = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowCartBtn(true);
      },
    );

    return () => {
      backSubscribe.remove();
      keyboardShowSubscribe.remove();
      keyboardHideSubscribe.remove();
    };
  });

  const loadMore = () => {
    dispatch(
      getData({
        page: data?.data?.length > 0 ? data?.data?.length / 12 + 1 : 1,
        name: search,
      }),
    );
  };

  const listFooter = () => {
    return (
      data?.count < data?.totalCount &&
      (loading == 'loading' ? (
        <View style={styles.loadMore}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <Pressable style={styles.loadMore} onPress={loadMore}>
          <Text>Load more</Text>
        </Pressable>
      ))
    );
  };

  const cartBtnHandler = () => {
    navigation.navigate('Cart');
  };

  const renderItem = ({item}) => {
    return (
      <Card
        name={item.name}
        id={item.id}
        price={item.cardmarket?.prices.trendPrice}
        image={item.images?.large}
        rarity={item.rarity}
        stock={item.set?.total}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[colors.primary]}
            refreshing={loading == 'loading'}
          />
        }
        ref={list}
        data={data?.data}
        overScrollMode="never"
        onScroll={scrollHandler}
        initialNumToRender={6}
        keyExtractor={(item, index) => index + item.id}
        windowSize={6}
        getItemLayout={(item, index) => ({
          length: 460,
          offset: 460 * index,
          index,
        })}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={listFooter}
      />
      <Overlay />
      {showCartBtn && (
        <Pressable style={styles.cartBtn} onPress={cartBtnHandler}>
          {cart?.length > 0 && <Text style={styles.badge}>{cart?.length}</Text>}
          <Feather name="shopping-cart" color="white" />
          <Text style={styles.cardBtnText}>View cart</Text>
        </Pressable>
      )}
      {showToTopBtn && (
        <AntDesign
          name="up"
          onPress={toTopHandler}
          size={22}
          color="black"
          style={styles.toTopBtn}
        />
      )}
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartBtn: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  cardBtnText: {
    color: 'white',
    marginLeft: 5,
  },
  gradient: {
    width: '100%',
    height: 40,
  },
  badge: {
    backgroundColor: colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: -5,
    left: -5,
    alignItems: 'center',
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loadMore: {
    marginBottom: 30,
    alignSelf: 'center',
    padding: 10,
  },
  toTopBtn: {
    padding: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 80,
    right: 30,
    borderRadius: 30,
  },
});
