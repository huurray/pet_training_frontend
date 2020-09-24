import React, {SFC} from 'react';
import {Text, View} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_IS_LOGGED_IN} from '../auth/AuthQueries';

const Training: SFC<void> = ({}) => {
  const {
    data: {
      auth: {isLoggedIn},
    },
  } = useQuery<any>(SEE_IS_LOGGED_IN);

  return isLoggedIn ? (
    <View>
      <Text>트레이닝</Text>
    </View>
  ) : (
    <View>
      <Text>로긴</Text>
    </View>
  );
};

export default Training;
