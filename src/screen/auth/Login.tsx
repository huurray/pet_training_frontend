import React, {useState, useEffect} from 'react';
import {Text, View, Image, Platform} from 'react-native';
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
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login';

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
  console.log(profile);
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

  const [naverToken, setNaverToken] = React.useState<any>(null);

  const iosKeys = {
    kConsumerKey: 'VC5CPfjRigclJV_TFACU',
    kConsumerSecret: 'f7tLFw0AHn',
    kServiceAppName: '테스트앱(iOS)',
    kServiceAppUrlScheme: 'testapp', // only for iOS
  };

  const androidKeys = {
    kConsumerKey: 'QfXNXVO8RnqfbPS9x0LR',
    kConsumerSecret: '6ZGEYZabM9',
    kServiceAppName: '테스트앱(안드로이드)',
  };

  const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

  const naverLogin = (props) => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
        getUserProfile();
      });
    });
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    if (profileResult.resultcode === '024') {
      console.log('로그인 실패');
    }
    console.log('profileResult', profileResult);
  };

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
        <TouchableOpacity onPress={() => naverLogin(initials)}>
          <View
            style={{
              width: constant.width / 2,
              height: constant.width / 7,
              backgroundColor: '#04CF5C',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <Image
              source={require('../../../assets/image/kakaologo.png')}
              style={{width: constant.width / 13}}
              resizeMode={'contain'}
            />
            <Text style={{color: 'white', fontWeight: '700', marginLeft: 10}}>
              네이버로 시작하기
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
