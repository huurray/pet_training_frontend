import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';
import KakaoLogins, {KAKAO_AUTH_TYPES} from '@react-native-seoul/kakao-login';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import constant from '../../../constant';
import {useMutation, useQuery} from 'react-apollo-hooks';
import {
  JOIN_USER,
  CHECK_WHETHER_TO_JOIN,
  IS_LOGGED_IN,
  SEE_IS_LOGGED_IN,
} from './AuthQueries';

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const PROFILE_EMPTY = {
  id: null,
  email: null,
  profile_image_url: null,
};

type TYPE_PROFILE_EMPTY = {
  id: string | null;
  email: string | null;
  profile_image_url: string | null;
};

export default function App() {
  // Information received when logging in
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<TYPE_PROFILE_EMPTY>(PROFILE_EMPTY);
  const {id, email, profile_image_url: photo} = profile;
  const [isLoading, setIsLoading] = useState(false);

  const kakaoLogin = () => {
    KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
      .then((result) => {
        setToken(result.accessToken);
      })
      .then(() => {
        KakaoLogins.getProfile()
          .then((result) => {
            setProfile(result);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          console.log(`Login Failed:${err.message}`);
        } else {
          console.log(`Login Failed:${err.code} ${err.message}`);
        }
      });
  };

  const {data, loading} = useQuery(CHECK_WHETHER_TO_JOIN, {
    variables: {
      id,
    },
    fetchPolicy: 'network-only',
    skip: id === null || id === undefined ? true : false,
  });

  //Mutation
  //Join
  const [joinUserMutation] = useMutation(JOIN_USER);
  //Local Mutation(LogOut)
  const [logUserInMutation] = useMutation(IS_LOGGED_IN, {
    update: (proxy, __) => {
      const data: any = proxy.readQuery({query: SEE_IS_LOGGED_IN});
      data.auth.isLoggedIn = true;
      proxy.writeQuery({
        query: SEE_IS_LOGGED_IN,
        data,
      });
    },
  });

  const registerUser = async () => {
    setIsLoading(true);
    const {data}: any = await joinUserMutation({
      variables: {
        id,
        avatar: !photo ? 'None' : photo,
        email: !email ? 'None' : email,
      },
    });
    if (data && data.JoinUser && data.JoinUserok) {
      // Login
      null;
    }
    setIsLoading(false);
  };

  const changeCheckLoginHandle = async () => {
    if (
      data &&
      data.CheckWhetherToJoin &&
      data.CheckWhetherToJoin.result === 'No User, Need to join'
    ) {
      registerUser();
    } else {
      if (token !== null && id !== null && id !== undefined) {
        console.log(123);
        await logUserInMutation({
          variables: {
            token,
          },
        });
      }
    }
  };

  useEffect(() => {
    changeCheckLoginHandle();
  }, [data]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => kakaoLogin()}>
          <View
            style={{
              width: constant.width / 2,
              height: constant.width / 7,
              backgroundColor: '#F7D001',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              flexDirection: 'row',
            }}>
            <Image
              source={require('../../../assets/image/kakaologo.png')}
              style={{width: constant.width / 13}}
              resizeMode={'contain'}
            />
            <Text style={{color: '#2E101D', fontWeight: '700', marginLeft: 10}}>
              카카오로 시작하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
