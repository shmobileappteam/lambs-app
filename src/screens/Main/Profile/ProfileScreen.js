import {
  BackHandler,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Container, Flex, SafeAreaWrapper } from '../../../atomComponents';
import { Avatar } from 'react-native-paper';
import { avatar, edit as Edit } from '../../../assets/images';
import { BASEOPACITY, COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Button, Header, TextField } from '../../../components';
import InputLabel from '../../../components/customFields/InputLabel';
import { useSelector } from 'react-redux';
import { maskPhoneNumber } from '../../../utils';

const ProfileScreen = ({ navigation }) => {
  const [edit, setIsEdit] = useState(false);
  const { user } = useSelector(state => state.app);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (edit) {
          setIsEdit(false);
          return true;
        } else {
          return false;
        }
      },
    );

    return () => backHandler.remove();
  }, [edit]);

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header type="app" title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={GLOBALSTYLE.paddingHor}
        contentContainerStyle={{ paddingBottom: Sizer.hSize(200) }}
      >
        <Flex algItems={'center'} direction={'column'} mT={25} mb={30}>
          <TouchableOpacity
            activeOpacity={BASEOPACITY}
            onPress={() => navigation.navigate('EditProfileScreen')}
            style={{ position: 'relative' }}
          >
            <Avatar.Image
              source={{ uri: user?.image }}
              size={Sizer.hSize(88)}
              style={{ backgroundColor: 'grey' }}
            />
            <Image
              source={Edit}
              resizeMode="contain"
              style={{
                height: Sizer.vSize(24),
                width: Sizer.vSize(24),
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
            />
          </TouchableOpacity>
        </Flex>

        <InputLabel title="Email" />
        <TextField
          placeholder="email"
          value={user?.email}
          leftIcon
          leftIconName="mail"
          disable={false}
        />
        <InputLabel title="Name" />
        <TextField
          placeholder="William"
          value={user?.name}
          leftIcon
          leftIconName="user"
          disable={edit}
        />
        <InputLabel title="Address" />
        <TextField
          placeholder="address"
          value={user?.address}
          leftIcon
          leftIconName="info"
          disable={edit}
        />

        <InputLabel title="Phone Number" />
        <TextField
          placeholder="+1234567890"
          leftIcon
          value={maskPhoneNumber(user?.phone)}
          leftIconName="phone"
          maxLength={12}
          keyboardType="number-pad"
          disable={edit}
        />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  formWrapper: {
    paddingHorizontal: Sizer.hSize(20),
  },
});
