import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_POST} from '../../../community/CommunityQueries';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PostText from '../../../community/seePost/PostText';
import SmallListViewText from './SmallListViewText';

const SmallListView = ({navigation, petType}) => {
  const {data, loading} = useQuery(SEE_POST, {
    variables: {
      petType,
      pageNumber: 0,
      items: 10,
    },
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{flexDirection: 'row', margin: 10}}>
        {posts &&
          posts.map((post, index) => (
            <TouchableWithoutFeedback
              key={index}
              style={{marginRight: 10}}
              onPress={() => navigation.navigate('SeeDetailPost', {post})}>
              <SmallListViewText title={post.title} text={post.text} />
            </TouchableWithoutFeedback>
          ))}
      </View>
    </ScrollView>
  );
};

export default SmallListView;
