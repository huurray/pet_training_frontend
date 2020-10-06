import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_POST} from '../CommunityQueries';
import PostText from './PostText';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import cStyles from '../../../../cStyles';

const PostScreenView = ({navigation}) => {
  const [petType, setPetType] = useState('강아지');

  const {data, loading} = useQuery(SEE_POST, {
    variables: {
      petType,
      pageNumber: 0,
      items: 20,
    },
    fetchPolicy: 'network-only',
  });

  let posts;

  if (
    data &&
    data.SeePost &&
    data.SeePost.result &&
    data.SeePost.result.length > 0
  ) {
    posts = data && data.SeePost && data.SeePost.result;
  }

  return loading ? null : (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, backgroundColor: cStyles.BorderLightGrayColor}}>
        {posts &&
          posts.map((post, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate('SeeDetailPost', {post})}>
              <View
                style={{
                  paddingTop: 10,
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}>
                <Text
                  style={{fontWeight: '700', fontSize: 20, marginBottom: 10}}>
                  {post.title}
                </Text>
                <PostText text={post.text} />
              </View>
            </TouchableWithoutFeedback>
          ))}
      </View>
    </ScrollView>
  );
};

export default PostScreenView;
