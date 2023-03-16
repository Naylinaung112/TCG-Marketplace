import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../utils/theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {changeSearch, clearData, getData} from '../redux/appSlice';

const CardFliter = () => {
  const {search} = useSelector(state => state.app);
  const [name, setName] = useState(search);
  const dispatch = useDispatch();
  const nameChange = value => setName(value);
  const searchHandler = () => {
    dispatch(changeSearch(name.toLocaleLowerCase()));
    dispatch(clearData());
    dispatch(getData({name: name.toLowerCase(), page: 1}));
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onSubmitEditing={searchHandler}
        cursorColor={colors.primary}
        onChangeText={nameChange}
      />
    </View>
  );
};

export default CardFliter;

const styles = StyleSheet.create({
  input: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    height: 40,
    padding: 10,
    marginVertical: 10,
    textAlign: 'center',
    zIndex: 10,
  },
});
