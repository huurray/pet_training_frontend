import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MoveLoginViewModal from '../../components/modal/MoveLoginViewModal';
import Login from '../auth/Login';
import {SEE_IS_LOGGED_IN, IS_LOGGED_OUT} from '../auth/AuthQueries';
import {useQuery, useMutation} from 'react-apollo-hooks';

const MyPage = ({navigation}) => {
  // const [loginModal, setLoginModla] = useState<boolean>(false);

  const {
    data: {
      auth: {isLoggedIn},
    },
  } = useQuery<any>(SEE_IS_LOGGED_IN);

  const [logUserOutMutation] = useMutation(IS_LOGGED_OUT, {
    update: (proxy, __) => {
      const data: any = proxy.readQuery({query: SEE_IS_LOGGED_IN});
      data.auth.isLoggedIn = false;
      proxy.writeQuery({
        query: SEE_IS_LOGGED_IN,
        data,
      });
    },
  });

  return (
    <>
      {isLoggedIn ? (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            <View>
              <Text>마이페이지</Text>
            </View>
            <TouchableOpacity onPress={async () => await logUserOutMutation()}>
              <View>
                <Text>LogOut</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <Login />
        </View>
      )}
      {/* <MoveLoginViewModal
        navigation={navigation}
        isVisible={loginModal}
        setIsVisible={setLoginModla}
      /> */}
    </>
  );
};

export default MyPage;
