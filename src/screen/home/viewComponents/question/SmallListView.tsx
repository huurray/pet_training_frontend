import React, {useState, SFC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useQuery} from 'react-apollo-hooks';
import {SEE_POST} from '../../../community/CommunityQueries';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import PostText from '../../../community/seePost/PostText';
import SmallListViewText from './SmallListViewText';
import {moderateScale} from 'react-native-size-matters';
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  petType: string;
}

const SmallListView: SFC<Props> = ({navigation, petType}) => {
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
      contentContainerStyle={styles.container}>
      <View style={styles.wrapper}>
        {posts &&
          posts.map((post, index) => (
            <TouchableWithoutFeedback
              key={index}
              style={styles.listWrapper}
              onPress={() => navigation.navigate('SeeDetailPost', {post})}>
              <SmallListViewText title={post.title} text={post.text} />
            </TouchableWithoutFeedback>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  wrapper: {
    flexDirection: 'row',
    margin: moderateScale(10),
  },
  listWrapper: {
    marginRight: moderateScale(10),
  },
});

export default SmallListView;
